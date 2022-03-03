import { DynamicModule }      from '@nestjs/common'
import { Module }             from '@nestjs/common'
import { ClientProxyFactory } from '@nestjs/microservices'
import { Transport }          from '@nestjs/microservices'

import { SyncServiceClient }  from '../../gen/nestjs/team/masterok/sync/v1alpha1/sync.service'
import { SYNC_SERVICE_NAME }  from '../../gen/nestjs/team/masterok/sync/v1alpha1/sync.service'
import { protobufPackage }    from '../../gen/nestjs/team/masterok/sync/v1alpha1/sync.service'
import { syncServicePath }    from '../paths'
import { includeDirs }        from '../paths'

export interface SyncServiceClientModuleOptions {
  url?: string
}

export const SYNC_SERVICE_CLIENT_TOKEN = `${SYNC_SERVICE_NAME}Client`

@Module({})
export class SyncServiceClientModule {
  static register(options: SyncServiceClientModuleOptions = {}): DynamicModule {
    const syncServiceClientProvider = {
      provide: SYNC_SERVICE_CLIENT_TOKEN,
      useFactory: () => {
        const client = ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: protobufPackage,
            url: options.url || '0.0.0.0:50051',
            protoPath: syncServicePath,
            loader: {
              arrays: true,
              keepCase: false,
              defaults: true,
              oneofs: true,
              includeDirs,
            },
          },
        })

        return client.getService<SyncServiceClient>(SYNC_SERVICE_NAME)
      },
    }

    return {
      global: true,
      module: SyncServiceClientModule,
      providers: [syncServiceClientProvider],
      exports: [syncServiceClientProvider],
    }
  }
}
