import { CreateProductRequest } from '@survey/survey-proto'

import { IsNotEmpty }           from 'class-validator'

export class CreateProductDto implements CreateProductRequest {
  @IsNotEmpty()
  name!: string
}
