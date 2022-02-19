import { protobufPackage }    from '../../gen/nestjs/team/masterok/product/v1alpha1/product.service'
import { productServicePath } from '../paths'
import { includeDirs }        from '../paths'

export const productGatewayHandler = {
  endpoint: process.env.PRODUCT_SERVICE_URL || '0.0.0.0:50051',
  protoFilePath: {
    file: productServicePath,
    load: { arrays: true, keepCase: false, defaults: true, oneofs: true, includeDirs },
  },
  serviceName: 'ProductService',
  packageName: protobufPackage,
  metaData: {
    authorization: ['req', 'headers', 'authorization'],
  },
}

export const gatewayHandlers = [productGatewayHandler]
