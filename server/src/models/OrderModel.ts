import {
  Collection,
  Document,
  InsertOneResult,
  ModifyResult,
  ObjectId,
} from "mongodb";
import { BadRequest, FailedDependency } from "./Errors";

export class OrderModel {
  collection: Collection;
  articlesCollection: Collection;
  packageCollection: Collection;

  constructor(
    collection: Collection,
    articlesCollection: Collection,
    packageCollection: Collection,
  ) {
    this.collection = collection;
    this.articlesCollection = articlesCollection;
    this.packageCollection = packageCollection;
  }

  private arePackagesProper = (orderPackages: { [key: string]: any }[]) => {
    for (const orderPackage of orderPackages) {
      if (!("articles" in orderPackage) || !orderPackage["articles"].length)
        throw new BadRequest(
          "Received malformed package object, make sure the order is properly built and each package contains an articles array of at least one value.",
          ["articles"],
          orderPackages,
        );
    }
  };

  addOrder = async (data: { [key: string]: any }): Promise<InsertOneResult> => {
    data.user = ObjectId.createFromHexString(data.user);

    this.arePackagesProper(data.packages);

    for (const index in data.articles) {
      data.articles[index].article = ObjectId.createFromHexString(
        data.articles[index].article,
      );
      const article = await this.articlesCollection.findOne(
        data.articles[index].article,
        {
          projection: { price: 1 },
        },
      );
      if (!article)
        throw new FailedDependency("Article not found.", {
          failed: data.articles[index].article,
          payload: data,
        });
      data.articles[index].unitPriceOnOrder = article.price;
    }
    data.orderDate = new Date();
    data.payment = "pending";

    return await this.collection.insertOne(data);
  };

  editOrder = async (
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

  getOrder = async (_id: string): Promise<Document | null> => {
    return await this.collection
      .aggregate([
        {
          $match: { _id: ObjectId.createFromHexString(_id) },
        },
        {
          $unwind: "$articles",
        },
        {
          $lookup: {
            from: "articles",
            localField: "articles.article",
            foreignField: "_id",
            as: "articles.article",
          },
        },
        {
          $unwind: "$articles.article",
        },
        {
          $addFields: {
            "articles.article.quantity": "$articles.quantity",
            "articles.article.unitPriceOnOrder": "$articles.unitPriceOnOrder",
            "articles.article.orderDate": "$articles.orderDate",
          },
        },
        {
          $project: {
            "articles.article.categories": 0,
            "articles.article.specs": 0,
            "articles.article.views": 0,
            "articles.article.searches": 0,
          },
        },
        {
          $group: {
            _id: "$_id",
            user: { $first: "$user" },
            articles: { $push: "$articles.article" },
            orderDate: { $first: "$orderDate" },
            state: { $first: "$state" },
          },
        },
      ])
      .next();
  };

  getOrders = async (_id: string): Promise<Document[]> => {
    return await this.collection
      .aggregate([
        {
          $match: { user: ObjectId.createFromHexString(_id) },
        },
        {
          $unwind: "$articles",
        },
        {
          $lookup: {
            from: "articles",
            localField: "articles.article",
            foreignField: "_id",
            as: "articles.article",
          },
        },
        {
          $unwind: "$articles.article",
        },
        {
          $addFields: {
            "articles.article.quantity": "$articles.quantity",
            "articles.article.unitPriceOnOrder": "$articles.unitPriceOnOrder",
            "articles.article.orderDate": "$articles.orderDate",
          },
        },
        {
          $project: {
            "articles.article.categories": 0,
            "articles.article.specs": 0,
            "articles.article.views": 0,
            "articles.article.searches": 0,
          },
        },
        {
          $group: {
            _id: "$_id",
            user: { $first: "$user" },
            articles: { $push: "$articles.article" },
            orderDate: { $first: "$orderDate" },
            state: { $first: "$state" },
          },
        },
      ])
      .toArray();
  };
}
