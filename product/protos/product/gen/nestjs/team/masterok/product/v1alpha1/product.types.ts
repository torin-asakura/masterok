/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "team.masterok.product.v1alpha1";

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price?: Price;
  article: string;
  supplierCode: string;
  brand: string;
}

export interface Price {
  buy: number;
  sell: number;
}

export const TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME =
  "team.masterok.product.v1alpha1";

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
