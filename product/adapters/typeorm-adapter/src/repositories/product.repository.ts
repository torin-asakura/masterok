import { Injectable }        from '@nestjs/common'
import { EventBus }          from '@nestjs/cqrs'
import { InjectRepository }  from '@nestjs/typeorm'

import { Repository }        from 'typeorm'

import { ProductRepository } from '@product/domain-module'
import { Product }           from '@product/domain-module'

import { ProductEntity }     from '../entities'

@Injectable()
export class ProductRepositoryImpl extends ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
    private readonly eventBus: EventBus
  ) {
    super()
  }

  async save(aggregate: Product): Promise<void> {
    await this.repository.save(await this.aggregateToEntity(aggregate))

    if (aggregate.getUncommittedEvents().length > 0) {
      this.eventBus.publishAll(aggregate.getUncommittedEvents())
    }

    aggregate.commit()
  }

  async findById(id: string): Promise<Product | undefined> {
    const entity = await this.repository.findOne({ id })

    return entity ? this.entityToAggregate(entity) : undefined
  }

  async remove(aggregate: Product): Promise<void> {
    await this.repository.remove(await this.aggregateToEntity(aggregate))
  }

  private entityToAggregate(entity: ProductEntity): Product {
    return new Product(entity)
  }

  private async aggregateToEntity(data: Product): Promise<ProductEntity> {
    return Object.assign(new ProductEntity(), data.properties)
  }
}
