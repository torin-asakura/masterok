import { MoyskladAdapter }   from '@warehouse/moysklad-adapter'
import { RetailCRMAdapter }  from '@warehouse/retailcrm-adapter'
import { ICML }              from '@warehouse/retailcrm-adapter'

import { IWarehouseService } from './warehouse.interfaces'

export class WarehouseService implements IWarehouseService {
  private moyskladAdapter: MoyskladAdapter

  private retailCRMAdapter: RetailCRMAdapter

  constructor() {
    this.moyskladAdapter = new MoyskladAdapter()
    this.retailCRMAdapter = new RetailCRMAdapter()
  }

  async createProduct(product) {
    return this.moyskladAdapter.createProduct(product)
  }

  async getStocks() {
    return this.moyskladAdapter.getStocks()
  }

  genICML(object: ICML) {
    return this.retailCRMAdapter.generateICML(object)
  }

  async findProductByCode(code) {
    return this.moyskladAdapter.findProductByCode(code)
  }
}
