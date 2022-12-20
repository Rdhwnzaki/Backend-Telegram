const Pool = require("../config/db");

const create = (data) => {
  const { id_user, email_user, password_user, name_user, otp } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id_user,email_user,password_user,name_user,verif,otp)VALUES('${id_user}','${email_user}','${password_user}','${name_user}',0,'${otp}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};
const findEmail = (email_user) =>
  new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE email_user='${email_user}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
const verification = (email_user) =>
  new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET verif=1 WHERE "email_user"='${email_user}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );

const updatePhotoUser = (id_user, dataUsers) => {
  const { photo } = dataUsers;
  return Pool.query(
    `UPDATE users SET photo='${photo}' WHERE id_user='${id_user}'`
  );
};

const changePW = (id_user, dataUsers) => {
  const { password_user } = dataUsers;
  return Pool.query(
    `UPDATE users SET password_user='${password_user}' WHERE id_user='${id_user}'`
  );
};

const getDataUserById = (id_user) => {
  console.log(id_user);
  return Pool.query(`SELECT * FROM users WHERE id_user = '${id_user}'`);
};

module.exports = {
  create,
  findEmail,
  verification,
  updatePhotoUser,
  changePW,
  getDataUserById,
};
