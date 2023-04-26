import { MongoClient } from "mongodb";

export const connectDB = async() => {
  const mongoPassword = process.env.MONGO_PASSWORD;
  const mongoUser = process.env.MONGO_USER;
  const mongoCluster = process.env.MONGO_CLUSTER;
  const mongoDatabase = process.env.MONGO_DATABASE;
  const connectionString = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}.ruawe0b.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority`

  const client = await MongoClient.connect(connectionString)
  return client
}
