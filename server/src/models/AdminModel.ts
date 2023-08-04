import { passwordHashing } from "../utils";
import { Collection, Document, ModifyResult, ObjectId, WithId } from "mongodb";

export class AdminModel {
  collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  deleteUser = async (_id: string): Promise<number> => {
    const { deletedCount } = await this.collection.deleteOne({
      _id: ObjectId.createFromHexString(_id),
    });

    return deletedCount;
  };

  editUser = async (
    _id: string,
    fieldsToUpdate: { [key: string]: any },
  ): Promise<ModifyResult> => {
    if (fieldsToUpdate.password)
      fieldsToUpdate.password = passwordHashing(fieldsToUpdate.password);

    const user = await this.collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(_id) },
      {
        $set: fieldsToUpdate,
      },
      { returnDocument: "after" },
    );
    if (user.value?.password) delete user.value.password;

    return user;
  };

  getUser = async (_id: string): Promise<Document | null> => {
    const user = await this.collection
      .aggregate([
        {
          $match: { _id: ObjectId.createFromHexString(_id) },
        },
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "user",
            as: "orders",
          },
        },
      ])
      .next();
    if (user) delete user.password;

    return user;
  };

  getUsers = async (): Promise<WithId<Document>[]> => {
    const users = await this.collection.find({}).toArray();
    for (const user of users) {
      delete user.password;
    }

    return users;
  };
}
