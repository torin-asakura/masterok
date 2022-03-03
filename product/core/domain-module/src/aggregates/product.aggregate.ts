import { AggregateRoot }  from '@nestjs/cqrs'

import { ProductCreated } from '../events'

export interface Price {
  buy: number
  sell: number
}

export interface ProductProperties {
  id: string
  name: string
  category: string
  subcategory: string
  price: Price
  article: string
  supplierCode: string
  brand: string
}

export class Product extends AggregateRoot {
  #id!: string

  #name!: string

  #category!: string

  #subcategory!: string

  #price!: Price

  #article!: string

  #supplierCode!: string

  #brand!: string

  constructor(properties?: ProductProperties) {
    super()

    if (properties) {
      this.#id = properties.id
      this.#name = properties.name
      this.#category = properties.category
      this.#subcategory = properties.subcategory
      this.#price = properties.price
      this.#article = properties.article
      this.#supplierCode = properties.supplierCode
      this.#brand = properties.brand
    }
  }

  get id() {
    return this.#id
  }

  get name() {
    return this.#name
  }

  get category() {
    return this.#category
  }

  get subcategory() {
    return this.#subcategory
  }

  get price() {
    return this.#price
  }

  get article() {
    return this.#article
  }

  get supplierCode() {
    return this.#supplierCode
  }

  get brand() {
    return this.#brand
  }

  async create(
    productId: string,
    name: string,
    category: string,
    subcategory: string,
    price: Price,
    article: string,
    supplierCode: string,
    brand: string
  ) {
    this.apply(
      new ProductCreated(
        productId,
        name,
        category,
        subcategory,
        price,
        article,
        supplierCode,
        brand
      )
    )

    return this
  }
}
