import { hash, compare } from "bcryptjs"

export const hashPassword = async(password:string) => {
  const hashedPassoword = await hash(password, 12)
  return hashedPassoword
}

export const verifyPassword = async (password:string, hashedPassoword:string) => {
  const isValid = await compare(password, hashedPassoword)
  return isValid
}
