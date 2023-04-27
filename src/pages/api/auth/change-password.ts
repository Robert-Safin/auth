import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "./auth";

interface User {
  email: string;
  password: string;
  _id: ObjectId;
}

interface Users {
  users: User[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    res.status(401).json({ message: "wrong method" });
  }

  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: "not authenticated" });
  }

  const email = session?.user?.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectDB();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: email });

  const currentPassword = user!.password;
  const isEqual = await verifyPassword(oldPassword, currentPassword);

  if (!isEqual) {
    res.status(403).json({ message: "incorrect password match" });
    client.close();
  }

  const hashedPassword = hashPassword(newPassword)

  const result = await usersCollection.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );

  client.close
  res.status(200).json({message: "password updated"})
};

export default handler;
