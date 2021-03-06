Object.defineProperty(exports, '__esModule', { value: true })

const { Decimal } = require('./runtime/index-browser')

const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.8.1
 * Query Engine version: 34df67547cf5598f5a6cd3eb45f14ee70c3fb86f
 */
Prisma.prismaVersion = {
  client: '3.8.1',
  engine: '34df67547cf5598f5a6cd3eb45f14ee70c3fb86f',
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`)
}
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`)
}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`)
}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`)
}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`)
}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`)
}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`)
}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`)
}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`)
}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) {
  return x
}

exports.Prisma.PositionScalarFieldEnum = makeEnum({
  id: 'id',
  code: 'code',
  name: 'name',
  brand: 'brand',
  category: 'category',
  price: 'price',
  residue: 'residue',
  info: 'info',
  barcode: 'barcode',
  img: 'img',
  specs: 'specs',
})

exports.Prisma.AttributeScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  key: 'key',
  description: 'description',
  meta: 'meta',
})

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc',
})

exports.Prisma.NullableJsonNullValueInput = makeEnum({
  DbNull: 'DbNull',
  JsonNull: 'JsonNull',
})

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive',
})

exports.Prisma.JsonNullValueFilter = makeEnum({
  DbNull: 'DbNull',
  JsonNull: 'JsonNull',
  AnyNull: 'AnyNull',
})

exports.Prisma.ModelName = makeEnum({
  Position: 'Position',
  Attribute: 'Attribute',
})

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
