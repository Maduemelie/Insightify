require("dotenv").config();
const app = require("./app");
const connectToDb = require('./config/mongoDB')
const config = require('./config/configfile');
// const redisClient = require("./config/redisClient")
const port = config.PORT || 4000;
console.log(port)
connectToDb()
// redisClient.connect()
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
