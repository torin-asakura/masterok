/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  ProductDetails,
  BaseProduct,
} from "../../../../team/masterok/product/v1alpha1/product.types";

export const protobufPackage = "team.masterok.product.v1alpha1";

export interface ListProductsRequest {
  stockId: number;
  page: number;
  category: string;
}

export interface ListProductsResponse {
  products: BaseProduct[];
}

export interface ListProductDetailsRequest {
  position: number;
}

export interface ListProductDetailsResponse {
  details?: ProductDetails;
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME =
  "team.masterok.product.v1alpha1";

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
