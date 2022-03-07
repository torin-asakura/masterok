import { IsNotEmpty }           from 'class-validator'

import { CreateProductRequest } from '@product/product-proto'

export class CreateProductDto implements CreateProductRequest {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  category!: string

  @IsNotEmpty()
  subcategory!: string

  @IsNotEmpty()
  price!: { buy: number; sell: number }

  @IsNotEmpty()
  article!: string

  @IsNotEmpty()
  supplierCode!: string

  @IsNotEmpty()
  brand!: string

  @IsNotEmpty()
  barcode!: string

  @IsNotEmpty()
  images!: string[]
}
