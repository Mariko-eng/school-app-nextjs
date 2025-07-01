import bcrypt from 'bcrypt';

// Utility function to hash passwords
export async function hashPassword(password: string) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}