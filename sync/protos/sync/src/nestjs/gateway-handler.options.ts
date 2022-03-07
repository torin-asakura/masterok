import { protobufPackage } from '../../gen/nestjs/team/masterok/sync/v1alpha1/sync.service'
import { syncServicePath } from '../paths'
import { includeDirs }     from '../paths'

export const syncGatewayHandler = {
  endpoint: process.env.PRODUCT_SERVICE_URL || '0.0.0.0:50051',
  protoFilePath: {
    file: syncServicePath,
    load: { arrays: true, keepCase: false, defaults: true, oneofs: true, includeDirs },
  },
  serviceName: 'SyncService',
  packageName: protobufPackage,
  metaData: {
    authorization: ['req', 'headers', 'authorization'],
  },
}

export const gatewayHandlers = [syncGatewayHandler]
