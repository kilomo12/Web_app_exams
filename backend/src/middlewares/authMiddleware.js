import { Session } from '../models/Session.js';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authentification requise.' });
    }

    const session = await Session.findOne({ token }).populate('user');

    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ message: 'Session invalide ou expirée.' });
    }

    req.user = session.user;
    req.session = session;

    return next();
  } catch (error) {
    return next(error);
  }
};
