import { ObjectId } from "mongodb";

interface User {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  id?: ObjectId;
}
