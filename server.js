require("dotenv").config();
const app = require("./app");
const connectToDb = require('./config/mongoDB')
// const redisClient = require("./config/redisClient")
const port = process.env.PORT || 3500;
connectToDb()
// redisClient.connect()
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
