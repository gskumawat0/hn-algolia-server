const mongoose = require("mongoose");
const { NODE_ENV, DATABASEURL } = process.env;
mongoose.Promise = global.Promise;
mongoose
	.connect(DATABASEURL, {
		keepAlive: true,
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connected"))
	.catch(() => console.log(DATABASEURL, "not connected"));

if (NODE_ENV === "development") {
	mongoose.set("debug", true);
}
module.exports.User = require("./user");
