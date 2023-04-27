
import { connectDB } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { verifyPassword } from "./auth"
import { hashPassword } from "./auth"

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req })


  if (token) {

    const email = token.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectDB()
    const usersCollection = client.db().collection("users");
    const user = await usersCollection.findOne({ email: email });

    const currentPassword = user!.password;
    const isEqual = await verifyPassword(oldPassword, currentPassword);

    if (!isEqual) {
    res.status(403).json({ message: "incorrect password match" });
    client.close();
    }
    const hashedPassword = await hashPassword(newPassword)

    const result = await usersCollection.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    client.close()
    res.status(200).json({message: "password updated"})


  } else {

    res.status(401).json({message:'not authorized'})
  }

  res.end()
}

export default handler
