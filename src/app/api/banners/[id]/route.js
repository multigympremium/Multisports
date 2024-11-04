import connectDB from "@/dbConfig/dbConfig";
import BannerModel from "@/models/BannerModel/BannerModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get product by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const result = await BannerModel.findById(id);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
// Handle PUT request
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const id = params.id;
    const updatedBanner = await BannerModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedBanner) {
      return NextResponse.json(
        { success: false, message: "banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBanner },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Handle DELETE request
export async function DELETE(req, { params }) {
  const id = params.id;

  try {
    const deletedBanner = await BannerModel.findByIdAndDelete(id);

    if (!deletedBanner) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Banner deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
