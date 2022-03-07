import { IsNotEmpty }           from 'class-validator'

import { UpdateProductRequest } from '@product/product-proto'

export class UpdateProductDto implements UpdateProductRequest {
  @IsNotEmpty()
  product!: {
    id: string
    name: string
    category: string
    subcategory: string
    price: { buy: number; sell: number }
    article: string
    supplierCode: string
    brand: string
    barcode: string
    images: string[]
  }
}
