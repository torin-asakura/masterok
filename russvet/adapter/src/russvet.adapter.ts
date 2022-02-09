import { getBasicAuthToken } from '@common/utils'

import axios                 from 'axios'

import { IRussvetAdapter }   from './russvet.interfaces'

export class RussvetAdapter implements IRussvetAdapter {
  private readonly headers = {
    Authorization: getBasicAuthToken(
      process.env.RUSSVET_LOGIN || '',
      process.env.RUSSVET_PASSWORD || ''
    ),
  }
  private readonly url = process.env.RUSSVET_URL || ''

  constructor() {}

  async getStocks() {
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

  async getPositions(stockId, page = 1, category = 'instock') {
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

  async getPrice(position) {
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

  async getResidue(stockId, position) {
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

  async getSpecs(position) {
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

  async getDeliveryLocations() {
    const deliveryLocations = await axios.get(`${this.url}/rs/custorders/Delivery/Locations`, {
      headers: this.headers,
    })

    if (!deliveryLocations.data) {
      return {
        DeliveryLocations: [],
      }
    }

    return deliveryLocations.data
  }

  async createOrder(options) {
    return axios.post(
      `${this.url}/rs/custorders/new`,
      { order: options },
      { headers: this.headers }
    )
  }

  async getOrderDetails(options) {
    const orderDetails = await axios.get(`${this.url}/rs/custorders/orderinfo`, {
      headers: {
        ...this.headers,
        orderNum: options.orderNum,
      },
    })

    if (!orderDetails.data) {
      return {
        orderInfo: {},
      }
    }

    return orderDetails.data
  }
}
