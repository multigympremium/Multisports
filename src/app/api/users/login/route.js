import connectDB from "@/dbConfig/dbConfig";
import Users from "@/models/userModel/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and User are required" },
      { status: 400 }
    );
  }

  console.log(email, "email", password, "password", process.env.MONGODB_URI);
  const userResult = await Users.findOne({ email: email });

  console.log(userResult, "UserResult");

  if (!userResult) {
    return NextResponse.json(
      { message: "Invalid email or User" },
      { status: 404 }
    );
  }

  // Compare the provided User with the hashed User
  const isMatch = await bcrypt.compare(password, userResult.password);

  if (!isMatch) {
    return NextResponse.json({ message: "Invalid User" }, { status: 400 });
  }

  return NextResponse.json(
    { message: "User verified successfully", user: userResult },
    { status: 200 }
  );
}
