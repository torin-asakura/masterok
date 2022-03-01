import * as controllers         from '../controllers'

import { GrpcPlaygroundModule } from '@atls/nestjs-grpc-playground'
import { DynamicModule }        from '@nestjs/common'
import { Module }               from '@nestjs/common'

import { OzonApiService }       from '@marketplace/application-module'
import { serverOptions }        from '@marketplace/product-proto'

@Module({})
export class MarketplaceGrpcAdapterModule {
  static register(): DynamicModule {
    return {
      module: MarketplaceGrpcAdapterModule,
      controllers: Object.values(controllers),
      providers: [OzonApiService],
      imports: [
        GrpcPlaygroundModule.register({
          options: serverOptions.options,
        }),
      ],
    }
  }
}
