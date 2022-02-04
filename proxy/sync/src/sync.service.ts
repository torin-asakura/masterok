import camelcase           from 'camelcase'
import { Logger }          from 'pino'

import { MoyskladService } from '@proxy/moysklad'
import { ProxyRepository } from '@proxy/repository'
import { Position }        from '@proxy/russvet'
import { RussvetService }  from '@proxy/russvet'
import { mapKeys }         from '@proxy/common'
import { repeat }          from '@proxy/common'

export class SyncService {
  private readonly NAME = 'ProxySync'

  constructor(
    private readonly proxyRepository: ProxyRepository,
    private readonly moyskladService: MoyskladService,
    private readonly russvetService: RussvetService,
    private readonly logger: Logger
  ) {}

  async getFullRussvetPosition(position: Position, stockId: number) {
    const code = Number(position.CODE)

    const price = await this.russvetService.getPrice(code)
    const allSpecs = await this.russvetService.getSpecs(code)
    const residue = await this.russvetService.getResidue(stockId, code)

    return mapKeys(
      {
        ...position,
        ...price,
        ...allSpecs,
        residue,
      },
      camelcase
    )
  }

  async syncDbWithRussvet() {
    this.logger.info(`${this.NAME}: Executed syncDbWithRussvet`)

    const { stocks: allStocks } = await this.russvetService.getStocks()
    const stocks = allStocks.filter(({ NAME }) =>
      (process.env.STOCKS || '').split(' ').includes(NAME))

    let totalPositions = 0
    let progress = 0

    for (const stock of stocks) {
      const { count } = await this.russvetService.getPositions(stock.ORGANIZATION_ID)

      totalPositions += count
    }

    this.logger.info(`${this.NAME}: Calculated total amount of positions: ${totalPositions}`)

    for (const stock of stocks) {
      const { pages } = await this.russvetService.getPositions(stock.ORGANIZATION_ID)

      repeat(pages, async (page) => {
        const { positions } = await this.russvetService.getPositions(stock.ORGANIZATION_ID, page)

        for (const position of positions) {
          const fullPosition = await this.getFullRussvetPosition(position, stock.ORGANIZATION_ID)

          await this.proxyRepository.writePosition(fullPosition)

          if (progress % 1000 === 0) {
            this.logger.info(`${this.NAME}: ${progress}/${totalPositions}`)
          }

          if (progress === totalPositions) {
            this.logger.info(
              `${this.NAME}: Completed writing positions (${progress}/${totalPositions})`
            )
          }

          progress += 1
        }
      })
    }
  }

  async transferPositions() {
    this.logger.info(`${this.NAME}: Executed transferPositions`)

    const positions: any = await this.proxyRepository.findAllPositions()

    let progress = 0

    for (const position of positions) {
      await this.moyskladService.createProduct({
        name: position?.name || 'none',
        code: position?.code || 'none',
        description: position?.info?.DESCRIPTION || 'none',
        barcodeEan: position?.barcode?.EAN || 'none',
      })
      progress += 1
      this.logger.info(`Progress: ${progress}/${positions.length}`)
    }
  }

  async transferStocks() {
    this.logger.info(`${this.NAME}: Executed transferStocks`)

    const { stocks } = await this.russvetService.getStocks()

    for (const stock of stocks) {
      await this.moyskladService.createStock({
        name: stock.NAME,
        code: stock.ORGANIZATION_ID.toString(),
      })
    }
  }

  async syncStocks() {
    this.logger.info(`${this.NAME}: Executed syncStocks`)

    const { stocks: msStocks } = await this.moyskladService.getStocks()
    const { stocks: rsStocks } = await this.russvetService.getStocks()

    for (const rsStock of rsStocks) {
      let shouldCreate = true

      for (const msStock of msStocks) {
        if (rsStock.ORGANIZATION_ID.toString() === msStock.code) {
          shouldCreate = false
        }
      }

      if (shouldCreate) {
        await this.moyskladService.createStock({
          name: rsStock.NAME,
          code: rsStock.ORGANIZATION_ID.toString(),
        })
      }
    }
  }

  async writeAttributes() {
    this.logger.info(`${this.NAME}: Executed writeAttributes`)

    const positions = await this.proxyRepository.findAllPositions()

    for (const position of positions) {
      if (position.name.search(/Лампа/g) !== -1) {
        const { specs } = await this.russvetService.getSpecs(Number(position.code))

        for (const spec of specs) {
          await this.proxyRepository.writeAttribute({
            name: spec.NAME,
          })
        }
      }
    }
  }

  async uniqueAttributes() {
    this.logger.info(`${this.NAME}: Executed uniqueAttributes`)

    const { join } = await import('path')
    const { createWriteStream } = await import('fs')

    const attributes = await this.proxyRepository.getAttributes()
    const uniqueAttributes = new Set(attributes.map((attr) => attr.name))

    const stream = createWriteStream(join(__dirname, './attrs.txt'))

    for (const attr of uniqueAttributes) {
      stream.write(`${attr}\n`)
    }

    stream.close()
  }

  async syncAttributesWithMoySklad() {
    const existingAttributes = await this.moyskladService.getAttributes()
    const existingAttrNames = existingAttributes.map((attr) => attr.name)
    const attrsToWrite = await this.proxyRepository.getAttributes()

    for (const attribute of attrsToWrite) {
      if (existingAttrNames.indexOf(attribute.name) === -1) {
        await this.moyskladService.createAttribute({
          name: attribute.name,
          type: 'string',
          required: false,
        })
      }
    }
  }
}
