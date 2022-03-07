import _m0              from 'protobufjs/minimal'
/* eslint-disable */
import Long             from 'long'

import { Empty }        from '../../../../team/masterok/product/v1alpha1/wildberries-product.types'
import { ErrorPayload } from '../../../../team/masterok/product/v1alpha1/wildberries-product.types'
import { Params }       from '../../../../team/masterok/product/v1alpha1/wildberries-product.types'

export const protobufPackage = 'team.masterok.product.v1alpha1'

export interface CreateWildberriesProductRequest {
  id: string
  jsonrpc: string
  params?: Params
}

export interface CreateWildberriesProductResponse {
  code?: number | undefined
  data?: Empty | undefined
  message?: string | undefined
  error?: ErrorPayload | undefined
  id?: string | undefined
  jsonrpc?: string | undefined
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME = 'team.masterok.product.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
