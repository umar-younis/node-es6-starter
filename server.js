import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "./modules/logger";
import morgan from "morgan";
import config from "./config";
import Routes from "./modules/routes";
import connectToDb from "./db/connect";

const port = config.serverPort;
logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

app.use("/api", Routes);

//Index route
app.get("/", (req, res) => {
  res.send("Invalid endpoint!");
});

app.listen(port, () => {
  console.log("Server started on port", port);
});
