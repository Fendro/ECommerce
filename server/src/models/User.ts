import { ObjectId } from "mongodb";

export default class User {
  admin: boolean;
  email: string;
  username: string;
  _id?: ObjectId;

  constructor(username: string, email: string, admin: boolean) {
    this.username = username;
    this.email = email;
    this.admin = admin;
  }
}
