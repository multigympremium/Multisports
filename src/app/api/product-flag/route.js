import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import ProductFlagModel from "@/models/ProductFlagModel/ProductFlagModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req, res) {
  try {
    const brands = await ProductFlagModel.find({});
    return NextResponse.json({ success: true, data: brands }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// Handle POST request
export async function POST(req, res) {
  try {
    const formData = await req.formData();

    const flagName = formData.get("flagName");
    const flagIcon = formData.get("flagIcon");

    if (!flagName) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const submitData = {
      flagName,
    };

    if (flagIcon) {
      const iconName = `${Date.now()}-${flagIcon.name.replace(/\s/g, "-")}`;
      const logoResult = await uploadFile(flagIcon, iconName, flagIcon.type);
      submitData.flagIcon = iconName;
      console.log(logoResult);
    }
    const brandResult = await ProductFlagModel.create(submitData);

    if (brandResult) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
