import express from "express";
import controller from "./auth.controller";
let Router = express.Router();

Router.post("/login", controller.login);
Router.post("/createAccount", controller.createAccount);
Router.post("/resetPassword", controller.resetPassword);
Router.post("/forgotPassword", controller.forgotPassword);

export default Router;
