import path from "path";
import adminDetails from "./admin.details";

let config = {};

config.logFileDir = path.join(__dirname, "../log");
config.logFileName = "app.log";
config.dbHost = process.env.dbHost || "localhost";
config.dbPort = process.env.dbPort || "27017";
config.dbName = process.env.dbName || "node-es6-starter";
config.serverPort = process.env.serverPort || 3001;
config.adminDetails = adminDetails;

export default config;
