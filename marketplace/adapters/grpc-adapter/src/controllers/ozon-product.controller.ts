import { GrpcExceptionsFilter }                from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }                  from '@atls/nestjs-grpc-errors'
import { Controller }                          from '@nestjs/common'
import { UseFilters }                          from '@nestjs/common'
import { UsePipes }                            from '@nestjs/common'

import { v4 as uuid }                          from 'uuid'

import { CreateOzonProductResponse }           from '@marketplace/ozon-product-proto'
import { OzonProductServiceControllerMethods } from '@marketplace/ozon-product-proto'
import { OzonProductServiceController }        from '@marketplace/ozon-product-proto'

@Controller()
@OzonProductServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class OzonProductController implements OzonProductServiceController {
  @UsePipes(new GrpcValidationPipe())
  async createOzonProduct(request): Promise<CreateOzonProductResponse> {
    return {}
  }
}
