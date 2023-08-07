import {
  Collection,
  Document,
  Filter,
  FindOptions,
  InsertOneResult,
  ModifyResult,
  ObjectId,
  WithId,
} from "mongodb";

export class ArticleModel {
  collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  addArticle = async (data: {
    [key: string]: any;
  }): Promise<InsertOneResult> => {
    data.views = 0;
    data.searches = 0;

    return await this.collection.insertOne(data);
  };

  deleteArticle = async (_id: string): Promise<number> => {
    const { deletedCount } = await this.collection.deleteOne({
      _id: ObjectId.createFromHexString(_id),
    });

    return deletedCount;
  };

  editArticle = async (
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

  getArticle = async (_id: string): Promise<ModifyResult> => {
    return await this.collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(_id) },
      { $inc: { views: 1 } },
      // { projection: { views: 0, searches: 0 } },
    );
  };

  getArticles = async (
    filter: Filter<Document>,
    options: FindOptions,
  ): Promise<WithId<Document>[]> => {
    // options.projection = {
    //   categories: 0,
    //   quantity: 0,
    //   specs: 0,
    //   views: 0,
    //   searches: 0,
    // };
    const articles = await this.collection.find(filter, options).toArray();

    if (typeof filter === "object" && Object.keys(filter)) {
      await this.collection.updateMany(filter, { $inc: { searches: 1 } });
    }

    return articles;
  };
}
