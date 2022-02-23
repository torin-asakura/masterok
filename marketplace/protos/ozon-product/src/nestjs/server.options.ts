import { Transport }              from '@nestjs/microservices'
import { GrpcOptions }            from '@nestjs/microservices'
import { serverReflectionPath }   from '@atls/nestjs-grpc-reflection/proto'

import { protobufPackage }        from '../../gen/nestjs/team/masterok/ozon-product/v1alpha1/ozon-product.service'
import { ozonProductServicePath } from '../paths'
import { includeDirs }            from '../paths'

export const serverOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['grpc.reflection.v1alpha', protobufPackage],
    protoPath: [serverReflectionPath, ozonProductServicePath],
    url: '0.0.0.0:50051',
    loader: {
      arrays: true,
      enums: String,
      keepCase: false,
      defaults: true,
      oneofs: true,
      includeDirs,
    },
  },
}
