import { protobufPackage }        from '../../gen/nestjs/team/masterok/ozon-product/v1alpha1/ozon-product.service'
import { ozonProductServicePath } from '../paths'
import { includeDirs }            from '../paths'

export const ozonProductGatewayHandler = {
  endpoint: process.env.OZON_PRODUCT_SERVICE_URL || '0.0.0.0:50051',
  protoFilePath: {
    file: ozonProductServicePath,
    load: { arrays: true, keepCase: false, defaults: true, oneofs: true, includeDirs },
  },
  serviceName: 'OzonProductService',
  packageName: protobufPackage,
  metaData: {
    authorization: ['req', 'headers', 'authorization'],
  },
}

export const gatewayHandlers = [ozonProductGatewayHandler]
