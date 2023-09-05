const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
const salesRouter = require("./routes/salesRoute");
const customerRouter = require("./routes/customerRoute");
const productRouter = require("./routes/productRoute");
const expenseRouter = require("./routes/expenseRoute");
const returnRouter = require("./routes/returnRoute");
const authRouter = require("./routes/authUserRoute");
const session = require('express-session');
const passport = require('./config/passportConfig');


const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "html"));
app.use(
  session({
    // Set up express-session middleware
    secret: process.env.MY_SESSION_SECERT,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/sales", salesRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/returns", returnRouter);
app.use("/api/v1/auth", authRouter);


app.get("/", (req, res) => {
  res.render("Dailypage");
});
module.exports = app;
