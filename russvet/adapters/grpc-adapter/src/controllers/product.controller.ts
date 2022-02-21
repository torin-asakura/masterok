import { GrpcExceptionsFilter }            from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }              from '@atls/nestjs-grpc-errors'
import { Controller }                      from '@nestjs/common'
import { UseFilters }                      from '@nestjs/common'
import { UsePipes }                        from '@nestjs/common'

import { v4 as uuid }                      from 'uuid'

import { ProductServiceController }        from '@russvet/product-proto'
import { ProductServiceControllerMethods } from '@russvet/product-proto'
import { ListProductsResponse } from '@russvet/product-proto'
import { ListProductDetailsResponse } from '@russvet/product-proto'

@Controller()
@ProductServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class ProductController implements ProductServiceController {
  @UsePipes(new GrpcValidationPipe())
  async listProducts(request): Promise<ListProductsResponse> {
    return {
      products: []
    }
  }

  @UsePipes(new GrpcValidationPipe())
  async listProductDetails(request): Promise<ListProductDetailsResponse> {
    return {
      details: {}
    }
  }
}
