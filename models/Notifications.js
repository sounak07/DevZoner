const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotifySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  postOwner: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Notifications = mongoose.model("notify", NotifySchema);
