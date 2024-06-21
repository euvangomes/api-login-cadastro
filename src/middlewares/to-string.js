const express = require('express');

const toString = async (req, res, next) => {
  for (let key in req.body){
    if (typeof req.body[key] !== 'string') {
      req.body[key] = String(req.body[key]);
    }
  }
  next();
};

module.exports = toString;
