import config from "../configs/dbConfig";
import { Db, MongoClient } from "mongodb";

async function connectDB(): Promise<MongoClient | false> {
  const client: MongoClient = new MongoClient(
    `mongodb://${config.hostname}:${config.port}/${config.dbName}`,
    { monitorCommands: true },
  );

  try {
    await client.connect();
    console.log(
      "Connected to database " +
        config.hostname +
        ":" +
        config.port +
        "/" +
        config.dbName +
        ".",
    );
    return client;
  } catch (error) {
    console.error("Connection to the database failed.", error);
    return false;
  }
}

function logRulesNotSatisfied(rules: string[]) {
  console.log(rules);
  for (let rule of rules) {
    console.error(rule);
  }
}

async function getLastInsertedDocument(collection: string) {
  try {
    const client = await connectDB();
    if (!client) return;

    const db: Db = client.db();

    return await db
      .collection(collection)
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  } catch (error) {
    console.error("getLastInsertedDocument failed.", error);
    if (error.errInfo)
      logRulesNotSatisfied(error.errInfo.details.schemaRulesNotSatisfied);
    return [];
  }
}

async function find(collection: string, find: string) {
  try {
    const client = await connectDB();
    const db = client.db();

    return await db.collection(collection).find(find).toArray();
  } catch (error) {
    console.error(`${collection} find action failed.`, error);
    if (error.errInfo)
      logRulesNotSatisfied(error.errInfo.details.schemaRulesNotSatisfied);
    return [];
  }
}

async function insert(collection: string, data: object) {
  try {
    const client = await connectDB();
    const db = client.db();

    await db.collection(collection).insertOne(data);
    return true;
  } catch (error) {
    console.error(`${collection} insert action failed.`, error);
    if (error.errInfo)
      logRulesNotSatisfied(error.errInfo.details.schemaRulesNotSatisfied);
    return false;
  }
}

async function update(collection: string, find: string, set: any) {
  try {
    const client = await connectDB();
    const db = client.db();

    return await db
      .collection(collection)
      .findOneAndUpdate(
        { find },
        { $set: { set } },
        { returnNewDocument: true },
      );
  } catch (error) {
    console.error(`${collection} update action failed.`, error);
    if (error.errInfo)
      logRulesNotSatisfied(error.errInfo.details.schemaRulesNotSatisfied);
    return false;
  }
}

async function remove(collection, find) {
  try {
    const client = await connectDB();
    const db = client.db();

    await db.collection(collection).deleteOne(find);
    return true;
  } catch (error) {
    console.error(`${collection} remove action failed.`, error);
    if (error.errInfo)
      logRulesNotSatisfied(error.errInfo.details.schemaRulesNotSatisfied);
    return false;
  }
}

module.exports = {
  getLastInsertedDocument,
  insert,
  find,
  update,
  remove,
};
