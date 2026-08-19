const mongoose = require("mongoose");

const pendingSignUpSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  chatId: {
    type: String,
  },
  code: {
    type: String,
  },
  codeExpiresAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // 10 daqiqadan keyin MongoDB avtomatik o'chiradi (TTL index)
  },
});

module.exports = mongoose.model("PendingSignUp", pendingSignUpSchema);