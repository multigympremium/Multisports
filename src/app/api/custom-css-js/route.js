import connectDB from "@/dbConfig/dbConfig";
import CustomCssAndJsModel from "@/models/CustomCssAndJsModel/CustomCssAndJsModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req, res) {
  try {
    const brands = await CustomCssAndJsModel.find({});
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
    const requestData = await req.json();

    const {css, headerJs, footerJs} = requestData;

    const submitData = {
      css,
      headerJs,
      footerJs
    };

    const insertResult = await CustomCssAndJsModel.create(submitData);

    if (insertResult) {
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
