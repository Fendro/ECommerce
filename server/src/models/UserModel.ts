import { passwordHashing } from "../utils";
import {
  Collection,
  Document,
  InsertOneResult,
  ModifyResult,
  WithId,
} from "mongodb";

export class UserModel {
  collection: Collection;
  guestCollection: Collection;

  constructor(collection: Collection, guestCollection: Collection) {
    this.collection = collection;
    this.guestCollection = guestCollection;
  }

  addGuest = async (data: { [key: string]: any }): Promise<InsertOneResult> => {
    return await this.guestCollection.insertOne(data);
  };

  addUser = async (data: { [key: string]: any }): Promise<InsertOneResult> => {
    data.password = passwordHashing(data.password);
    data.admin = false;

    return await this.collection.insertOne(data);
  };

  deleteUser = async (data: { [key: string]: any }): Promise<number> => {
    data.password = passwordHashing(data.password);
    const { deletedCount } = await this.collection.deleteOne(data);

    return deletedCount;
  };

  editUser = async (
    data: { [key: string]: any },
    fieldsToUpdate: { [key: string]: any },
  ): Promise<ModifyResult> => {
    delete data.edits;
    data.password = passwordHashing(data.password);
    if (fieldsToUpdate.password)
      fieldsToUpdate.password = passwordHashing(fieldsToUpdate.password);

    console.log(data, fieldsToUpdate);
    const user = await this.collection.findOneAndUpdate(
      data,
      {
        $set: fieldsToUpdate,
      },
      { returnDocument: "after" },
    );
    if (user.value?.password) delete user.value.password;

    return user;
  };

  getUser = async (data: {
    [key: string]: any;
  }): Promise<WithId<Document> | null> => {
    if (data.password) data.password = passwordHashing(data.password);

    const user = await this.collection.findOne(data);
    if (user) delete user.password;

    return user;
  };
}
