import {
  Collection,
  Document,
  InsertOneResult,
  ModifyResult,
  WithId,
} from "mongodb";

export class CategoryModel {
  collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  addCategory = async (data: {
    [key: string]: any;
  }): Promise<InsertOneResult> => {
    return await this.collection.insertOne(data);
  };

  deleteCategory = async (name: string): Promise<number> => {
    const { deletedCount } = await this.collection.deleteOne({ name: name });

    return deletedCount;
  };

  editCategory = async (
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

  getCategory = async (name: string): Promise<WithId<Document> | null> => {
    return await this.collection.findOne({ name: name });
  };

  getCategories = async (): Promise<WithId<Document>[]> => {
    return await this.collection.find({}).toArray();
  };
}
