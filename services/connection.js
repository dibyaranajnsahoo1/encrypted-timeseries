const { MongoClient } = require('mongodb')
const mongoose = require('mongoose');
// Connection URL
const url = 'mongodb+srv://ranjandibya34512:dibya123@cluster0.jpnlk3b.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
const dotenv = require("dotenv");

dotenv.config();

client.connect((err, connection) => {
  if (err) {
    console.info('unable to connect to the database:', err);
  }
  return;
});

const db = client.db("encrypted-timeseries")

module.exports = db;
