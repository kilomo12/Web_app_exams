import crypto from 'crypto';
import { Session } from '../models/Session.js';
import { User } from '../models/User.js';
import { generateSalt, hashPassword, verifyPassword } from '../utils/password.js';

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ message: 'Nom, email et mot de passe (6 caractères min.) requis.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }

    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      passwordSalt: salt,
    });

    const token = crypto.randomBytes(48).toString('hex');
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    await Session.create({ user: user._id, token, expiresAt });

    return res.status(201).json({ token, user: serializeUser(user) });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const isValid = await verifyPassword(password, user.passwordSalt, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const token = crypto.randomBytes(48).toString('hex');
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await Session.create({ user: user._id, token, expiresAt });

    return res.json({ token, user: serializeUser(user) });
  } catch (error) {
    return next(error);
  }
};

export const me = async (req, res) => {
  res.json({ user: serializeUser(req.user) });
};

export const logout = async (req, res, next) => {
  try {
    if (req.session) {
      await Session.findByIdAndDelete(req.session._id);
    }
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
