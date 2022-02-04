import pino                from 'pino'
import pretty              from 'pino-pretty'
import { Logger }          from 'pino'

import { MoyskladService } from '@proxy/moysklad'
import { ProxyRepository } from '@proxy/repository'
import { RussvetService }  from '@proxy/russvet'
import { SyncService }     from '@proxy/sync'

export class ProxyService {
  private logger: Logger
  private proxyRepository: ProxyRepository
  private moyskladService: MoyskladService
  private russvetService: RussvetService
  private syncService: SyncService

  constructor() {
    this.logger = pino(
      pretty({
        colorize: true,
      })
    )
    this.proxyRepository = new ProxyRepository(this.logger)
    this.moyskladService = new MoyskladService(this.logger)
    this.russvetService = new RussvetService()
    this.syncService = new SyncService(
      this.proxyRepository,
      this.moyskladService,
      this.russvetService,
      this.logger
    )
  }

  async syncDbWithRussvet() {
    await this.syncService.syncDbWithRussvet()
  }

  async getLamps() {
    const positions = await this.proxyRepository.findAllPositions()
    return positions.filter(({ name }) => name.search(/Лампа/) !== -1)
  }

  async writeAttributes() {
    await this.syncService.writeAttributes()
  }

  async uniqueAttributes() {
    await this.syncService.uniqueAttributes()
  }

  async syncAttrsWithFile() {
    await this.proxyRepository.syncAttributesWithDb()
  }

  async syncAttrsWithMoysklad() {
    await this.syncService.syncAttributesWithMoySklad()
  }

  async getInstockLamps() {
    return this.moyskladService.getResidueByPositions()
  }
}
