import { ObjectId } from "mongodb";

export type Basket = {
  products: { quantity: number; product: Product }[];
};

export type Product = {
  name: string;
  price: number;
  description: string;
  pictures?: string[];
  specs?: string[];
  _id?: ObjectId;
};

export type ResponseData = {
  data?: { [key: string]: any };
  message: string;
  statusCode: number;
};

export type ResponseError = {
  data?: { [key: string]: any };
  message: string;
  stack?: any;
  statusCode: number;
};

export type User = {
  username: string;
  email: string;
  admin: boolean;
  _id: ObjectId;
};
