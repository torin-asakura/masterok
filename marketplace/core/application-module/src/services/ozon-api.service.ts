import { Logger }     from '@atls/logger'
import { Injectable } from '@nestjs/common'

import axios          from 'axios'

@Injectable()
export class OzonApiService {
  private readonly NAME = 'OzonApiService'

  private readonly headers = {
    'api-key': process.env.OZON_API_KEY || '',
    'client-id': process.env.OZON_CLIENT_ID || '',
    'Content-Type': 'application/json',
  }

  private logger: Logger

  constructor() {
    this.logger = new Logger(this.NAME)
  }

  async createProduct(request) {
    this.logger.info('CreateProduct')

    const response = await axios
      .post('https://api-seller.ozon.ru/v2/product/import', request, { headers: this.headers })
      .catch((e) => {
        this.logger.error(e)
      })

    return response?.data
  }
}
