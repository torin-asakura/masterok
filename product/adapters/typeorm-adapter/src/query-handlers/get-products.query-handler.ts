import { IQueryHandler }    from '@nestjs/cqrs'
import { QueryHandler }     from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository }       from 'typeorm'

import { GetProductsQuery } from '@product/application-module'

import { ProductEntity }    from '../entities'

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>
  ) {}

  async execute() {
    const qb = await this.repository.createQueryBuilder('product')
    const products = await qb.getMany()
    return products
  }
}
