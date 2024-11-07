import connectDB from "@/dbConfig/dbConfig";
import WebsiteThemeColorModel from "@/models/WebsiteThemeColorModel/WebsiteThemeColorModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req, res) {
  try {
    const brands = await WebsiteThemeColorModel.find({});
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

    const {primaryColor, secondaryColor, tertiaryColor, titleColor, paragraphColor, borderColor} = requestData;

    if (!primaryColor || !secondaryColor || !tertiaryColor || !titleColor || !paragraphColor || !borderColor) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const submitData = {
      primaryColor,
      secondaryColor,
      tertiaryColor,
      titleColor,
      paragraphColor, 
      borderColor
    };

    const insertResult = await WebsiteThemeColorModel.create(submitData);

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
