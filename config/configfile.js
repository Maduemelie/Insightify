const commonConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  MY_SESSION_SECRET: process.env.MY_SESSION_SECERT,
};

const devConfig = {
  PORT: 4000,
  MONGOOSE_URL: 'mongodb://127.0.0.1:27017/insightiydev_database',
  ...commonConfig,
};

const prodConfig = {
  PORT: process.env.PORT || 3500,
  MONGOOSE_URL: process.env.MONGOOSE_URL,
  // MY_SESSION_SECRET: process.env.MY_SESSION_SECERT,
  ...commonConfig,
};

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
