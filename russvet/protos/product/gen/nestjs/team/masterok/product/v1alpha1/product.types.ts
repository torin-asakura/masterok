import _m0  from 'protobufjs/minimal'
/* eslint-disable */
import Long from 'long'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export interface BaseProduct {
  name: string
  code: string
  brand: string
  category: string
}

export interface Price {
  personal: string
  retail: string
}

export interface Attribute {
  name: string
  value: string
  uom: string
}

export interface ProductDetails {
  description: string
  primaryUom: string
  multiplicity: string
  etimClass: string
  etimClassName: string
  etimGroup: string
  etimGroupName: string
  vendorCode: string
  series: string
  originCountry: string
  warranty: string
  itemsPerUnit: string
  barcode: string
  attributes: Attribute[]
  images: string[]
  price?: Price
}

export interface Product {
  info?: BaseProduct
  details?: ProductDetails
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
