const jwt = require("jsonwebtoken");
const userModel = require("./model")
const bcrypt = require("bcryptjs"); // For password hashing
let tokenBlacklist = [];

const service = {
  userExist: async (email) => {
    const existingUser = await userModel.findOne({email});
    return existingUser;
  },
  register: async (name, email, password) => {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const model = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const result = await model.save()
    return result;
  },
  login: async (email, password) => {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT
    const access_token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  },
  logout: (token) => {
    tokenBlacklist.push(token);
    return { message: "Logout successful" };
  },
  isTokenBlacklisted: (token) => {
    return tokenBlacklist.includes(token);
  },
};

module.exports = service;
