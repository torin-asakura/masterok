import { getBasicAuthToken }    from '@common/utils'

import axios                    from 'axios'

import { GetStocksResponse }    from './russvet.interfaces'
import { GetPositionsResponse } from './russvet.interfaces'
import { GetPriceResponse }     from './russvet.interfaces'
import { GetResidueResponse }   from './russvet.interfaces'
import { GetSpecsResponse }     from './russvet.interfaces'

export class RussvetAdapter {
  private readonly headers = {
    Authorization: getBasicAuthToken(
      process.env.RUSSVET_LOGIN || '',
      process.env.RUSSVET_PASSWORD || ''
    ),
  }
  private readonly url = process.env.RUSSVET_URL || ''

  constructor() {}

  async getStocks(): Promise<GetStocksResponse> {
    const stocks = await axios
      .get(`${this.url}/rs/stocks`, { headers: this.headers })
      .catch(() => {})

    if (!stocks) {
      return {
        stocks: [],
      }
    }

    return {
      stocks: stocks.data.Stocks,
    }
  }

  async getPositions(
    stockId: number,
    page: number = 1,
    category: string = 'instock'
  ): Promise<GetPositionsResponse> {
    const url = `${this.url}/rs/position/${stockId}/${category}?page=${page}`
    const positions = await axios.get(url, { headers: this.headers }).catch(() => {})

    if (!positions) {
      return {
        positions: [],
        pages: 0,
        count: 0,
      }
    }

    return {
      positions: positions.data.items[0],
      pages: positions.data.meta.last_page,
      count: positions.data.meta['rows count'],
    }
  }

  async getPrice(position: number): Promise<GetPriceResponse> {
    const price = await axios
      .get(`${this.url}/rs/price/${position}`, { headers: this.headers })
      .catch(() => {})

    if (!price) {
      return {
        price: {
          Personal: 0,
          Retail: 0,
        },
      }
    }

    return {
      price: price.data.Price,
    }
  }

  async getResidue(stockId: number, position: number): Promise<GetResidueResponse> {
    const residue = await axios
      .get(`${this.url}/rs/residue/${stockId}/${position}`, { headers: this.headers })
      .catch(() => {})

    if (!residue) {
      return {
        residue: 0,
        UOM: '',
      }
    }

    return {
      residue: residue.data.Residue,
      UOM: residue.data.UOM,
    }
  }

  async getSpecs(position: number): Promise<GetSpecsResponse> {
    const specs = await axios
      .get(`${this.url}/rs/specs/${position}`, { headers: this.headers })
      .catch(() => {})

    if (!specs) {
      return {
        info: {} as any,
        barcode: {} as any,
        specs: [] as any,
        img: [],
      }
    }

    return {
      info: specs.data.info[0],
      barcode: specs.data.barcode[0],
      specs: specs.data.specs,
      img: specs.data.img,
    }
  }
}
