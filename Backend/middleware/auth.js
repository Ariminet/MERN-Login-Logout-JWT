const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  try {
    if (!token) {
      return res.status(401).json({ msg: 'No Token, Authorization Denied' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: 'Invalid Token, Authorization Denied' });
    }

    req.user = verified.id;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
