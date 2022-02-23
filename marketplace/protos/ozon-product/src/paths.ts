/* eslint-disable */
/// <reference types='@monstrs/types-import-proto'/>

declare const __non_webpack_require__: any

import { join } from 'path'

export const ozonProductServicePath =
  typeof __non_webpack_require__ === 'undefined'
    ? join(__dirname, '../team/masterok/ozon-product/v1alpha1/ozon-product.service.proto')
    : require('../team/masterok/ozon-product/v1alpha1/ozon-product.service.proto').default

export const includeDirs = [__dirname, join(__dirname, '..')]
