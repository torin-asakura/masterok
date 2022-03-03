import { Product } from '../aggregates'

export abstract class ProductRepository {
  create(): Product {
    return new Product()
  }

  abstract save(aggregate: Product): Promise<void>
}
