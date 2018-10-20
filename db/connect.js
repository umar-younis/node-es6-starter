import Mongoose from "mongoose";
import logger from "../modules/logger";
import config from "../config";

Mongoose.Promise = global.Promise;

const connectToDb = async() => {
  try {
    await Mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`, {
      useMongoClient: true
    });
  } catch (err) {
    logger.error("Could not connect to MongoDB");
  }
}

export default connectToDb;
