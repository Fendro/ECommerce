import { ObjectId } from "mongodb";

export default interface Product {
  name: string;
  price: number;
  description: string;
  pictures?: string[];
  specs?: string[];
  id?: ObjectId;
}
