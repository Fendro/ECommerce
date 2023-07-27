import { ObjectId } from "mongodb";

interface User {
  username: string;
  email: string;
  password: string;
  admin?: boolean;
  id?: ObjectId;
}
