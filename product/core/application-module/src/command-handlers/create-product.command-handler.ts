import { CommandHandler }       from '@nestjs/cqrs'
import { ICommandHandler }      from '@nestjs/cqrs'

import { ProductRepository }    from '@product/domain-module'

import { CreateProductCommand } from '../commands'

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand, void> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: CreateProductCommand): Promise<void> {
    const product = this.productRepository.create()

    await product.create(
      command.productId,
      command.name,
      command.category,
      command.subcategory,
      command.price,
      command.article,
      command.supplierCode,
      command.brand
    )

    await this.productRepository.save(product)
  }
}
