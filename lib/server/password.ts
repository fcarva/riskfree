import bcrypt from 'bcryptjs';

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string) {
  if (!hash) {
    return false;
  }

  try {
    return await bcrypt.compare(plain, hash);
  } catch (error) {
    return false;
  }
}
