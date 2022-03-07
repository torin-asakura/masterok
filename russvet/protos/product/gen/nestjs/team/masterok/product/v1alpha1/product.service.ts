import { Metadata }                   from '@grpc/grpc-js'
/* eslint-disable */
import { GrpcMethod }                 from '@nestjs/microservices'
import { GrpcStreamMethod }           from '@nestjs/microservices'

import _m0                            from 'protobufjs/minimal'
import Long                           from 'long'
import { Observable }                 from 'rxjs'

import { ListProductDetailsRequest }  from '../../../../team/masterok/product/v1alpha1/product.payloads'
import { ListProductDetailsResponse } from '../../../../team/masterok/product/v1alpha1/product.payloads'
import { ListProductsRequest }        from '../../../../team/masterok/product/v1alpha1/product.payloads'
import { ListProductsResponse }       from '../../../../team/masterok/product/v1alpha1/product.payloads'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

export interface ProductServiceClient {
  listProducts(request: ListProductsRequest, metadata?: Metadata): Observable<ListProductsResponse>

  listProductDetails(
    request: ListProductDetailsRequest,
    metadata?: Metadata
  ): Observable<ListProductDetailsResponse>
}

export interface ProductServiceController {
  listProducts(
    request: ListProductsRequest,
    metadata?: Metadata
  ): Promise<ListProductsResponse> | Observable<ListProductsResponse> | ListProductsResponse

  listProductDetails(
    request: ListProductDetailsRequest,
    metadata?: Metadata
  ):
    | Promise<ListProductDetailsResponse>
    | Observable<ListProductDetailsResponse>
    | ListProductDetailsResponse
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['listProducts', 'listProductDetails']
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
