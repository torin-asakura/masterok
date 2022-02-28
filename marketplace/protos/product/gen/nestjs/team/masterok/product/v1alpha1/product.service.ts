import { Metadata }                     from '@grpc/grpc-js'
/* eslint-disable */
import { GrpcMethod }                   from '@nestjs/microservices'

import { GrpcStreamMethod } from '@nestjs/microservices'

import _m0                              from 'protobufjs/minimal'
import Long                             from 'long'
import { Observable }                   from 'rxjs'

import { CreateOzonProductRequest } from '../../../../team/masterok/product/v1alpha1/ozon-product.payloads'
import { CreateOzonProductResponse } from '../../../../team/masterok/product/v1alpha1/ozon-product.payloads'
import { CreateWildberriesProductRequest } from '../../../../team/masterok/product/v1alpha1/wildberries-product.payloads'

import { CreateWildberriesProductResponse } from '../../../../team/masterok/product/v1alpha1/wildberries-product.payloads'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

export interface ProductServiceClient {
  createOzonProduct(
    request: CreateOzonProductRequest,
    metadata?: Metadata
  ): Observable<CreateOzonProductResponse>

  createWildberriesProduct(
    request: CreateWildberriesProductRequest,
    metadata?: Metadata
  ): Observable<CreateWildberriesProductResponse>
}

export interface ProductServiceController {
  createOzonProduct(
    request: CreateOzonProductRequest,
    metadata?: Metadata
  ):
    | Promise<CreateOzonProductResponse>
    | Observable<CreateOzonProductResponse>
    | CreateOzonProductResponse

  createWildberriesProduct(
    request: CreateWildberriesProductRequest,
    metadata?: Metadata
  ):
    | Promise<CreateWildberriesProductResponse>
    | Observable<CreateWildberriesProductResponse>
    | CreateWildberriesProductResponse
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createOzonProduct', 'createWildberriesProduct']
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
