import config from "../configs/dbConfig";
import { Document, ModifyResult, MongoClient, WithId } from "mongodb";

async function establishConnection(): Promise<MongoClient | false> {
  const client: MongoClient = new MongoClient(
    `mongodb://${config.hostname}:${config.port}/${config.dbName}`,
    { monitorCommands: true },
  );

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("Connection to the database failed.", error);
    return false;
  }
}

/**
 *
 * @param rules
 */
function logRulesNotSatisfied(rules: string[]) {
  for (let rule of rules) {
    console.error(rule);
  }
}

/**
 *
 * @param collection
 */
async function getLastInsertedDocument(
  collection: string,
): Promise<WithId<Document>[]> {
  try {
    const client = await establishConnection();
    if (!client) return [];

    const db = client.db();

    return await db
      .collection(collection)
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  } catch (error: any) {
    console.error("getLastInsertedDocument failed.", error);
    if (error.errInfo)
      logRulesNotSatisfied(error.errInfo.details.schemaRulesNotSatisfied);
    return [];
  }
}

/**
 * Searches the provided collection for documents containing the fields
 * and values provided.
 * @param collection The collection name.
 * @param find An object containing the fields and values to look for.
 * @returns array An array containing the documents matching the search
 * parameters.
 */
async function find(
  collection: string,
  find: object,
): Promise<WithId<Document>[]> {
  try {
    const client = await establishConnection();
    if (!client) return [];

    const db = client.db();

    return await db.collection(collection).find(find).toArray();
  } catch (error: any) {
    console.error(`${collection} find action failed.`, error);
    if (error.errInfo)
      logRulesNotSatisfied(error.errInfo.details.schemaRulesNotSatisfied);
    return [];
  }
}

/**
 * Searches the provided collection for documents containing the fields
 * and values provided.
 * @param collection The collection name.
 * @param data An object containing the fields and values of the document.
 * @returns boolean true on success, false on failure.
 */
async function insert(collection: string, data: object): Promise<boolean> {
  try {
    const client = await establishConnection();
    if (!client) return false;

    const db = client.db();

    await db.collection(collection).insertOne(data);
    return true;
  } catch (error: any) {
    console.error(`${collection} insert action failed.`, error);
    if (error.errInfo)
      logRulesNotSatisfied(error.errInfo.details.schemaRulesNotSatisfied);
    return false;
  }
}

/**
 *
 * @param collection
 * @param find
 * @param set
 */
async function update(
  collection: string,
  find: object,
  set: object,
): Promise<ModifyResult | false> {
  try {
    const client = await establishConnection();
    if (!client) return false;

    const db = client.db();

    return await db
      .collection(collection)
      .findOneAndUpdate(
        { find },
        { $set: { set } },
        { returnDocument: "after" },
      );
  } catch (error: any) {
    console.error(`${collection} update action failed.`, error);
    if (error.errInfo)
      logRulesNotSatisfied(error.errInfo.details.schemaRulesNotSatisfied);
    return false;
  }
}

/**
 *
 * @param collection
 * @param find
 */
async function remove(collection: string, find: object) {
  try {
    const client = await establishConnection();
    if (!client) return false;

    const db = client.db();

    await db.collection(collection).deleteOne(find);
    return true;
  } catch (error: any) {
    console.error(`${collection} remove action failed.`, error);
    if (error.errInfo)
      logRulesNotSatisfied(error.errInfo.details.schemaRulesNotSatisfied);
    return false;
  }
}

export default { getLastInsertedDocument, insert, find, update, remove };
