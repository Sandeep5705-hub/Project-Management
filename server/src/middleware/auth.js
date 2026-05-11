const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token format invalid' });
    }

    // Verify token using JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET || 'super_secret_project_key_99';
    const decoded = jwt.verify(token, jwtSecret);
    
    // Attach user info to request object
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token is not valid' });
    }
    
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = auth;
