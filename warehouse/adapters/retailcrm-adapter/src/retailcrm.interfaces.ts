export interface Subcategory {
  name: string
  parentCategory: string
}

export interface Offer {
  price: number
  purchasePrice: number
  category: string
  pictures: Array<string>
  name: string
  vendor: string
  barcode: string
}

export interface ICML {
  categories: Array<string>
  subcategories: Array<Subcategory>
  offers: Array<Offer>
}

export interface IRetailCRMAdapter {
  generateICML(object: ICML)
}
