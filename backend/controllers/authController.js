const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SELF_REGISTER_ROLES = ["citizen", "lawyer"];
const LawyerProfile = require("../models/lawyerProfile");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = SELF_REGISTER_ROLES.includes(role) ? role : "citizen";

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    // A new lawyer gets an empty, UNVERIFIED profile.
    // An admin must verify it before it appears publicly.
    if (userRole === "lawyer") {
      await LawyerProfile.create({ user: newUser._id });
    }

const token = jwt.sign(
  {
    userId: newUser._id,
    role: newUser.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);

res.status(201).json({
  message: "User registered successfully",
  token,
  user: {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  },
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
console.log("Password matched:", isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
if (user.status === "suspended") {
      return res.status(403).json({
        message: "Your account has been suspended. Contact support.",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};