export interface Stock {
  ORGANIZATION_ID: number
  NAME: string
}

export interface Position {
  CODE: string
  NAME: string
  BRAND: string
  CATEGORY: string
}

export interface Price {
  Personal: number
  Retail: number
}

export interface Info {
  DESCRIPTION: string
  PRIMARY_UOM: string
  MULTIPLICITY: number
  ETIM_CLASS: string
  ETIM_CLASS_NAME: string
  ETIM_GROUP: string
  ETIM_GROUP_NAME: string
  VENDOR_CODE: string
  SERIES: string
  ORIGIN_COUNTRY: string
  WARRANTY: string
  ITEMS_PER_UNIT?: number
}

export interface Barcode {
  EAN: string
  DESCRIPTION: string
}

export interface Specs {
  NAME: string
  VALUE: string
  UOM?: string
}

export interface Img {
  URL: string
}

export interface GetStocksResponse {
  stocks: Stock[]
}

export interface GetPositionsResponse {
  positions: Position[]
  pages: number
  count: number
}

export interface GetPriceResponse {
  price: Price
}

export interface GetResidueResponse {
  residue: number
  UOM: string
}

export interface GetSpecsResponse {
  info: Info
  barcode: Barcode
  specs: Specs
  img: Img[]
}

export interface FullPosition
  extends Position,
    GetPriceResponse,
    GetResidueResponse,
    GetSpecsResponse {}

export type GetStocks = () => Promise<GetStocksResponse>
export type GetPositions = (
  stockId: number,
  page?: number,
  category?: string
) => Promise<GetPositionsResponse>
export type GetPrice = (position: number) => Promise<GetPriceResponse>
export type GetResidue = (stockId: number, position: number) => Promise<GetResidueResponse>
export type GetSpecs = (position: number) => Promise<GetSpecsResponse>
