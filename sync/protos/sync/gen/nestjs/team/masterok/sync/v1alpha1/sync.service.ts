import { Metadata }                       from '@grpc/grpc-js'
/* eslint-disable */
import { GrpcMethod }                     from '@nestjs/microservices'
import { GrpcStreamMethod }               from '@nestjs/microservices'

import _m0                                from 'protobufjs/minimal'
import Long                               from 'long'
import { Observable }                     from 'rxjs'

import { TransferPositionToOzonRequest }  from '../../../../team/masterok/sync/v1alpha1/sync.payloads'
import { TransferPositionToOzonResponse } from '../../../../team/masterok/sync/v1alpha1/sync.payloads'

export const protobufPackage = 'team.masterok.sync.v1alpha1'

export const TEAM_MASTEROK_SYNC_V1ALPHA1_PACKAGE_NAME = 'team.masterok.sync.v1alpha1'

export interface SyncServiceClient {
  transferPositionToOzon(
    request: TransferPositionToOzonRequest,
    metadata?: Metadata
  ): Observable<TransferPositionToOzonResponse>
}

export interface SyncServiceController {
  transferPositionToOzon(
    request: TransferPositionToOzonRequest,
    metadata?: Metadata
  ):
    | Promise<TransferPositionToOzonResponse>
    | Observable<TransferPositionToOzonResponse>
    | TransferPositionToOzonResponse
}

export function SyncServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['transferPositionToOzon']
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcMethod('SyncService', method)(constructor.prototype[method], method, descriptor)
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcStreamMethod('SyncService', method)(constructor.prototype[method], method, descriptor)
    }
  }
}

export const SYNC_SERVICE_NAME = 'SyncService'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
