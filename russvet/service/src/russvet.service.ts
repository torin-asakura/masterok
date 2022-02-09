import { mapKeys }         from '@common/utils'
import { repeat }          from '@common/utils'

import camelcase           from 'camelcase'

import { RussvetAdapter }  from '@russvet/adapter'

import { IRussvetService } from './russvet.interfaces'

export class RussvetService implements IRussvetService {
  private russvetAdapter: RussvetAdapter

  constructor() {
    this.russvetAdapter = new RussvetAdapter()
  }

  async mapPositions(cb) {
    const { stocks: allStocks } = await this.russvetAdapter.getStocks()
    const stocks = allStocks.filter(({ NAME }) =>
      (process.env.STOCKS || '').split(' ').includes(NAME))

    for (const stock of stocks) {
      const { pages } = await this.russvetAdapter.getPositions(stock.ORGANIZATION_ID)

      repeat(pages, async (page) => {
        const { positions } = await this.russvetAdapter.getPositions(stock.ORGANIZATION_ID, page)

        for (const position of positions) {
          const code = Number(position.CODE)
          const price = await this.russvetAdapter.getPrice(code)
          const allSpecs = await this.russvetAdapter.getSpecs(code)
          const residue = await this.russvetAdapter.getResidue(stock.ORGANIZATION_ID, code)

          await cb(
            mapKeys(
              {
                ...position,
                ...price,
                ...allSpecs,
                residue,
              },
              camelcase
            )
          )
        }
      })
    }
  }

  async orderPositions(codes) {
    console.log(codes)

    for (const code of codes) {
      try {
        const response = await this.russvetAdapter.createOrder({
          orderNum: 1,
          deliveryLocationId: '428339',
          orderLines: [
            {
              lineNum: 1,
              RSCode: code,
              quantity: 1,
              uom: 'PCE',
              itemCode: 'Code321',
            },
          ],
        })

        console.log(response)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
