import * as controllers         from '../controllers'

import { GrpcPlaygroundModule } from '@atls/nestjs-grpc-playground'
import { DynamicModule }        from '@nestjs/common'
import { Module }               from '@nestjs/common'

import { serverOptions }        from '@marketplace/ozon-product-proto'

@Module({})
export class MarketplaceGrpcAdapterModule {
  static register(): DynamicModule {
    return {
      module: MarketplaceGrpcAdapterModule,
      controllers: Object.values(controllers),
      imports: [
        GrpcPlaygroundModule.register({
          options: serverOptions.options,
        }),
      ],
    }
  }
}
