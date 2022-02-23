import { GrpcExceptionsFilter }            from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }              from '@atls/nestjs-grpc-errors'
import { Controller }                      from '@nestjs/common'
import { UseFilters }                      from '@nestjs/common'
import { UsePipes }                        from '@nestjs/common'

import { v4 as uuid }                      from 'uuid'

import { CreateOzonProductResponse }       from '@marketplace/ozon-product-proto'
import { ProductServiceControllerMethods } from '@marketplace/ozon-product-proto'
import { ProductServiceController }        from '@marketplace/ozon-product-proto'

@Controller()
@ProductServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class ProductController implements ProductServiceController {
  @UsePipes(new GrpcValidationPipe())
  async createOzonProduct(request): Promise<CreateOzonProductResponse> {
    return {}
  }
}
