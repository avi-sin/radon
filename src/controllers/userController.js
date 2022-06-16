const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


// ========================= 1 =========================== //

const createUser = async function (abcd, xyz) {
  
  try {
    let data = abcd.body;
    if (!data.mobile) {
      xyz.status(400).send({error: "Mobile number is mandatory."})
    } else {
    let savedData = await userModel.create(data);
    xyz.status(201).send({ msg: savedData });
    }
  } catch (error) {
    xyz.status(500).send({error: error.message})
  }

};


// ============================== 2 =================================== //

const loginUser = async function (req, res) {
  
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.status(403).send( { status: false, msg: "username or the password is not correct" } );

      let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "radon",
        organisation: "FunctionUp",
      },
      "functionup-radon"
    );
    res.setHeader("x-auth-token", token);
    res.status(200).send({ status: true, token: token });
  } catch (error) {
    res.status(500).send({error: error.message})
  }

};


// =============================== 3 ================================== //

const getUserData = async function (req, res) {
  
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    res.status(200).send({ status: true, data: userDetails });
  } catch (error) {
    res.status(500).send({error: error.message})
  }

};


// ===================================== 4 ==================================== //

const updateUser = async function (req, res) {
  
  try {
    let userId = req.params.userId;
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
    res.status(200).send({ status: true, data: updatedUser });
  } catch (error) {
    res.status(500).send({error: error.message})
  }

};


// ================================== 5 ======================================= //

const deleteUser = async function (req, res) {
  
  try {
    let userId = req.params.userId;
    let updation = await userModel.findOneAndUpdate({ _id: userId }, {$set: { isDeleted: true }}, { new: true });
    res.status(200).send({ status: true, data: updation });
  } catch (error) {
    res.status(500).send({error: error.message})
  }

};



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
