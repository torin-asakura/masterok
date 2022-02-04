import { MoyskladAdapter }   from '@warehouse/moysklad-adapter'

import { IWarehouseService } from './warehouse.interfaces'

export class WarehouseService implements IWarehouseService {
  private vendorAdapter: MoyskladAdapter

  constructor() {
    this.vendorAdapter = new MoyskladAdapter()
  }

  async createProduct(product) {
    return this.vendorAdapter.createProduct(product)
  }

  async getStocks() {
    return this.vendorAdapter.getStocks()
  }
}
