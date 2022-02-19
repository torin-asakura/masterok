import { CreateProductRequest } from '@survey/survey-proto'

import { Type }                from 'class-transformer'
import { IsNotEmpty }          from 'class-validator'

export class CreateProductDto implements CreateProductRequest {
  @IsNotEmpty()
  name!: string
}
