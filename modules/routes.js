import express from "express";
import Users from "./api/users";
import Cars from "./api/cars";
import Auth from "./api/auth";
import Utils from "./utils";

let Router = express.Router();

Router.use("/auth", Auth);
Router.use("/users", Utils.isAuthorized, Users);
Router.use("/cars", Utils.isAuthorized, Cars);

export default Router;
