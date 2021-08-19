<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

import authRouter from './router/auth.js';

const app = express();

app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))

//auth(회원가입, 로그인, 인증)
app.use('/auth', authRouter);

//에러처리(Not Found)
app.use((req, res, next) => {
    res.sendStatus(404);
})

//에러처리(error)
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})

app.listen(8080);
=======
const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");

const config = require("./config/key");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/house", require("./routes/house"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
>>>>>>> a249a459d0d5f56d2f780c6d3ff9cb85e60a767a
