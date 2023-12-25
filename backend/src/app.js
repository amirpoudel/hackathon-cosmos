
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./utils/errorHandler.js');
const { initializeObjectPrototype } = require('./utils/prototype/object.prototype.js');

const app =  express();

//init object prototype
initializeObjectPrototype();

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
const menuRouter = require("./routes/menu.route.js");
const tableRouter = require("./routes/table.route.js");


app.use("/api/v1/user",userRouter)
app.use("/api/v1/menu",menuRouter)
app.use("/api/v1/table",tableRouter)


app.use(errorHandler)



module.exports = app;