import { DynamicModule }             from '@nestjs/common'
import { Module }                    from '@nestjs/common'
import { ClientProxyFactory }        from '@nestjs/microservices'
import { Transport }                 from '@nestjs/microservices'

import { OzonProductServiceClient }  from '../../gen/nestjs/team/masterok/ozon-product/v1alpha1/ozon-product.service'
import { OZON_PRODUCT_SERVICE_NAME } from '../../gen/nestjs/team/masterok/ozon-product/v1alpha1/ozon-product.service'
import { protobufPackage }           from '../../gen/nestjs/team/masterok/ozon-product/v1alpha1/ozon-product.service'
import { ozonProductServicePath }    from '../paths'
import { includeDirs }               from '../paths'

export interface OzonProductServiceClientModuleOptions {
  url?: string
}

export const OZON_PRODUCT_SERVICE_CLIENT_TOKEN = `${OZON_PRODUCT_SERVICE_NAME}Client`

@Module({})
export class OzonProductServiceClientModule {
  static register(options: OzonProductServiceClientModuleOptions = {}): DynamicModule {
    const ozonProductServiceClientProvider = {
      provide: OZON_PRODUCT_SERVICE_CLIENT_TOKEN,
      useFactory: () => {
        const client = ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: protobufPackage,
            url: options.url || '0.0.0.0:50051',
            protoPath: ozonProductServicePath,
            loader: {
              arrays: true,
              keepCase: false,
              defaults: true,
              oneofs: true,
              includeDirs,
            },
          },
        })

        return client.getService<OzonProductServiceClient>(OZON_PRODUCT_SERVICE_NAME)
      },
    }

    return {
      global: true,
      module: OzonProductServiceClientModule,
      providers: [ozonProductServiceClientProvider],
      exports: [ozonProductServiceClientProvider],
    }
  }
}
