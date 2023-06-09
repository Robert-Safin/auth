import { connectDB } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "./auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return
  }
  const data = req.body;
  const { email, password } = data;
  if (!email || !email.includes("@") || !password || password.trim() < 7) {
    res.status(422).json({ message: "Invalid input" });
    return;
  }

  const client = await connectDB();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({email:email})

  if (existingUser) {
    res.status(422).json({message:"user exists already"})
    client.close()
    return
  }

  const hashedPassoword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassoword,
  });
  res.status(201).json({message: "user created!"})
};

export default handler;
