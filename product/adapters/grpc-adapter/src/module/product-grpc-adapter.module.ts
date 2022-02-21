import * as controllers         from '../controllers'

import { GrpcPlaygroundModule } from '@atls/nestjs-grpc-playground'
import { DynamicModule }        from '@nestjs/common'
import { Module }               from '@nestjs/common'

import { serverOptions }        from '@product/product-proto'

@Module({})
export class ProductGrpcAdapterModule {
  static register(): DynamicModule {
    return {
      module: ProductGrpcAdapterModule,
      controllers: Object.values(controllers),
      imports: [
        GrpcPlaygroundModule.register({
          options: serverOptions.options,
        }),
      ],
    }
  }
}
