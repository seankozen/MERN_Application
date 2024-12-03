const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require('../models/user');


let DUMMY_USERS = [
  {
    id: "u1",
    name: "Sean Kozen",
    email: "sgkozen@gmail.com",
    password: "thisIsATest",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return next(
    new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, email, password, places } = req.body;

  let existingUser;

  try{
    existingUser = await User.findOne({email: email})
  } catch(err) {
    const error = new HttpError(
      "Signup failed, please ytry again later", 500
    );
    return next(error);
  }
  
  if(existingUser) {
    const error = new HttpError(
      "User email already exists, login or use different email address.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FSesameOscartheGrouch%2F&psig=AOvVaw0Xt6t2ZKicusiniXAa74-p&ust=1733289301726000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDVipbsiooDFQAAAAAdAAAAABAE',
    password, 
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signup failed, please try again", 500);
    return next(error);
  }
  res.status(201).json({ user: createdUser.toObject({getters: true}) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
