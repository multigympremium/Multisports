import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import sendMail from "@/helpers/mailer";
import Users from "@/models/userModel/userModel";
import { generateOTP } from "@/helpers/generateOTP";
import sendVerifyOtp from "@/config/mailTemplates/sendVerifyOtp";
import bcrypt from "bcryptjs";
connectDB();
export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    console.log(username, email, password, "username, email, password");

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );
      } else {
        return await sendVerifyOtp(email, otp);
      }
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await new Users({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const userResult = await user.save();

    if (userResult) {
      return NextResponse.json(
        { message: "User Created successfully", user: userResult },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "User not created" }, { status: 400 });
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
