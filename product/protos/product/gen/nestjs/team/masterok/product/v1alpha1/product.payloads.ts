import _m0  from 'protobufjs/minimal'
/* eslint-disable */
import Long from 'long'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export interface CreateProductRequest {
  name: string
}

export interface CreateProductResponse {
  id: string
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
