const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      // if the header is set but does not have a token.
      throw new Error('Authentication failed!');
    }
    // verify returns the payload that was encoded into the token.
    // if the verification fails it throws an error to the catch.
    const decodedToken = jwt.verify(token, process.env.JWT_KEY); // verify the token is valid.
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    // if the authorization header is not set.
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
