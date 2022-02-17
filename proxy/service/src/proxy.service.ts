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

  async orderLamp() {
    await this.russvetService.orderPositions(['19565'])
  }

  async getPositions() {
    return this.proxyRepository.findAllPositions()
  }
}
