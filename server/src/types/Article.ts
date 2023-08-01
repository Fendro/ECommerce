import { ObjectId } from "mongodb";

export type Article = {
  name: string;
  price: number;
  description: string;
  pictures: string[];
  specs: string[];
  quantity: number;
  views?: number;
  searches?: number;
  _id?: ObjectId;
};
