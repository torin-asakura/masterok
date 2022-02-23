import { Metadata }                     from '@grpc/grpc-js'
/* eslint-disable */
import { GrpcMethod }                   from '@nestjs/microservices'

import { GrpcStreamMethod } from '@nestjs/microservices'

import _m0                              from 'protobufjs/minimal'
import Long                             from 'long'
import { Observable }                   from 'rxjs'

import { CreateOzonProductRequest } from '../../../../team/masterok/product/v1alpha1/ozon-product.payloads'

import { CreateOzonProductResponse } from '../../../../team/masterok/product/v1alpha1/ozon-product.payloads'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

export interface ProductServiceClient {
  createOzonProduct(
    request: CreateOzonProductRequest,
    metadata?: Metadata
  ): Observable<CreateOzonProductResponse>
}

export interface ProductServiceController {
  createOzonProduct(
    request: CreateOzonProductRequest,
    metadata?: Metadata
  ):
    | Promise<CreateOzonProductResponse>
    | Observable<CreateOzonProductResponse>
    | CreateOzonProductResponse
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createOzonProduct']
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcMethod('ProductService', method)(constructor.prototype[method], method, descriptor)
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcStreamMethod('ProductService', method)(constructor.prototype[method], method, descriptor)
    }
  }
}

export const PRODUCT_SERVICE_NAME = 'ProductService'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
