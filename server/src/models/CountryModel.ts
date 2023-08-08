import {
  Collection,
  Document,
  InsertOneResult,
  ModifyResult,
  ObjectId,
  WithId,
} from "mongodb";

export class CountryModel {
  collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  addCountry = async (data: {
    [key: string]: any;
  }): Promise<InsertOneResult> => {
    return await this.collection.insertOne(data);
  };

  deleteCountry = async (_id: string): Promise<number> => {
    const { deletedCount } = await this.collection.deleteOne({
      _id: ObjectId.createFromHexString(_id),
    });

    return deletedCount;
  };

  editCountry = async (
    _id: string,
    fieldsToUpdate: { [key: string]: any },
  ): Promise<ModifyResult> => {
    return await this.collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(_id) },
      {
        $set: fieldsToUpdate,
      },
      { returnDocument: "after" },
    );
  };

  getCountry = async (_id: string): Promise<WithId<Document> | null> => {
    return await this.collection.findOne({
      _id: ObjectId.createFromHexString(_id),
    });
  };

  getCountries = async (): Promise<WithId<Document>[]> => {
    return await this.collection.find({}).toArray();
  };
}
