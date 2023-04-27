import { connectDB } from "@/lib/db";
import { verifyPassword } from "./auth";
import NextAuth  from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextApiRequest } from "next";

interface Credentials {
  email: string,
  password: string
}


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({

      name: 'Credentials',

      credentials : {},
      async authorize(credentials:Credentials, req:NextApiRequest) {



        const client = await  connectDB()
        const usersCollection = client.db().collection("users")
        const user =  await usersCollection.findOne({email: credentials.email})
        if (!user) {
          throw new Error('no user found')
        }

        const isValid = await verifyPassword(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Could not log you in')
        }

        client.close()
        return {email: user.email}

      }
    })
  ]
}
export default NextAuth(authOptions)
