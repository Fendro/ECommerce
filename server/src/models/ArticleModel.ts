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
      _id: new ObjectId(_id),
    });

    return deletedCount;
  };

  editArticle = async (
    _id: string,
    fieldsToUpdate: { [key: string]: any },
  ): Promise<ModifyResult> => {
    return await this.collection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      {
        $set: fieldsToUpdate,
      },
      { returnDocument: "after" },
    );
  };

  getArticle = async (_id: string): Promise<ModifyResult> => {
    return await this.collection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $inc: { views: 1 } },
    );
  };

  getArticles = async (
    filter: Filter<Document>,
    options?: FindOptions,
  ): Promise<WithId<Document>[]> => {
    const articles = await this.collection.find(filter, options).toArray();

    if (Object.keys(filter)) {
      await this.collection.updateMany(filter, { $inc: { searches: 1 } });
    }

    return articles;
  };
}
