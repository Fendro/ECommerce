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
    data.user_id = ObjectId.createFromHexString(data.user_id);

    this.arePackagesProper(data.packages);

    for (const pIndex in data.packages) {
      for (const aIndex in data.packages[pIndex].articles) {
        data.packages[pIndex].articles[aIndex].article_id =
          ObjectId.createFromHexString(
            data.packages[pIndex].articles[aIndex].article_id,
          );

        const article = await this.articlesCollection.findOne(
          data.packages[pIndex].articles[aIndex].article_id,
          {
            projection: { price: 1 },
          },
        );

        if (!article)
          throw new FailedDependency("Article not found.", {
            failed: data.packages[pIndex].articles[aIndex].article,
            payload: data,
          });

        data.packages[pIndex].articles[aIndex].unitPriceOnOrder = article.price;
      }

      data.packages[pIndex].shippingStatus = "waiting for payment";
      const { insertedId } = await this.packageCollection.insertOne(
        data.packages[pIndex],
      );
      data.packages[pIndex] = insertedId;
    }
    data.packages_id = data.packages;
    data.orderDate = new Date();
    data.payment = "pending";
    delete data.packages;

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
    return this.collection
      .aggregate([
        {
          $match: {
            _id: ObjectId.createFromHexString(_id),
          },
        },
        {
          $lookup: {
            from: "packages",
            localField: "packages_id",
            foreignField: "_id",
            as: "packages",
          },
        },
        {
          $unwind: "$packages",
        },
        {
          $lookup: {
            from: "articles",
            localField: "packages.articles.article_id",
            foreignField: "_id",
            as: "articles",
          },
        },
        {
          $project: {
            "articles.categories": 0,
            "articles.price": 0,
            "articles.quantity": 0,
            "articles.searches": 0,
            "articles.specs": 0,
            "articles.views": 0,
          },
        },
        {
          $group: {
            _id: "$_id",
            user_id: { $first: "$user_id" },
            orderDate: { $first: "$orderDate" },
            payment: { $first: "$payment" },
            packages: {
              $push: {
                id: "$packages._id",
                shippingMethod: "$packages.shippingMethod",
                shippingStatus: "$packages.shippingStatus",
                articles: "$articles",
                quantities: "$packages.articles.quantity",
                unitPriceOnOrder: "$packages.articles.unitPriceOnOrder",
              },
            },
          },
        },
      ])
      .next();
  };

  getOrders = async (_id: string): Promise<Document[]> => {
    return this.collection
      .aggregate([
        {
          $match: {
            user_id: ObjectId.createFromHexString(_id),
          },
        },
        {
          $lookup: {
            from: "packages",
            localField: "packages_id",
            foreignField: "_id",
            as: "packages",
          },
        },
        {
          $unwind: "$packages",
        },
        {
          $lookup: {
            from: "articles",
            localField: "packages.articles.article_id",
            foreignField: "_id",
            as: "articles",
          },
        },
        {
          $project: {
            "articles.categories": 0,
            "articles.price": 0,
            "articles.quantity": 0,
            "articles.searches": 0,
            "articles.specs": 0,
            "articles.views": 0,
          },
        },
        {
          $group: {
            _id: "$_id",
            user_id: { $first: "$user_id" },
            orderDate: { $first: "$orderDate" },
            payment: { $first: "$payment" },
            packages: {
              $push: {
                id: "$packages._id",
                shippingMethod: "$packages.shippingMethod",
                shippingStatus: "$packages.shippingStatus",
                articles: "$articles",
                quantities: "$packages.articles.quantity",
                unitPriceOnOrder: "$packages.articles.unitPriceOnOrder",
              },
            },
          },
        },
      ])
      .toArray();
  };
}
