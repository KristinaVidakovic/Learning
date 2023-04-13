import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv"; 

mongoose.Promise = global.Promise;
dotenv.config();

const { DB_CLUSTER, DB_PASS, DB_URL, DB_USER } = process.env;

const connectToDatabase = async (): Promise<void> => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.set("strictQuery", false);
  await mongoose.connect(
    `${DB_URL}://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/?retryWrites=true&w=majority`,
    options as ConnectOptions
  );
};

export { connectToDatabase };