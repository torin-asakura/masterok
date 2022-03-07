import _m0  from 'protobufjs/minimal'
/* eslint-disable */
import Long from 'long'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export enum DimensionUnit {
  MM = 0,
  CM = 1,
  IN = 2,
  UNRECOGNIZED = -1,
}

export enum ServiceType {
  IS_CODE_SERVICE = 0,
  IS_NO_CODE_SERVICE = 1,
  UNRECOGNIZED = -1,
}

export enum WeightUnit {
  G = 0,
  KG = 1,
  LB = 2,
  UNRECOGNIZED = -1,
}

export interface Attribute {
  complexId: number
  id: number
  values: AttributeValue[]
}

export interface AttributeValue {
  dictionaryValueId: number
  value: string
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
