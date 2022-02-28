import { Logger }           from '@atls/logger'

import { RussvetService }   from '@russvet/service'
import { SyncRepository }   from '@sync/persistence'
import { WarehouseService } from '@warehouse/service'

export class SyncService {
  private readonly NAME = 'SyncService'

  private syncRepository: SyncRepository

  private warehouseService: WarehouseService

  private russvetService: RussvetService

  private logger: Logger

  constructor() {
    this.syncRepository = new SyncRepository()
    this.warehouseService = new WarehouseService()
    this.russvetService = new RussvetService()
    this.logger = new Logger(this.NAME)
  }

  async syncDbWithRussvet() {
    this.logger.info(`${this.NAME}: Executed syncDbWithRussvet`)

    this.russvetService.mapPositions(async (position) => {
      await this.syncRepository.writePosition(position)
    })
  }

  async uniqueAttributes() {
    this.logger.info(`${this.NAME}: Executed uniqueAttributes`)

    const { join } = await import('path')
    const { createWriteStream } = await import('fs')

    const attributes = await this.syncRepository.getAttributes()
    const uniqueAttributes = new Set(attributes.map((attr) => attr.name))

    const stream = createWriteStream(join(__dirname, './attrs.txt'))

    for (const attr of uniqueAttributes) {
      stream.write(`${attr}\n`)
    }

    stream.close()
  }

  async orderLamp() {
    await this.russvetService.orderPositions(['19565'])
  }

  async getPositions() {
    return this.syncRepository.findAllPositions()
  }

  async genICML() {
    class PositionDecorator {
      constructor(private entity) {
        this.entity.price = JSON.parse(this.entity.price)
        this.entity.residue = JSON.parse(this.entity.residue)
        this.entity.info = JSON.parse(this.entity.info)
        this.entity.barcode = JSON.parse(this.entity.barcode)
        this.entity.img = JSON.parse(this.entity.img)
        this.entity.specs = JSON.parse(this.entity.specs)

        Object.freeze(this.entity)
      }

      toObject() {
        return {
          name: this.entity.name,
          code: this.entity.code,
          externalCode: this.entity.externalCode,
          price: (this.entity.price.Retail * 75) / 100 + this.entity.price.Retail,
          purchasePrice: this.entity.price.Retail,
          category: this.entity.info.ETIM_GROUP_NAME.split('/')[0],
          pictures: this.entity.img.map(({ URL }) => URL),
          vendor: this.entity.brand,
          barcode: this.entity.barcode.EAN,
        }
      }
    }

    const getCategories = (positions) => {
      const categories = {
        categories: [],
        subcategories: [],
      }

      for (const position of positions) {
        const extracted = JSON.parse(position.info).ETIM_GROUP_NAME.split('/')

        categories.categories.push(extracted[1])
        categories.subcategories.push({
          name: extracted[0],
          parentCategory: extracted[1],
        })
      }

      return categories
    }

    const getFirstTwo = async () => {
      const allPositions = await this.syncRepository.findAllPositions()
      const exact = await this.syncRepository.findPositionByCode(1445190)
      const extracted = await Promise.all(
        [allPositions[0], allPositions[1], exact[0]].map(async (position) => {
          const p = await this.warehouseService.findProductByCode(position.code)

          return {
            ...position,
            externalCode: p?.externalCode || '',
          }
        })
      )

      return extracted
    }

    const firstTwo = await getFirstTwo()

    return this.warehouseService.genICML({
      ...getCategories(firstTwo),
      offers: firstTwo.map((position) => new PositionDecorator(position).toObject()),
    })
  }

  async getPositionByCode(code) {
    return this.syncRepository.findPositionByCode(code)
  }
}
