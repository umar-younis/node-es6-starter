import Cars from "./cars.model";
import logger from "../../logger";
import STATUS from "../../status.codes";

const controller = {};

controller.get = async(req, res) => {
  try {
    const cars = await Cars.find({});
    res.status(STATUS.SUCCESS).json(cars);
  } catch (err) {
    logger.error("Error in getting car " + err);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
}

controller.create = async(req, res) => {
  try {
    var car = new Cars(req.body);
    car = await car.save();
    res.status(STATUS.SUCCESS).json(car);
  } catch (err) {
    logger.error("Error saving car " + err);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
}

controller.update = async(req, res) => {
  try {
    var id = req.body._id;
    delete req.body._id;
    var car = await Cars.update({ _id: id }, req.body);
    res.status(STATUS.SUCCESS).json(car);
  } catch (err) {
    logger.error("Error updating car " + err);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
}

controller.delete = async(req, res) => {
  try {
    var car = await Cars.deleteOne({ _id: req.params.id });
    res.status(STATUS.SUCCESS).json(car);
  } catch (err) {
    logger.error("Error deleting car " + err);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
}

export default controller;
