const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const aws = require('aws-sdk');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

// fix the cors security issue to send data to the frontend.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  next();
});

// only forwards requests to placesRoutes if their path start with /api/users
app.use('/api/users', usersRoutes);

// only forwards requests to placesRoutes if their path start with /api/places
app.use('/api/places', placesRoutes);

// This middleware only runs when there is a request which did not get a response.
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  next(error);
});

//error handling middleware.
app.use((error, req, res, next) => {
  // multer adds this as part of the request, checks if there is a file.
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    }); // delete file.
  }
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500) // 500 means error on the server.
    .json({ message: error.message || 'An unknown error occurred!' });
});

// this is an async task which returns a promise.
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hx0ai.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
