import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import ProductFlagModel from "@/models/ProductFlagModel/ProductFlagModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get brand by ID
export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const brand = await ProductFlagModel.findOne({ _id: id });

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

  const resultData = await ProductFlagModel.findById(id);
  if (!resultData) {
    return NextResponse.json(
      { success: false, message: "Brand not found" },
      { status: 404 }
    );
  }

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

  try {
    const updatedBrand = await ProductFlagModel.findByIdAndUpdate(
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
    const itemResult = await ProductFlagModel.findOne({ _id: id });

    if (!itemResult) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 }
      );
    }

    const deletedResult = await ProductFlagModel.deleteOne({ _id: id });
    if (!deletedResult) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 }
      );
    }

    // Delete files from S3 if they exist
    const deleteLogoResult = await deleteFile(itemResult.flagIcon);
    console.log(deleteLogoResult, "Logo deleted");

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
