var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect( process.env.DATABASEURL, {
  keepAlive: true,
  useCreateIndex: true,
  useNewUrlParser: true
})
.then(()=> console.log('connected'))
.catch(()=> console.log(process.env.DATABASEURL, 'not connected'));

module.exports.User = require("./user");