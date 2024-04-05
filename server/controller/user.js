const { userModel } = require("../model/userSch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { Name, Email, Password, ConfirmPassword } = req.body;

  try {
    // Check if passwords match
    if (Password !== ConfirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the passwords
    const hashedPassword = await bcrypt.hash(Password, 10);
    const hashedConfirmPassword = await bcrypt.hash(ConfirmPassword, 10);

    // Create a new user
    const newUser = new userModel({
      Name,
      Email,
      Password: hashedPassword,
      ConfirmPassword: hashedConfirmPassword,
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ Email });

    // If user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signUp, signIn };
