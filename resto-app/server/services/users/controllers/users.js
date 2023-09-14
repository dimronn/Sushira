const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(8);
const connect = require("../connect");
const { ObjectId } = require("mongodb");
const { getDb } = require("../connect");

class Users {
  static async findAll(req, res) {
    try {
      const users = await getDb().collection("users").find().toArray();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }

  static async register(req, res) {
    try {
      console.log(req.body);
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const users = await getDb().collection("users").findOne({
        username: username,
        email: email,
        password: hashedPass,
        role: role,
        phoneNumber: phoneNumber,
        address: address,
      });
      res.status(201).json({
        message: `${username} sucessfully registered`,
        users
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id
      const deleted = await getDb().collection('users').deleteOne({
        _id: new ObjectId(id),
      })
      res.status(201).json({
        message: `id ${id} sucessfully deleted`,
        deleted
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(req, res) {
    try {
      const id = req.params.id;
      const users = await getDb().collection('users').findOne({
        _id: new ObjectId(id),
      });
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Users;
