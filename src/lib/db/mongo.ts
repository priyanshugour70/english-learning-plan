import "server-only";

import { MongoClient, type Db, type MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "fluent_path";

if (!uri) {
  throw new Error(
    "MONGODB_URI is missing. Add it to .env.local (see .env.example).",
  );
}

const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 7000,
};

// Cache the client across hot reloads in dev and across Lambda invocations
// in serverless environments.
type GlobalWithMongo = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const g = globalThis as GlobalWithMongo;

const clientPromise: Promise<MongoClient> =
  g._mongoClientPromise ?? new MongoClient(uri, options).connect();

if (process.env.NODE_ENV !== "production") {
  g._mongoClientPromise = clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getClient(): Promise<MongoClient> {
  return clientPromise;
}
