import { DynamicModule }        from '@nestjs/common'
import { Module }               from '@nestjs/common'
import { ClientProxyFactory }   from '@nestjs/microservices'
import { Transport }            from '@nestjs/microservices'

import { ProductServiceClient } from '../../gen/nestjs/team/masterok/product/v1alpha1/product.service'
import { PRODUCT_SERVICE_NAME } from '../../gen/nestjs/team/masterok/product/v1alpha1/product.service'
import { protobufPackage }      from '../../gen/nestjs/team/masterok/product/v1alpha1/product.service'
import { productServicePath }   from '../paths'
import { includeDirs }          from '../paths'

export interface ProductServiceClientModuleOptions {
  url?: string
}

export const PRODUCT_SERVICE_CLIENT_TOKEN = `${PRODUCT_SERVICE_NAME}Client`

@Module({})
export class ProductServiceClientModule {
  static register(options: ProductServiceClientModuleOptions = {}): DynamicModule {
    const productServiceClientProvider = {
      provide: PRODUCT_SERVICE_CLIENT_TOKEN,
      useFactory: () => {
        const client = ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: protobufPackage,
            url: options.url || '0.0.0.0:50051',
            protoPath: productServicePath,
            loader: {
              arrays: true,
              keepCase: false,
              defaults: true,
              oneofs: true,
              includeDirs,
            },
          },
        })

        return client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME)
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
