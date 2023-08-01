import { Collection, ObjectId } from "mongodb";
import CRUD from "../interfaces/CRUD";
import { getCollection } from "../services/mongoDB";

export default class Article implements CRUD {
  collection: Collection | undefined;
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

  create = async () => {
    this.collection ??= await getCollection("articles");
  };

  read = async () => {
    this.collection ??= await getCollection("articles");
  };

  update = async () => {
    this.collection ??= await getCollection("articles");
  };

  delete = async () => {
    this.collection ??= await getCollection("articles");
  };
}
