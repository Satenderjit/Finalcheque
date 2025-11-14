// Simple admin authentication middleware
// In a real application, you would use JWT tokens, sessions, or a proper auth system

const adminAuth = (req, res, next) => {
  // For this implementation, we'll check for a specific admin password in headers
  // In a real application, you would use proper authentication with JWT or sessions
  
  const adminPassword = req.headers['x-admin-password'];
  
  // In a real app, you would validate against a secure password stored in environment variables
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Default for development

  if (!adminPassword || adminPassword !== expectedPassword) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Admin access required'
    });
  }
  
  next();
};

module.exports = adminAuth;