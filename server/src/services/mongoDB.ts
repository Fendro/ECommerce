import config from "../configs/dbConfig";
import { MongoClient } from "mongodb";

const connect = async (): Promise<MongoClient> => {
  const client = new MongoClient(
    `mongodb://${config.hostname}:${config.port}/${config.dbName}`,
    { monitorCommands: true },
  );
  return await client.connect();
};

const dbInit = async () => {
  const client = await connect();
  await setCollections(client);
};

const getCollection = async (collection: string) => {
  const client = await connect();
  return client.db().collection(collection);
};

const setCollections = async (client: MongoClient) => {
  const collections = await client
    .db()
    .listCollections({}, { nameOnly: true })
    .toArray();
  const collectionsNames = collections.map((collections) => collections.name);
  for (const collection of config.collections) {
    if (!collectionsNames.includes(collection)) {
      const rules = require(`../configs/dbSchemasValidationRules/${collection}`);
      await client.db().createCollection(collection, {
        validator: rules,
      });
    }
  }
};

export { dbInit, getCollection };
