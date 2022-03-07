import { AggregateRoot }  from '@nestjs/cqrs'

import { ProductCreated } from '../events'
import { ProductUpdated } from '../events'

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
  barcode: string
  images: string[]
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

  #barcode!: string

  #images!: string[]

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
      this.#barcode = properties.barcode
      this.#images = properties.images
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

  get barcode() {
    return this.#barcode
  }

  get images() {
    return this.#images
  }

  get properties() {
    return {
      id: this.#id,
      name: this.#name,
      category: this.#category,
      subcategory: this.#subcategory,
      price: this.#price,
      article: this.#article,
      supplierCode: this.#supplierCode,
      brand: this.#brand,
      barcode: this.#barcode,
      images: this.#images,
    }
  }

  async create(
    productId: string,
    name: string,
    category: string,
    subcategory: string,
    price: Price,
    article: string,
    supplierCode: string,
    brand: string,
    barcode: string,
    images: string[]
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
        brand,
        barcode,
        images
      )
    )

    return this
  }

  onProductCreated(event: ProductCreated) {
    this.#id = event.productId
    this.#name = event.name
    this.#category = event.category
    this.#subcategory = event.subcategory
    this.#price = event.price
    this.#article = event.article
    this.#supplierCode = event.supplierCode
    this.#brand = event.brand
    this.#barcode = event.barcode
    this.#images = event.images
  }

  async update(
    productId: string,
    name: string,
    category: string,
    subcategory: string,
    price: Price,
    article: string,
    supplierCode: string,
    brand: string,
    barcode: string,
    images: string[]
  ) {
    this.apply(
      new ProductUpdated(
        productId,
        name,
        category,
        subcategory,
        price,
        article,
        supplierCode,
        brand,
        barcode,
        images
      )
    )

    return this
  }

  onProductUpdated(event: ProductUpdated) {
    this.#id = event.productId
    this.#name = event.name
    this.#category = event.category
    this.#subcategory = event.subcategory
    this.#price = event.price
    this.#article = event.article
    this.#supplierCode = event.supplierCode
    this.#brand = event.brand
    this.#barcode = event.barcode
    this.#images = event.images
  }
}
