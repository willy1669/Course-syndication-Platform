/*eslint-disable no-throw-literal */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = await req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodeToken) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
    const userId = decodeToken;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (exception) {
    res.status(403).json({
      error: new Error('Invalid request'),
    });
  }
};

export default auth;