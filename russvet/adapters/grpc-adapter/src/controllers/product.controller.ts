import { Logger }                          from '@atls/logger'
import { GrpcExceptionsFilter }            from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }              from '@atls/nestjs-grpc-errors'
import { Controller }                      from '@nestjs/common'
import { UseFilters }                      from '@nestjs/common'
import { UsePipes }                        from '@nestjs/common'

import { ProductServiceController }        from '@russvet/product-proto'
import { ProductServiceControllerMethods } from '@russvet/product-proto'
import { ListProductsResponse }            from '@russvet/product-proto'
import { ListProductDetailsResponse }      from '@russvet/product-proto'
import { BaseProduct }                     from '@russvet/product-proto'

import { RussvetService }                  from '../services'

@Controller()
@ProductServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class ProductController implements ProductServiceController {
  private readonly NAME = 'RussvetGrpcAdapter'

  private logger: Logger

  constructor(private readonly russvetService: RussvetService) {
    this.logger = new Logger(this.NAME)
  }

  @UsePipes(new GrpcValidationPipe())
  async listProducts(request): Promise<ListProductsResponse> {
    const positions: Array<BaseProduct> = []

    const { stocks: allStocks } = await this.russvetService.getStocks()

    const stocks = allStocks.filter(({ NAME }) =>
      (process.env.STOCKS || '').split(' ').includes(NAME))

    for (const stock of stocks) {
      const { positions: current } = await this.russvetService.getPositions(stock.ORGANIZATION_ID)

      for (const position of current) {
        positions.push({
          name: position.NAME,
          code: position.CODE,
          brand: position.BRAND,
          category: position.CATEGORY,
        })
      }
    }

    return { products: positions }
  }

  @UsePipes(new GrpcValidationPipe())
  async listProductDetails(request): Promise<ListProductDetailsResponse> {
    const price: { Personal: number; Retail: number } | unknown =
      await this.russvetService.getPrice(request.code)
    const allSpecs: any = await this.russvetService.getSpecs(request.code)

    this.logger.info(allSpecs)

    return {
      details: {
        attributes: allSpecs.specs.map(({ NAME, VALUE, UOM }) => ({
          name: NAME,
          value: VALUE,
          uom: UOM,
        })),
        description: allSpecs.info.DESCRIPTION,
        primaryUom: allSpecs.info.PRIMARY_UOM,
        multiplicity: allSpecs.info.MULTIPLICITY,
        etimClass: allSpecs.info.ETIM_CLASS,
        etimClassName: allSpecs.info.ETIM_CLASS_NAME,
        etimGroup: allSpecs.info.ETIM_GROUP,
        etimGroupName: allSpecs.info.ETIM_GROUP_NAME,
        vendorCode: allSpecs.info.VENDOR_CODE,
        series: allSpecs.info.SERIES,
        originCountry: allSpecs.info.ORIGIN_COUNTRY,
        warranty: allSpecs.info.WARRANTY,
        barcode: allSpecs.barcode?.EAN || allSpecs.barcode?.EAN13 || '',
        images: allSpecs.img?.map(({ URL }) => URL),
        itemsPerUnit: allSpecs.info.ITEMS_PER_UNIT || '',
        price: {
          personal: price?.Personal || NaN,
          retail: price?.Retail || NaN,
        },
      },
    }
  }
}
