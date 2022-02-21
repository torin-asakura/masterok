/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { Metadata } from "@grpc/grpc-js";
import {
  CreateProductResponse,
  ListProductsResponse,
  UpdateProductResponse,
  DeleteProductResponse,
  CreateProductRequest,
  ListProductsRequest,
  UpdateProductRequest,
  DeleteProductRequest,
} from "../../../../team/masterok/product/v1alpha1/product.payloads";

export const protobufPackage = "team.masterok.product.v1alpha1";

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME =
  "team.masterok.product.v1alpha1";

export interface ProductServiceClient {
  createProduct(
    request: CreateProductRequest,
    metadata?: Metadata
  ): Observable<CreateProductResponse>;

  listProducts(
    request: ListProductsRequest,
    metadata?: Metadata
  ): Observable<ListProductsResponse>;

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata
  ): Observable<UpdateProductResponse>;

  deleteProduct(
    request: DeleteProductRequest,
    metadata?: Metadata
  ): Observable<DeleteProductResponse>;
}

export interface ProductServiceController {
  createProduct(
    request: CreateProductRequest,
    metadata?: Metadata
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;

  listProducts(
    request: ListProductsRequest,
    metadata?: Metadata
  ):
    | Promise<ListProductsResponse>
    | Observable<ListProductsResponse>
    | ListProductsResponse;

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata
  ):
    | Promise<UpdateProductResponse>
    | Observable<UpdateProductResponse>
    | UpdateProductResponse;

  deleteProduct(
    request: DeleteProductRequest,
    metadata?: Metadata
  ):
    | Promise<DeleteProductResponse>
    | Observable<DeleteProductResponse>
    | DeleteProductResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createProduct",
      "listProducts",
      "updateProduct",
      "deleteProduct",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("ProductService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("ProductService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
