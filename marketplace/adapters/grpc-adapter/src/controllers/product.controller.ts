import { Logger }                                     from '@atls/logger'
import { GrpcExceptionsFilter }                       from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }                         from '@atls/nestjs-grpc-errors'
import { Controller }                                 from '@nestjs/common'
import { UseFilters }                                 from '@nestjs/common'
import { UsePipes }                                   from '@nestjs/common'

import { OzonApiService }                             from '@marketplace/application-module'
import { CreateOzonProductResponse }                  from '@marketplace/product-proto'
import { CreateWildberriesProductResponse }           from '@marketplace/product-proto'
import { CreateYandexProductResponse }                from '@marketplace/product-proto'
import { MarketplaceProductServiceControllerMethods } from '@marketplace/product-proto'
import { MarketplaceProductServiceController }        from '@marketplace/product-proto'

@Controller()
@MarketplaceProductServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class ProductController implements MarketplaceProductServiceController {
  private logger: Logger

  constructor(private readonly ozonApiService: OzonApiService) {
    this.logger = new Logger('ProductController')
  }

  @UsePipes(new GrpcValidationPipe())
  async createOzonProduct(request): Promise<CreateOzonProductResponse> {
    const result = await this.ozonApiService.createProduct(request)

    this.logger.info(result)

    return result
  }

  @UsePipes(new GrpcValidationPipe())
  async createWildberriesProduct(request): Promise<CreateWildberriesProductResponse> {
    return {}
  }

  @UsePipes(new GrpcValidationPipe())
  async createYandexProduct(request): Promise<CreateYandexProductResponse> {
    return {}
  }
}
