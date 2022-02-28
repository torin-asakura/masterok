import { GrpcExceptionsFilter }             from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }               from '@atls/nestjs-grpc-errors'
import { Controller }                       from '@nestjs/common'
import { UseFilters }                       from '@nestjs/common'
import { UsePipes }                         from '@nestjs/common'

import { v4 as uuid }                       from 'uuid'

import { CreateOzonProductResponse }        from '@marketplace/product-proto'
import { CreateWildberriesProductResponse } from '@marketplace/product-proto'
import { ProductServiceControllerMethods }  from '@marketplace/product-proto'
import { ProductServiceController }         from '@marketplace/product-proto'

@Controller()
@ProductServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class ProductController implements ProductServiceController {
  @UsePipes(new GrpcValidationPipe())
  async createOzonProduct(request): Promise<CreateOzonProductResponse> {
    return {}
  }

  @UsePipes(new GrpcValidationPipe())
  async createWildberriesProduct(request): Promise<CreateWildberriesProductResponse> {
    return {}
  }
}
