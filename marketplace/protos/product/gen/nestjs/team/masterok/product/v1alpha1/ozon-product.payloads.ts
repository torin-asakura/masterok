import _m0  from 'protobufjs/minimal'
/* eslint-disable */
import Long from 'long'

import { Attribute } from '../../../../team/masterok/product/v1alpha1/ozon-product.types'

import { DimensionUnit } from '../../../../team/masterok/product/v1alpha1/ozon-product.types'

import { ServiceType } from '../../../../team/masterok/product/v1alpha1/ozon-product.types'

import { WeightUnit } from '../../../../team/masterok/product/v1alpha1/ozon-product.types'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export interface CreateOzonProductRequest {
  items: CreateOzonProductRequest_Item[]
}

export interface CreateOzonProductRequest_Item {
  attributes: Attribute[]
  barcode?: string | undefined
  categoryId: number
  colorImage?: string | undefined
  complexAttributes: CreateOzonProductRequest_Item_ComplexAttribute[]
  depth: number
  dimensionUnit: DimensionUnit
  geoNames: string[]
  height: number
  images: string[]
  primaryImage: string
  serviceType: ServiceType
  images360: string[]
  name: string
  offerId: string
  oldPrice: string
  pdfList: CreateOzonProductRequest_Item_Pdf[]
  premiumPrice: string
  price: string
  vat: string
  weight: number
  weightUnit: WeightUnit
  width: number
}

export interface CreateOzonProductRequest_Item_ComplexAttribute {
  attributes: Attribute[]
}

export interface CreateOzonProductRequest_Item_Pdf {
  index: number
  name: string
  srcUrl: string
}

export interface CreateOzonProductResponse {
  result?: CreateOzonProductResponse_Result
  code: number
  details: CreateOzonProductResponse_Detail[]
  message: string
}

export interface CreateOzonProductResponse_Result {
  taskId: number
}

export interface CreateOzonProductResponse_Detail {
  typeUrl: string
  value: string
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
