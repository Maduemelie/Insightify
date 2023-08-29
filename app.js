const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
const salesRouter = require("./routes/salesRoute");
const customerRouter = require("./routes/customerRoute");
const productRouter = require("./routes/productRoute");
const expenseRouter = require("./routes/expenseRoute");
const returnRouter = require("./routes/returnRoute");

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "html"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/sales", salesRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/returns", returnRouter);


app.get("/", (req, res) => {
  res.render("Dailypage");
});
module.exports = app;
