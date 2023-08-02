import { ObjectId } from "mongodb";

export type User = {
  _id?: ObjectId;
  admin: boolean;
  email: string;
  username: string;
};
