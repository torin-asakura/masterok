/* eslint-disable */
/// <reference types='@monstrs/types-import-proto'/>

declare const __non_webpack_require__: any

import { join } from 'path'

export const syncServicePath =
  typeof __non_webpack_require__ === 'undefined'
    ? join(__dirname, '../team/masterok/sync/v1alpha1/sync.service.proto')
    : require('../team/masterok/sync/v1alpha1/sync.service.proto').default

export const includeDirs = [__dirname, join(__dirname, '..')]
