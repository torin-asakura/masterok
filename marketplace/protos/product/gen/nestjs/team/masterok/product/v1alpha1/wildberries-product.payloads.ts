import _m0  from 'protobufjs/minimal'
/* eslint-disable */
import Long from 'long'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export interface CreateWildberriesProductRequest {
  id: string
  jsonrpc: string
  params?: CreateWildberriesProductRequest_Params
}

export interface CreateWildberriesProductRequest_Params {
  card?: CreateWildberriesProductRequest_Params_Card
}

export interface CreateWildberriesProductRequest_Params_Addin {
  type: string
  params: CreateWildberriesProductRequest_Params_Addin_Param[]
}

export interface CreateWildberriesProductRequest_Params_Addin_Param {
  count?: number | undefined
  units?: string | undefined
  value: string
}

export interface CreateWildberriesProductRequest_Params_Card {
  countryProduction: string
  object: string
  supplierVendorCode: string
  addin: CreateWildberriesProductRequest_Params_Addin[]
}

export interface CreateWildberriesProductRequest_Params_Card_Nomenclature {
  vendorCode: string
  variations: CreateWildberriesProductRequest_Params_Card_Nomenclature_Variation[]
  addin: CreateWildberriesProductRequest_Params_Addin[]
}

export interface CreateWildberriesProductRequest_Params_Card_Nomenclature_Variation {
  barcode: string
  addin: CreateWildberriesProductRequest_Params_Addin[]
}

export interface CreateWildberriesProductResponse {
  code?: number | undefined
  data?: CreateWildberriesProductResponse_Empty | undefined
  message?: string | undefined
  error?: CreateWildberriesProductResponse_ErrorPayload | undefined
  id?: string | undefined
  jsonrpc?: string | undefined
}

export interface CreateWildberriesProductResponse_Empty {}

export interface CreateWildberriesProductResponse_ErrorPayload {
  code: number
  data?: CreateWildberriesProductResponse_Empty
  message: string
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
