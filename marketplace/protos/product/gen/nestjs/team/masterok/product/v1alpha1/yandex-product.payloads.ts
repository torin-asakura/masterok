import _m0       from 'protobufjs/minimal'
/* eslint-disable */
import Long      from 'long'

import { Price } from '../../../../team/masterok/product/v1alpha1/yandex-product.types'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export interface CreateYandexProductRequest {
  category: string
  name: string
  vendor: string
  offerId: string
  description?: string | undefined
  price?: Price
  picture?: string | undefined
}

export interface CreateYandexProductResponse {
  success: boolean
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}