const fs = require('fs');
const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});


app.use("/api/users/", usersRoutes);
app.use("/api/places", placesRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path, (error) => {console.log(error)
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect('mongodb+srv://sgk:mongoman@cluster0.tlcq1.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err)
  });
