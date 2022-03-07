import { CommandHandler }       from '@nestjs/cqrs'
import { ICommandHandler }      from '@nestjs/cqrs'

import assert                   from 'assert'

import { ProductRepository }    from '@product/domain-module'

import { UpdateProductCommand } from '../commands'

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler implements ICommandHandler<UpdateProductCommand, void> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: UpdateProductCommand): Promise<void> {
    const product = await this.productRepository.findById(command.productId)

    assert.ok(product)

    await product.update(
      command.productId,
      command.name,
      command.category,
      command.subcategory,
      command.price,
      command.article,
      command.supplierCode,
      command.brand,
      command.barcode,
      command.images
    )

    await this.productRepository.save(product)
  }
}
