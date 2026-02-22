import crypto from 'crypto';

const ITERATIONS = 100_000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

export const generateSalt = () => crypto.randomBytes(16).toString('hex');

export const hashPassword = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, DIGEST, (error, derivedKey) => {
      if (error) return reject(error);
      return resolve(derivedKey.toString('hex'));
    });
  });

export const verifyPassword = async (password, salt, storedHash) => {
  const hash = await hashPassword(password, salt);
  const hashBuffer = Buffer.from(hash, 'hex');
  const storedBuffer = Buffer.from(storedHash, 'hex');
  if (hashBuffer.length !== storedBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(hashBuffer, storedBuffer);
};
