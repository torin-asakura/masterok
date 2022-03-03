import * as controllers                                from '../controllers'

import { GrpcPlaygroundModule }                        from '@atls/nestjs-grpc-playground'
import { DynamicModule }                               from '@nestjs/common'
import { Module }                                      from '@nestjs/common'
import { ClientsModule }                               from '@nestjs/microservices'

import { TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME } from '@marketplace/product-proto'
import { SyncService }                                 from '@sync/application-module'
import { serverOptions as productProtoServerOptions }  from '@marketplace/product-proto'
import { serverOptions as syncProtoServerOptions }     from '@sync/sync-proto'

@Module({})
export class SyncGrpcAdapterModule {
  static register(): DynamicModule {
    return {
      module: SyncGrpcAdapterModule,
      controllers: Object.values(controllers),
      providers: [SyncService],
      imports: [
        GrpcPlaygroundModule.register({
          options: syncProtoServerOptions.options,
        }),
        ClientsModule.register([
          {
            name: TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME,
            ...productProtoServerOptions,
          },
        ]),
      ],
    }
  }
}
