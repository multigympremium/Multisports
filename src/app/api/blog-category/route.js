import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import BlogCategoryModel from "@/models/BlogCategoryModel/BlogCategoryModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req, res) {
  try {
    const data = await BlogCategoryModel.find({});
    return NextResponse.json({ success: true, data: data }, { status: 200 });
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

    const name = formData.get("name");

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const submitData = {
      name,
    };

    const brandResult = await BlogCategoryModel.create(submitData);

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
