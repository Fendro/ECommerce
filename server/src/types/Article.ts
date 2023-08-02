import { ObjectId } from "mongodb";

export type Article = {
  _id?: ObjectId;
  categories: string[];
  description: string;
  images: string[];
  name: string;
  price: number;
  quantity: number;
  searches?: number;
  specs: string[];
  views?: number;
};
