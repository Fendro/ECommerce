import { ObjectId } from "mongodb";

export default class Article {
  name: string;
  price: number;
  description: string;
  pictures: string[];
  specs: string[];
  quantity: number;
  views: number;
  _id?: ObjectId;

  constructor(
    name: string,
    price: number,
    description: string,
    pictures: string[],
    specs: string[],
    quantity: number,
  ) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.pictures = pictures;
    this.specs = specs;
    this.quantity = quantity;
    this.views = 0;
  }
}
