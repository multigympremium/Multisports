import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import ModelOfBrandModel from "@/models/ModelOfBrandModel/ModelOfBrandModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get brand by ID
export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const brand = await ModelOfBrandModel.findOne({ _id: id });

    if (!brand) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: brand }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT Request: Update brand by ID
export async function PUT(req, { params }) {
  const id = params?.id;
  const formData = await req.formData();

  const brandData = await ModelOfBrandModel.findById(id);
  if (!brandData) {
    return NextResponse.json(
      { success: false, message: "Brand not found" },
      { status: 404 }
    );
  }

  const brand = formData.get("brand");
  const modelName = formData.get("modelName");
  const slug = formData.get("slug");
  const isActive = formData.get("isActive");
  const code = formData.get("code");

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
    isActive: isActive === "true",
    code,
  };

  // Upload new logo if provided
  const logo = formData.get("logo");
  if (logo) {
    const logoName = `${Date.now()}-${logo.name.replace(/\s/g, "-")}`;
    const logoResult = await uploadFile(logo, logoName, logo.type);
    submitData.logo = logoName;
    console.log(logoResult);
  }

  try {
    const updatedBrand = await ModelOfBrandModel.findByIdAndUpdate(
      id,
      submitData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBrand) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: updatedBrand },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE Request: Delete brand by ID
export async function DELETE(req, { params }) {
  const id = params?.id;
  try {
    const brandItem = await ModelOfBrandModel.findOne({ _id: id });

    if (!brandItem) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 }
      );
    }

    // Delete files from S3 if they exist
    const deleteLogoResult = await deleteFile(brandItem.logo);
    console.log(deleteLogoResult, "Logo deleted");

    const deletedBrand = await ModelOfBrandModel.deleteOne({ _id: id });
    if (!deletedBrand) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Brand deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
