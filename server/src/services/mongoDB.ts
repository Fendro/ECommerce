import config from "../configs/dbConfig";
import { MongoClient } from "mongodb";

/**
 * Establish the connection to the database with the
 * provided parameters from dbConfig and returns an
 * instance of the client.
 * @returns MongoClient instance.
 */
const connect = async (): Promise<MongoClient> => {
  const client = new MongoClient(
    `mongodb://${config.hostname}:${config.port}/${config.dbName}`,
    { monitorCommands: true },
  );
  return await client.connect();
};

const dbInit = async () => {
  const client = await connect();
  console.log(`Connected to database '${config.dbName}'.`);
  await setCollections(client);
};

const getCollection = async (collection: string) => {
  const client = await connect();
  return client.db().collection(collection);
};

/**
 * Retrieves collections from dbConfig and creates them
 * if necessary. Sets their validation associated rules on
 * creation.
 * @param client MongoClient instance.
 */
const setCollections = async (client: MongoClient) => {
  const collections = await client
    .db()
    .listCollections({}, { nameOnly: true })
    .toArray();
  const collectionsNames = collections.map((collections) => collections.name);
  for (const collection of config.collections) {
    if (!collectionsNames.includes(collection)) {
      console.log(`Collection '${collection}' does not exist. Creating it...`);
      const rules = require(`../configs/dbSchemasValidationRules/${collection}`);
      await client.db().createCollection(collection, {
        validator: rules,
      });
      if (collection === "categories") {
        await client
          .db()
          .collection(collection)
          .createIndex({ name: "text" }, { unique: true });
      }
      console.log(`Created collection '${collection}'.`);
    }
  }
};

export { dbInit, getCollection };
