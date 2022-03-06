import _m0         from 'protobufjs/minimal'
/* eslint-disable */
import Long        from 'long'

import { Price }   from '../../../../team/masterok/product/v1alpha1/product.types'
import { Product } from '../../../../team/masterok/product/v1alpha1/product.types'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export interface CreateProductRequest {
  name: string
  category: string
  subcategory: string
  price?: Price
  article: string
  supplierCode: string
  brand: string
  barcode?: string | undefined
  images: string[]
}

export interface CreateProductResponse {
  id: string
}

export interface ListProductsRequest {}

export interface ListProductsResponse {
  products: Product[]
}

export interface UpdateProductRequest {
  product?: Product
}

export interface UpdateProductResponse {
  id: string
}

export interface RemoveProductRequest {
  id: string
}

export interface RemoveProductResponse {
  id: string
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
