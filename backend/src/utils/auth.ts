import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const isPasswordCorrect = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

interface userInterface {
  id: number; 
  email: string; 
  username: string
}
export const generateAccessToken = (user: userInterface) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
    })
}

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({
    id: userId,
  }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any
  })
}