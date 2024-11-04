import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import ProductColorModel from "@/models/ProductColorModel/ProductColorModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get brand by ID
export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const brand = await ProductColorModel.findOne({ _id: id });

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

  const brandData = await ProductColorModel.findById(id);
  if (!brandData) {
    return NextResponse.json(
      { success: false, message: "Brand not found" },
      { status: 404 }
    );
  }

  const productColor = formData.get("productColor");
  const productColorName = formData.get("productColorName");

  if (!productColor || !productColorName) {
    return NextResponse.json(
      { success: false, message: "Required fields missing" },
      { status: 400 }
    );
  }

  const submitData = {
    productColor,
    productColorName,
  };

  try {
    const updatedBrand = await ProductColorModel.findByIdAndUpdate(
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
    const brandItem = await ProductColorModel.findOne({ _id: id });

    if (!brandItem) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 }
      );
    }

    const deletedBrand = await ProductColorModel.deleteOne({ _id: id });
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
