import * as controllers         from '../controllers'
import * as services            from '../services'

import { GrpcPlaygroundModule } from '@atls/nestjs-grpc-playground'
import { DynamicModule }        from '@nestjs/common'
import { Module }               from '@nestjs/common'

import { serverOptions }        from '@russvet/product-proto'

@Module({})
export class GrpcAdapterModule {
  static register(): DynamicModule {
    return {
      module: GrpcAdapterModule,
      controllers: Object.values(controllers),
      providers: Object.values(services),
      imports: [
        GrpcPlaygroundModule.register({
          options: serverOptions.options,
        }),
      ],
    }
  }
}
