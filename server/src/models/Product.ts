import { ObjectId } from "mongodb";

interface Product {
  name: string;
  price: number;
  description: string;
  pictures: string[];
  specs: string[];
  id?: ObjectId;
}
