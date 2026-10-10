const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'3d'});
};
const registerUser = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
const { password } = req.body;
if (!email || !password) {
  return res.status(400).json({
    error: 'Email and password are required'
  });
}

  try {
    // Password security check
    if (!password || password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long'
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        error: 'Email already registered'
      });
    }

    // Hash password before storing it
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hash
    });

    const token = createToken(user._id);

    res.status(201).json({
      email,
      token
    });

  } catch (err) {
  if (err.code === 11000) {
    return res.status(409).json({
      error: 'Email already registered'
    });
  }

  console.error('Registration error:', err);
  return res.status(500).json({
    error: 'Unable to register. Please try again.'
  });
}
};
const loginUser=async (req,res) => {
    const email = req.body.email?.trim().toLowerCase();
const { password } = req.body;
    if (!email || !password) {
  return res.status(400).json({
    error: 'Email and password are required'
  });
}
    try{
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
  return res.status(401).json({
    error: 'Invalid email or password'
  });
}
        if (!password || !(await bcrypt.compare(password, user.password))) {
  return res.status(401).json({
    error: 'Invalid email or password'
  });
}
        const token=createToken(user._id);
        res.status(200).json({email,token});
    } catch (err) {
  console.error('Login error:', err);
  return res.status(500).json({
    error: 'Unable to log in. Please try again.'
  });
}
};
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('email');
        if (!user) {
  return res.status(404).json({
    error: 'User not found'
  });
}
        res.status(200).json({
            email: user.email
        });
    } catch (err) {
  console.error('Get current user error:', err);
  return res.status(500).json({
    error: 'Unable to retrieve user information.'
  });
}
};

module.exports={registerUser,loginUser,getCurrentUser};

