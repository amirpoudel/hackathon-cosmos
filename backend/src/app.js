
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./utils/errorHandler.js');

const app =  express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
  }));
  
  app.use(express.json({limit: "16kb"}))
  app.use(express.urlencoded({extended: true, limit: "16kb"}))
  app.use(express.static("public"))
  app.use(cookieParser())

//routes
const userRouter = require("./routes/user.route.js");

app.use("/api/v1/user",userRouter)


app.use(errorHandler)



module.exports = app;