import Users from "./users.model";
import logger from "../../logger";
import STATUS from "../../status.codes";

const controller = {};

controller.get = async(req, res) => {
  try {
    const users = await Users.find({});
    res.status(STATUS.SUCCESS).json(users);
  } catch (err) {
    logger.error("Error in getting users- " + err);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
}

export default controller;
