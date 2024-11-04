import connectDB from "@/dbConfig/dbConfig";
import Users from "@/models/userModel/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import OtpModel from "@/models/OtpModel/otpModel";

connectDB();

export async function POST(req) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json(
      { message: "Email and OTP are required" },
      { status: 400 }
    );
  }

  const otpResult = await OtpModel.findOne({ email });

  if (!otpResult) {
    return NextResponse.json(
      { message: "Invalid email or OTP" },
      { status: 400 }
    );
  }

  // Check if OTP has expired
  if (Date.now() > otpResult.otp_expiry) {
    return NextResponse.json({ message: "OTP has expired" }, { status: 400 });
  }

  // Compare the provided OTP with the hashed OTP
  const isMatch = await bcrypt.compare(otp, otpResult.otp);

  if (!isMatch) {
    return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
  }

  return NextResponse.json(
    { message: "OTP verified successfully" },
    { status: 200 }
  );
}
