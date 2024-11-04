import connectDB from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Users from "@/models/userModel/userModel";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(req) {
  const { email, password } = await req.json();

  console.log(email, password, "email password");

  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Email and password are required",
      },
      { status: 400 }
    );
  }

  // Find the user by email
  const user = await Users.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "User not found with the provided email" },
      { status: 404 }
    );
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  // Update user's profile content reference
  await Users.updateOne(
    { email },
    {
      password: hashedPassword,
      old_password: user.password,
    },
    { new: true }
  );

  return NextResponse.json(
    {
      message: "Password updated successfully",
    },
    { status: 200 }
  );
}
