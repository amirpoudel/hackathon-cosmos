const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./utils/errorHandler.js');
const {
    initializeObjectPrototype,
} = require('./utils/prototype/object.prototype.js');

const app = express();

// Initialize object prototype
initializeObjectPrototype();

app.use(
    cors({
        origin: [
            'http://localhost:3030',
            'http://localhost:5173',
            'http://127.0.0.1:5173',
        ],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

// Routes
const userRouter = require("./routes/user.route.js");
const menuRouter = require("./routes/menu.route.js");
const tableRouter = require("./routes/table.route.js");
const orderRouter = require("./routes/order.route.js");
const restaurantRouter = require("./routes/restaurant.route.js");
const paymentRouter = require("./routes/payment.route.js");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/table", tableRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/restaurant",restaurantRouter);
app.use("/api/v1/payment",paymentRouter);

app.use(errorHandler);

module.exports = app;
