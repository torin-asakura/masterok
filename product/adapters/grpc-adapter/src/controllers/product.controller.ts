import { GrpcExceptionsFilter }            from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }              from '@atls/nestjs-grpc-errors'
import { Controller }                      from '@nestjs/common'
import { UseFilters }                      from '@nestjs/common'
import { UsePipes }                        from '@nestjs/common'

import { v4 as uuid }                      from 'uuid'

import { CreateProductResponse }           from '@product/product-proto'
import { ListProductsResponse }            from '@product/product-proto'
import { UpdateProductResponse }           from '@product/product-proto'
import { DeleteProductResponse }           from '@product/product-proto'
import { ProductServiceControllerMethods } from '@product/product-proto'
import { ProductServiceController }        from '@product/product-proto'

@Controller()
@ProductServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class ProductController implements ProductServiceController {
  private products: any[] = []

  @UsePipes(new GrpcValidationPipe())
  async createProduct(request): Promise<CreateProductResponse> {
    const product = {
      id: uuid(),
      ...request,
    }

    this.products.push(product)

    return product
  }

  @UsePipes(new GrpcValidationPipe())
  async listProducts(request): Promise<ListProductsResponse> {
    return {
      products: this.products,
    }
  }

  @UsePipes(new GrpcValidationPipe())
  async updateProduct(request): Promise<UpdateProductResponse> {
    const index = this.products.findIndex((product) => {
      return product.id === request.product.id
    })

    this.products[index] = {
      ...this.products[index],
      ...request.product,
    }

    return {
      id: this.products[index].id,
    }
  }

  @UsePipes(new GrpcValidationPipe())
  async deleteProduct(request): Promise<DeleteProductResponse> {
    let deleted: any

    this.products = this.products.filter((product) => {
      if (product.id === request.id) {
        deleted = { ...product }
        return false
      }

      return true
    })

    return {
      id: deleted?.id || '',
    }
  }
}
