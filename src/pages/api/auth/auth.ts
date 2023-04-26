import { hash } from "bcryptjs"

export const hashPassword = async(password:string) => {
  const hashedPassoword = await hash(password, 12)
  return hashedPassoword
}
