import { GrpcExceptionsFilter }            from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }              from '@atls/nestjs-grpc-errors'
import { Controller }                      from '@nestjs/common'
import { UseFilters }                      from '@nestjs/common'
import { UsePipes }                        from '@nestjs/common'
import { CommandBus }                      from '@nestjs/cqrs'
import { QueryBus }                        from '@nestjs/cqrs'

import { v4 as uuid }                      from 'uuid'

import { CreateProductCommand }            from '@product/application-module'
import { UpdateProductCommand }            from '@product/application-module'
import { RemoveProductCommand }            from '@product/application-module'
import { GetProductsQuery }                from '@product/application-module'
import { CreateProductResponse }           from '@product/product-proto'
import { ListProductsResponse }            from '@product/product-proto'
import { UpdateProductResponse }           from '@product/product-proto'
import { RemoveProductResponse }           from '@product/product-proto'
import { ProductServiceControllerMethods } from '@product/product-proto'
import { ProductServiceController }        from '@product/product-proto'

import { CreateProductDto }                from '../dto'
import { UpdateProductDto }                from '../dto'
import { ListProductsDto }                 from '../dto'
import { RemoveProductDto }                from '../dto'

@Controller()
@ProductServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class ProductController implements ProductServiceController {
  private products: any[] = []

  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @UsePipes(new GrpcValidationPipe())
  async createProduct(request: CreateProductDto): Promise<CreateProductResponse> {
    const command = new CreateProductCommand(
      uuid(),
      request.name,
      request.category,
      request.subcategory,
      request.price,
      request.article,
      request.supplierCode,
      request.brand
    )

    await this.commandBus.execute(command)

    return {
      id: command.productId,
    }
  }

  @UsePipes(new GrpcValidationPipe())
  async listProducts(request: ListProductsDto): Promise<ListProductsResponse> {
    const products = await this.queryBus.execute(new GetProductsQuery())
    return { products }
  }

  @UsePipes(new GrpcValidationPipe())
  async updateProduct(request: UpdateProductDto): Promise<UpdateProductResponse> {
    const command = new UpdateProductCommand(
      request.product.id,
      request.product.name,
      request.product.category,
      request.product.subcategory,
      request.product.price,
      request.product.article,
      request.product.supplierCode,
      request.product.brand
    )

    await this.commandBus.execute(command)

    return { id: command.productId }
  }

  @UsePipes(new GrpcValidationPipe())
  async removeProduct(request: RemoveProductDto): Promise<RemoveProductResponse> {
    const command = new RemoveProductCommand(request.id)

    await this.commandBus.execute(command)

    return { id: command.productId }
  }
}
