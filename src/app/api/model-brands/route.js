import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import ModelOfBrandModel from "@/models/ModelOfBrandModel/ModelOfBrandModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req, res) {
  try {
    const brands = await ModelOfBrandModel.find({});
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

    const brand = formData.get("brand");
    const modelName = formData.get("modelName");
    const slug = formData.get("slug");
    const isActive = formData.get("isActive");
    const code = formData.get("code");

    console.log(brand, "brand", modelName, "modelName", slug, "slug", code);

    if (!brand || !modelName || !slug || !code) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const submitData = {
      brand,
      modelName,
      slug,
      isActive: isActive === "true", // Convert to Boolean
      code,
    };

    console.log(
      {
        brand,
        modelName,
        slug,
        isActive,
        code,
      },
      "Logging form data fields"
    );

    const brandResult = await ModelOfBrandModel.create(submitData);

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
