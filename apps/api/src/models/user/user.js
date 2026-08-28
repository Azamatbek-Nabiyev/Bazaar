const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
   addresses: {
      type: [
        {
          city: String,
          address: String
        }
      ],
      required: true,
      validate: {
        validator: value => value.length > 0,
        message: "At least one address is required"
      }
    },
    phone: {
      type: String,
      required: true,
      unique: true, 
      minLength: 13,
      maxLength: 13,
    },
    password: {
      type: String,
      minLength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    telegramChatId: {
      type: String,
      select: false,
    },
    loginCode: {
      type: String,
      select: false,
    },
    loginCodeExpires: {
      type: Date,
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      select: false
    }
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  // only run this function if password was actually modified

  if (!this.isModified("password")) return;

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamps){
  if(this.passwordChangedAt){
    const changedTimestamps = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    
    console.log(this.passwordChangedAt, JWTTimestamps);

    return JWTTimestamps < changedTimestamps
  }

  return false;
};

module.exports = mongoose.model("User", userSchema);
