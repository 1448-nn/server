const mongoose = require("mongoose");
const bcrypt = require ("bcryptjs");

const userSchema = new mongoose.Schema({
    email:{
type: String,
required:true,
    },
    password:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

userSchema.pre("save", async function (next){
    const user = this;
    if (user.isModified ("password")) {
     user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
if (!user) {
    throw new Error("Invalid email or password");
}
const isPasswordMatch = await bcrypt.compare (password, user.password);
if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
}
return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;