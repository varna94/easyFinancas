// import { mongoose } from 'mongoose';

// import * as express from 'express';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const ArticleRoute = require('./routes/article-route');
// import * as mongoose from 'mongoose';
// import * as bodyParser from "body-parser";
// import { ArticleRoute } from './routes/article-route';

const PORT = process.env.PORT || 8080;
const app = express();
// const articleRoute: ArticleRoute = new ArticleRoute();
// articleRoute.articleRoute(app);

mongoose.connect('mongodb://localhost/easyFinanca', {
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => console.log('connection successful'))
  .catch(() => console.log('error'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
