const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const generalRoutes = require('./routes/generalRoutes');
const authRoute = require('./routes/authUserRoute');
const clientRoute = require('./routes/clientRoutes');
const Product = require('./models/productModel.js');
const ProductStat = require('./models/productStats.js');
// const managementRoutes = require('./routes/managementRoutes');
// const salesRoutes = require('./routes/salesRoutes');
const {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} = require('./devData/data.js');

const config = require('./config/configfile');

const session = require('express-session');
const passport = require('./config/passportConfig');
// const { env } = require('process');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());

console.log(app.get('env'));
app.use(
  session({
    secret: config.MY_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
console.log(config.MY_SESSION_SECRET);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/general', generalRoutes);
app.use('/auth', authRoute);
app.use('/client', clientRoute);
// app.use('/management', managementRoutes);
// app.use('/sales', salesRoutes);

// //
// Product.insertMany(dataProduct);
// ProductStat.insertMany(dataProductStat);

app.get('/', (req, res) => {
  res.render('Dailypage');
});
module.exports = app;
