import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import sendMail from "@/helpers/mailer";
import Users from "@/models/userModel/userModel";
import { generateOTP } from "@/helpers/generateOTP";
import sendVerifyOtp from "@/config/mailTemplates/sendVerifyOtp";
import bcrypt from "bcryptjs";
import OtpModel from "@/models/OtpModel/otpModel";
import moment from "moment";
connectDB();
export async function POST(req) {
  try {
    const { email } = await req.json();

    console.log(email, "username, email, password");

    if (!email) {
      return NextResponse.json(
        { error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    const otp = generateOTP();

    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);
    const otp_expiration_time = process.env.OTP_EXPIRATION_TIME || 5;

    const existingUser = await Users.findOne({ email });
    const existingOtp = await OtpModel.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );
      } else {
      }
    }
    const otp_expiry = Date.now() + otp_expiration_time * 60000;

    if (existingOtp) {
      const updateOtpResult = await OtpModel.updateOne(
        { email },
        {
          otp: hashedOTP,
          otp_expiry,
        },
        { new: true }
      );

      if (updateOtpResult.acknowledged) {
        await sendVerifyOtp(email, otp);

        return NextResponse.json(
          {
            message: "OTP sent successfully",
            otp_expiry: moment()
              .add(otp_expiration_time, "minutes")
              .format("YYYY-MM-DD HH:mm:ss"),
            otp_limitation_time: otp_expiration_time,
          },
          { status: 200 }
        );
      }
    }

    const otp_document = await new OtpModel({
      email: email,
      otp: hashedOTP,
      otp_expiry: Date.now() + otp_expiration_time * 60000,
    });

    const otpResult = await otp_document.save();

    if (otpResult) {
      await sendVerifyOtp(email, otp);

      return NextResponse.json(
        {
          message: "OTP sent successfully",
          otp_expiry: moment()
            .add(otp_expiration_time, "minutes")
            .format("YYYY-MM-DD HH:mm:ss"),
          otp_limitation_time: otp_expiration_time,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "User not created" }, { status: 400 });
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
