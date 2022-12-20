const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { create, findEmail, verification } = require("../model/users");
const { resp, response } = require("../middleware/common");
const { generateToken, generateRefreshToken } = require("../helpers/auth");
const email = require("../middleware/email");
const cloudinary = require("../config/photo");
const modelUsers = require("../model/users");

const userController = {
  insertUsers: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email_user);
    if (users) {
      return resp(res, 404, false, "Email already use");
    }

    const digits = "0123456789";
    let otp = "";
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    const salt = bcrypt.genSaltSync(10);
    const password_user = bcrypt.hashSync(req.body.password_user);
    const data = {
      id_user: uuidv4(),
      email_user: req.body.email_user,
      password_user,
      name_user: req.body.name_user,
      otp,
    };
    console.log("data", data);
    try {
      const result = await create(data);
      if (result) {
        // const verifUrl = `http://${Host}:${Port}/users/${req.body.email_user}/${otp}`;
        const sendEmail = email(data.email_user, otp, data.fullname_user);
        // eslint-disable-next-line eqeqeq
        if (sendEmail == "email not sent!") {
          return response(res, 404, false, null, "register fail");
        }
        response(
          res,
          200,
          true,
          { email_user: data.email_user },
          "register success please check your email"
        );
      }
    } catch (err) {
      resp(res, 404, false, "Register failed");
    }
  },
  login: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email_user);
    if (!users) {
      return resp(res, 404, false, "Email not found");
    }
    // eslint-disable-next-line eqeqeq
    if (users.verif == 0) {
      return response(res, 404, false, null, " email not verified");
    }
    const { password_user } = req.body;
    const validation = bcrypt.compareSync(password_user, users.password_user);
    if (!validation) {
      return resp(res, 404, false, "Wrong password ");
    }
    delete users.password_user;
    delete users.otp;
    delete users.verif;

    const payload = {
      email_user: users.email_user,
      id_user: users.id_user,
    };
    users.token = generateToken(payload);
    users.refreshToken = generateRefreshToken(payload);
    resp(res, 200, true, users, "Login success ");
  },
  refresh: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email_user);
    if (!users) {
      return resp(res, 404, false, "Email not found");
    }
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return resp(res, 404, false, "Wrong refresh token ");
    }
    const payload = {
      email_user: users.email_user,
    };
    users.newToken = generateToken(payload);
    resp(res, 200, true, users, "Success get new token ");
  },
  otp: async (req, res) => {
    console.log("email", req.body.email_user);
    console.log("password", req.body.otp);
    const {
      rows: [users],
    } = await findEmail(req.body.email_user);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }
    // eslint-disable-next-line eqeqeq
    if (users.otp == req.body.otp) {
      const result = await verification(req.body.email_user);
      return response(res, 200, true, result, " verification email success");
    }
    return response(
      res,
      404,
      false,
      null,
      " wrong otp please check your email"
    );
  },
  insertPhoto: async (req, res) => {
    try {
      const id_user = req.payload.id_user;
      console.log("id_user", id_user);
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "food",
      });
      req.body.photo = image.url;
      await modelUsers.updatePhotoUser(id_user, req.body);
      return response(res, 200, true, req.body, "Update Photo Success");
    } catch (err) {
      return response(res, 404, false, err, "Update Photo Fail");
    }
  },
  changePassword: async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const password_user = bcrypt.hashSync(req.body.password_user);
    const data = {
      password_user,
    };
    console.log("data", data);
    try {
      await modelUsers.changePW(req.params.id_user, data);
      return response(res, 200, true, req.body, "Change Password Success");
    } catch (err) {
      return response(res, 404, false, err, "Change Password Fail");
    }
  },
  getDetailUser: async (req, res) => {
    const user_id = req.payload.id_user;
    console.log("id_user", user_id);
    modelUsers
      .getDataUserById(user_id)
      .then((result) =>
        response(res, 200, true, result.rows, "Get User Success")
      )
      .catch((err) => response(res, 404, false, err, "Get User Fail"));
  },
  // forgotPassword: async (req, res) => {
  //   const {
  //     rows: [users],
  //   } = await findEmail(req.body.email_user);
  //   if (!users) {
  //     return resp(res, 404, false, "Email not found");
  //   }

  //   const digits = "0123456789";
  //   let otp = "";
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < 6; i++) {
  //     otp += digits[Math.floor(Math.random() * 10)];
  //   }

  //   const data = {
  //     email_user: req.body.email_user,
  //     otp,
  //   };
  //   console.log("data", data);
  // },
};
exports.userController = userController;
