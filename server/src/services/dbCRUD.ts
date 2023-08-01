import config from "../configs/dbConfig";
import {
  DeleteResult,
  Document,
  InsertOneResult,
  ModifyResult,
  MongoClient,
  WithId,
} from "mongodb";

async function establishConnection(): Promise<MongoClient> {
  const client: MongoClient = new MongoClient(
    `mongodb://${config.hostname}:${config.port}/${config.dbName}`,
    { monitorCommands: true },
  );

  return await client.connect();
}

async function getLastInsertedDocument(
  collection: string,
): Promise<WithId<Document>[]> {
  const client: MongoClient = await establishConnection();

  return await client
    .db()
    .collection(collection)
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .toArray();
}

async function find(
  collection: string,
  find: object,
  options?: object,
): Promise<WithId<Document>[]> {
  const client: MongoClient = await establishConnection();

  return await client.db().collection(collection).find(find, options).toArray();
}

async function findOne(
  collection: string,
  find: object,
): Promise<WithId<Document> | null> {
  const client: MongoClient = await establishConnection();

  return await client.db().collection(collection).findOne(find);
}

async function insert(
  collection: string,
  data: object,
): Promise<InsertOneResult> {
  const client: MongoClient = await establishConnection();

  return await client.db().collection(collection).insertOne(data);
}

async function update(
  collection: string,
  find: object,
  set: object,
): Promise<ModifyResult> {
  const client: MongoClient = await establishConnection();
  return await client
    .db()
    .collection(collection)
    .findOneAndUpdate(find, { $set: set }, { returnDocument: "after" });
}

async function updateEach(
  collection: string,
  find: object[],
  set: object,
): Promise<ModifyResult[]> {
  const client: MongoClient = await establishConnection();

  let result = [];
  for (const entry of find) {
    result.push(
      await client
        .db()
        .collection(collection)
        .findOneAndUpdate(entry, { $set: set }, { returnDocument: "after" }),
    );
  }
  return result;
}

async function remove(collection: string, find: object): Promise<DeleteResult> {
  const client: MongoClient = await establishConnection();

  return await client.db().collection(collection).deleteOne(find);
}

export default {
  find,
  findOne,
  getLastInsertedDocument,
  insert,
  update,
  remove,
};
