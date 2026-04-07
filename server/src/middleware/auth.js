const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    // We might need the user name for chat, usually it's better to fetch or include in token
    // For simplicity, we assume name is in token or we fetch if needed.
    // Let's add name to token in login/register if we need it here.
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
