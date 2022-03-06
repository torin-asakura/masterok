import { IsNotEmpty }           from 'class-validator'

import { RemoveProductRequest } from '@product/product-proto'

export class RemoveProductDto implements RemoveProductRequest {
  @IsNotEmpty()
  id!: string
}
