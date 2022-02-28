import _m0  from 'protobufjs/minimal'
/* eslint-disable */
import Long from 'long'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export interface Empty {}

export interface Addin {
  type: string
  params: Addin_Param[]
}

export interface Addin_Param {
  count?: number | undefined
  units?: string | undefined
  value: string
}

export interface Nomenclature {
  vendorCode: string
  variations: Nomenclature_Variation[]
  addin: Addin[]
}

export interface Nomenclature_Variation {
  barcode: string
  addin: Addin[]
}

export interface ErrorPayload {
  code: number
  data?: Empty
  message: string
}

export interface Card {
  countryProduction: string
  object: string
  supplierVendorCode: string
  addin: Addin[]
  nomenclatures: Nomenclature[]
}

export interface Params {
  card?: Card
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
