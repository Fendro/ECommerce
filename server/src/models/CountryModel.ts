import {
  Collection,
  Document,
  InsertOneResult,
  ModifyResult,
  WithId,
} from "mongodb";
import { FailedDependency } from "./Errors";

export class CountryModel {
  collection: Collection;
  currenciesCollection: Collection;

  constructor(collection: Collection, currenciesCollection: Collection) {
    this.collection = collection;
    this.currenciesCollection = currenciesCollection;
  }

  addCountry = async (data: {
    [key: string]: any;
  }): Promise<InsertOneResult> => {
    if (!(await this.currenciesCollection.findOne({ name: data.currency })))
      throw new FailedDependency("Currency not found", {
        failed: data.currency,
        payload: data,
      });

    return await this.collection.insertOne(data);
  };

  deleteCountry = async (name: string): Promise<number> => {
    const { deletedCount } = await this.collection.deleteOne({
      name: name,
    });

    return deletedCount;
  };

  editCountry = async (
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

  getCountry = async (name: string): Promise<WithId<Document> | null> => {
    return await this.collection.findOne({
      name: name,
    });
  };

  getCountries = async (): Promise<WithId<Document>[]> => {
    return await this.collection.find({}).toArray();
  };
}
