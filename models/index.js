var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect( process.env.DATABASEURL, {
  keepAlive: true,
  useCreateIndex: true,
//   reconnectTries: Number.MAX_VALUE,
  // useMongoClient: true,
  useNewUrlParser: true
});

module.exports.User = require("./user");
// module.exports.Message = require("./message");