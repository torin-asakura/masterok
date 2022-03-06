import { Product } from '../aggregates'

export abstract class ProductRepository {
  create(): Product {
    return new Product()
  }

  abstract save(aggregate: Product): Promise<void>

  abstract findById(id: string): Promise<Product | undefined>

  abstract remove(id: string): Promise<Product | undefined>
}
