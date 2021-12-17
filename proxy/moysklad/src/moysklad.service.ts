import axios                 from 'axios'
import { Logger }            from 'pino'

import { getBasicAuthToken } from '@proxy/common'

import { Product }           from './moysklad.interfaces'
import { Stock }             from './moysklad.interfaces'

export class MoyskladService {
  private readonly headers = {
    Authorization: getBasicAuthToken(
      process.env.MOYSKLAD_LOGIN || '',
      process.env.MOYSKLAD_PASSWORD || ''
    ),
    'Content-Type': 'application/json',
  }

  constructor(private readonly logger: Logger) {}

  async createProduct(product: Product) {
    const response = await axios
      .post('https://online.moysklad.ru/api/remap/1.2/entity/product', product, {
        headers: this.headers,
      })
      .catch((e) => this.logger.error(e.response.data.errors))

    this.logger.info(`Created product ${product.name}`)

    return response
  }

  async createStock(stock: Stock) {
    const response = await axios
      .post('https://online.moysklad.ru/api/remap/1.2/entity/store', stock, {
        headers: this.headers,
      })
      .catch((e) => this.logger.error(e.response.data.errors))

    this.logger.info(`Created stock ${stock.name} ${stock.code}`)

    return response
  }

  async getStocks(): Promise<{ stocks: any[] }> {
    const response: any = await axios
      .get('https://online.moysklad.ru/api/remap/1.2/entity/store', { headers: this.headers })
      .catch((e) => this.logger.error(e.response.data.errors))

    this.logger.info(`Successfully fetched stocks`)

    return {
      stocks: response.data.rows,
    }
  }
}
