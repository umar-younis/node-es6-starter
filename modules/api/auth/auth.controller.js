import STATUS from "../../status.codes";
import logger from "../../logger";
import config from "../../../config";
import Users from "../users/users.model";
import Utils from "../../utils";

let controller = {};

let makeVerifyLink = (length) => {
  var str = "123456789abcdefghijklmonpqrstuvwxyz";
  var link = "";
  for (var i = 0; i < length; i++) {
    link = link + str[Math.round(Math.random() * str.length - 1)];
  }
  link = link + "-" + new Date().getTime();
  return link;
}

controller.login = async(req, res) => {
  Users.findOne({
    email : req.body.email
  }, '-__v', (err, user) => {
    if (user) {
      Utils.comparePassword(req.body.password, user.password, (err, matched) => {
        if (matched) {
          user = user.toObject();
          delete user.password;
          user.token = Utils.createToken(user, req);
          res.json(user);
        } else {
          res.status(STATUS.UNAUTHORIZED).json({
            msg: "Invalid password!"
          });
        }
      });
    } else {
      res.status(STATUS.UNAUTHORIZED).json({
        msg: "Invalid email address!"
      });
    }
  });
};

controller.resetPassword = (req, res) => {
  Users.findOne({
    forgot_link: req.body.forgot_link
  }, (err, user) => {
    if (user) {
      req.body.password = req.body.password ? req.body.password : "";
      Utils.encryptPassword(req.body.password, (err, hash) => {
        var password = hash;
        Users.findByIdAndUpdate({
          _id: user._id
        }, {
          forgot_link: "",
          password: password
        }, (uerr, uuser) => {
          res.status(STATUS.SUCCESS).json({});
        });
      });
    } else {
      res.status(STATUS.BAD_REQUEST).json({});
    }
  });
};

controller.confirmEmail = (req, res) => {
  Users.findOne({ verify_link: req.body.verify_link }, (err, found) => {
    if (found) {
      Users.findOneAndUpdate({ _id: found._id }, {
        verified: true
      }, (a, b) => {
        found = found.toObject();
        delete found.password;
        found.token = Utils.createToken(found, req);
        res.status(STATUS.SUCCESS).json(found);
      });
    } else {
      res.status(STATUS.BAD_REQUEST).json({
        status: 0
      });
    }
  });
};

controller.createAccount = (req, res) => {
  if(req.body) {
    Users.findOne({
      email : req.body.email
    }, '-__v', (err, user) => {
      if (user) {
        res.status(STATUS.BAD_REQUEST).json({
          msg: "E-mail already exists!"
        });
      } else {
        req.body.password = req.body.password ? req.body.password : "";
        Auth.encryptPassword(req.body.password, (err, hash) => {
          req.body.password = hash;
          req.body.verify_link = makeVerifyLink(10);
          var u = new Users(req.body);
          u.save((err, newUser) => {
            // Send sign up email
            // Mailer.sendSignEmailCustomer(req.body.email, newUser.firstname, newUser._id);
            newUser = newUser.toObject();
            delete newUser.password;
            newUser.token = Auth.createToken(newUser, req);
            res.json(newUser);
          });
        });
      }
    });
  } else {
    res.status(STATUS.BAD_REQUEST).send();
  }
};

controller.forgotPassword = (req, res) => {
  Users.findOne({
    email : req.body.email
  }, '-__v', (err, user) => {
    if (user) {
      user = user.toObject();
      delete user.verify_link;
      delete user.password;
      var link = makeVerifyLink(30);
      Users.findOneAndUpdate({
        _id: user._id
      }, {
        forgot_link: link
      }, (uerr, uuser) => {
        user.forgot_link = link;
        res.json(user);
      })
    } else {
      res.status(STATUS.BAD_REQUEST).json({
        msg: "Email not exists!"
      });
    }
  });
};

// Insert default admin on app initialization if not exists
controller.insertDefaultAdmin = (admin) => {
  Users.findOne({ user_type: admin.user_type }, (ferr, fadmin) => {
    if (!fadmin) {
      Utils.encryptPassword(admin.password, (err, newPassword) => {
        if (newPassword) {
          admin.password = newPassword;
          Users.update({ fullname: admin.fullname, user_type: admin.user_type }, admin, { upsert: true }, (err, user) => {});
        }
      });
    }
  });
}


controller.insertDefaultAdmin(config.adminDetails);

export default controller;
