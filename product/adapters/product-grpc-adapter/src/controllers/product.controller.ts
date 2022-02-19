import { GrpcExceptionsFilter }            from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }              from '@atls/nestjs-grpc-errors'
import { Controller }                      from '@nestjs/common'
import { UseFilters }                      from '@nestjs/common'
import { UsePipes }                        from '@nestjs/common'

import { v4 as uuid }                      from 'uuid'

import { CreateProductResponse }            from '@product/product-proto'
import { ProductServiceControllerMethods } from '@product/product-proto'
import { ProductServiceController }        from '@product/product-proto'

import { CreateProductDto }                 from '../dto'

@Controller()
@ProductServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class ProductController implements ProductServiceController {
  @UsePipes(new GrpcValidationPipe())
  async createProduct(request: CreateProductDto): Promise<CreateProductResponse> {
    return {
      id: uuid(),
    }
  }
}
