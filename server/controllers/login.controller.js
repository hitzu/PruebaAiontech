'use strict'
const jwt = require("jsonwebtoken");

//models
const userModel = require('../models/user');

const logIn = async (req,res)=>{
  try {
    
    const {email,password} = req.body
    
    const userFound = await userModel.findOne({email: email, password: password}, {password : 0});
    const payload = {_id : userFound._id};
    let token = jwt.sign(payload,"secretString")
    res.status(200).send({account:userFound,token})
  } catch (error) {
    if (error.name === "invalidLogin") {
      res.status(403).send({error:"invalidLogin"})
    } else {
      res.status(500).send({error:error.message})
    }
  }
}

const register = (req,res) => {

  const {email, password, firstName, lastName, role} = req.body


  let newUser = new userModel();
  newUser.email = email;
  newUser.password = password;
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.role = role;

  newUser.save( (error, newUserSave) => {
      if (error) {
        res.status(500).send({error:error.message})
      }else {
        res.status(200).send({message:`se guardo el usuario con _id ${newUserSave._id}`})
      }
    }
  )
  
}

module.exports = {logIn, register}