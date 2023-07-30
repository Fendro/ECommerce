import { ObjectId } from "mongodb";

export type Product = {
  name: string;
  price: number;
  description: string;
  pictures: string[];
  specs: string[];
  quantity: number;
  views: number;
  _id?: ObjectId;
};

export type ResponseData = {
  data?: { [key: string]: any };
  dev?: { [key: string]: any };
  message: string;
  success: boolean;
};

export type User = {
  username: string;
  email: string;
  admin: boolean;
  _id: ObjectId;
};
