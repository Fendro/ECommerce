import {
  Collection,
  Document,
  InsertOneResult,
  ModifyResult,
  ObjectId,
  WithId,
} from "mongodb";

export class CurrencyModel {
  collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  addCurrency = async (data: {
    [key: string]: any;
  }): Promise<InsertOneResult> => {
    data.manuallySet ??= true;

    return await this.collection.insertOne(data);
  };

  deleteCurrency = async (_id: string): Promise<number> => {
    const { deletedCount } = await this.collection.deleteOne({
      _id: ObjectId.createFromHexString(_id),
    });

    return deletedCount;
  };

  editCurrency = async (
    name: string,
    fieldsToUpdate: { [key: string]: any },
  ): Promise<ModifyResult> => {
    return await this.collection.findOneAndUpdate(
      { name: name },
      {
        $set: fieldsToUpdate,
      },
      { returnDocument: "after" },
    );
  };

  getCurrency = async (name: string): Promise<WithId<Document> | null> => {
    return await this.collection.findOne({
      name: name,
    });
  };

  getCurrencies = async (): Promise<WithId<Document>[]> => {
    return await this.collection.find({}).toArray();
  };
}
