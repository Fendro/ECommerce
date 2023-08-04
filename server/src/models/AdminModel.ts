import { passwordHashing } from "../utils";
import { Collection, Document, ModifyResult, ObjectId, WithId } from "mongodb";

export class AdminModel {
  collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  deleteUser = async (_id: string): Promise<number> => {
    const { deletedCount } = await this.collection.deleteOne({
      _id: new ObjectId(_id),
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
      { _id: new ObjectId(_id) },
      {
        $set: fieldsToUpdate,
      },
      { returnDocument: "after" },
    );
    if (user.value?.password) delete user.value.password;

    return user;
  };

  getUser = async (_id: string): Promise<WithId<Document> | null> => {
    const user = await this.collection.findOne({ _id: new ObjectId(_id) });
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
