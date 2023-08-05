import config from "../configs/dbConfig";
import { MongoClient } from "mongodb";

const connect = async (): Promise<MongoClient> => {
  const client = new MongoClient(
    `mongodb://${config.hostname}:${config.port}/${config.dbName}`,
    { monitorCommands: true },
  );
  return await client.connect();
};

const getCollection = async (collection: string) => {
  const client = await connect();
  return client.db().collection(collection);
};

export { getCollection };
