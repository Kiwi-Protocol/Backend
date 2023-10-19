import mongoose, { ConnectOptions, Connection } from "mongoose";

const { MONGO_URI } = process.env;

mongoose.connect(
  MONGO_URI as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  } as ConnectOptions
);

const db: Connection = mongoose.connection;

export default db;
