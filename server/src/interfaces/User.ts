import { ObjectId } from "mongodb";

export default interface User {
  username: string;
  email: string;
  password: string;
  admin?: boolean;
  id?: ObjectId;
}
