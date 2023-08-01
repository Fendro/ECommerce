import { ObjectId } from "mongodb";

export type User = {
  admin: boolean;
  email: string;
  username: string;
  _id?: ObjectId;
};
