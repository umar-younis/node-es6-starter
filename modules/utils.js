/*****
 * Created by Babar on 09/10/2018.
 * Email: babarxm@gmail.com
 *****/
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
let algorithm = 'blowfish';
let cryptoPassword = 'mmt@^92510!';
let controller = {};

const unauthorized = (res) => {
  res.status(STATUS.UNAUTHORIZED).send("unauthorized");
};

const encrypt = (text) => {
  let cipher = crypto.createCipher(algorithm, cryptoPassword);
  let crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};

const decrypt = (text) => {
  let decipher = crypto.createDecipher(algorithm, cryptoPassword)
  let dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

const getToken = (key, callback) => {
  jwt.verify(key, config.session_secret, (err, jwtData) => {
    if (err) {
      callback(null, null);
    } else if (jwtData) {
      callback(null, jwtData.user);
    } else {
      callback(null, null);
    }
  });
}

controller.encryptPassword = function(password, callback) {
  bcrypt.genSalt(10, (err, salt) => {
   if (err) 
     return callback(err);

   bcrypt.hash(password, salt, null, (err, hash) => {
     callback(err, hash);
   });
 });
};

controller.comparePassword = (userPassword, hashPassword, callback) => {
  bcrypt.compare(userPassword, hashPassword, (err, isPasswordMatch) => {
    if (err) 
      return callback(err);
    callback(null, isPasswordMatch);
  });
};

controller.createToken = (user, req) => {
  var date = new Date();
  var encodedString = jwt.sign({
    user: user._id
  }, config.session_secret, {
    expiresIn: ((60 * 60) * (24 * 7))
  });
  return encodedString;
};

controller.isAuthorized = (req, res, next) => {
  getToken(req.headers.authorization, (err, data) => {
    if (data) {
      req.user = data;
      next();
    } else {
      unauthorized(res);
    }
  });
}

controller.unauthorized = unauthorized;

export default controller;