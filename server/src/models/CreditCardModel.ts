import {
  Collection,
  Document,
  InsertOneResult,
  ModifyResult,
  ObjectId,
  WithId,
} from "mongodb";
import { FailedDependency } from "./Errors";

export class CreditCardModel {
  collection: Collection;
  usersCollection: Collection;

  constructor(collection: Collection, usersCollection: Collection) {
    this.collection = collection;
    this.usersCollection = usersCollection;
  }

  addCreditCard = async (
    user_id: string,
    data: {
      [key: string]: any;
    },
  ): Promise<InsertOneResult> => {
    data.user_id = ObjectId.createFromHexString(user_id);

    if (
      !(await this.usersCollection.findOne({
        _id: data.user_id,
      }))
    )
      throw new FailedDependency("User not found", {
        failed: data.currency,
        payload: data,
      });

    data.number = data.number.substring(
      data.number.length - 4,
      data.number.length,
    );

    data.token = "sometoken";

    return await this.collection.insertOne(data);
  };

  deleteCreditCard = async (_id: string): Promise<number> => {
    const { deletedCount } = await this.collection.deleteOne({
      _id: ObjectId.createFromHexString(_id),
    });

    return deletedCount;
  };

  editCreditCard = async (
    _id: string,
    fieldsToUpdate: { [key: string]: any },
  ): Promise<ModifyResult> => {
    if (fieldsToUpdate.number && fieldsToUpdate.number.length > 3)
      fieldsToUpdate.number = fieldsToUpdate.number.substring(
        fieldsToUpdate.number.length - 4,
        fieldsToUpdate.number.length,
      );

    return await this.collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(_id) },
      {
        $set: fieldsToUpdate,
      },
      { returnDocument: "after" },
    );
  };

  getCreditCard = async (_id: string): Promise<WithId<Document> | null> => {
    return await this.collection.findOne({
      _id: ObjectId.createFromHexString(_id),
    });
  };

  getCreditCards = async (user_id: string): Promise<WithId<Document>[]> => {
    return await this.collection
      .find({ user_id: ObjectId.createFromHexString(user_id) })
      .toArray();
  };
}
