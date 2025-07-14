const User = require('../model/user');
const bcrypt = require('bcrypt');

// Register New User
const registerUser = async (req, res) => {
  try {
    const rawEmail = req.body.email;
    const fullEmail = rawEmail.includes('@') ? rawEmail : `${rawEmail}@gmail.com`;

    // Check for duplicate email
    const existingUser = await User.findOne({ email: fullEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      username: rawEmail,
      email: fullEmail,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({
      message: "Registration failed",
      error: err.message
    });
  }
};

// Login Existing User
const login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }

  // Normalize email (in case user logs in with just the username)
  email = email.includes('@') ? email : `${email}@gmail.com`;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { registerUser, login };
