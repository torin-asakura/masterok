export interface Meta {
  href: string
  metadataHref?: string
  type?: string
  mediaType?: string
}

export interface Price {
  value: number
  meta?: Meta
}

export interface Product {
  name: string
  code?: string
  externalCode?: string
  description?: string
  vat?: string
  effectiveVat?: string
  discountProhibited?: boolean
  uom?: {
    meta: Meta
  }
  supplier?: {
    meta: Meta
  }
  minPrice?: Price
  buyPrice?: Price
  salePrices?: Price[]
  barcodeEan?: string
  article?: string
  weight?: number
  volume?: number
  packs?: any[]
  isSerialTrackable?: boolean
  trackingType?: string
}

export interface Stock {
  name: string
  code: string
}
