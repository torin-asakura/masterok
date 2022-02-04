import { Logger }           from 'pino'

import { ProxyRepository }  from '@proxy/persistence'
import { RussvetService }   from '@russvet/service'
import { WarehouseService } from '@warehouse/service'

export class ProxyService {
  private readonly NAME = 'ProxySync'
  private proxyRepository: ProxyRepository
  private warehouseService: WarehouseService
  private russvetService: RussvetService

  constructor(private readonly logger: Logger) {
    this.proxyRepository = new ProxyRepository(logger)
    this.warehouseService = new WarehouseService()
    this.russvetService = new RussvetService()
  }

  async syncDbWithRussvet() {
    this.logger.info(`${this.NAME}: Executed syncDbWithRussvet`)

    this.russvetService.mapPositions(async (position) => {
      await this.proxyRepository.writePosition(position)
    })
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
}
