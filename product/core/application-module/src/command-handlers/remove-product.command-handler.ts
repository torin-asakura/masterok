import { CommandHandler }       from '@nestjs/cqrs'
import { ICommandHandler }      from '@nestjs/cqrs'

import assert                   from 'assert'

import { ProductRepository }    from '@product/domain-module'

import { RemoveProductCommand } from '../commands'

@CommandHandler(RemoveProductCommand)
export class RemoveProductCommandHandler implements ICommandHandler<RemoveProductCommand, void> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: RemoveProductCommand): Promise<void> {
    const product = await this.productRepository.findById(command.productId)

    assert.ok(product)

    await this.productRepository.remove(product)
  }
}
