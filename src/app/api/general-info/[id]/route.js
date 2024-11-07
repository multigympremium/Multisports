import connectDB from "@/dbConfig/dbConfig";
import GeneralInfoModel from "@/models/GeneralInfoModel/GeneralInfoModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get brand by ID
export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const brand = await GeneralInfoModel.findOne({ _id: id });

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
  const requestData = await req.json();

  const brandData = await GeneralInfoModel.findById(id);
  if (!brandData) {
    return NextResponse.json(
      { success: false, message: "Brand not found" },
      { status: 404 }
    );
  }

 

  

  try {
    const updatedBrand = await GeneralInfoModel.findByIdAndUpdate(
      id,
      requestData,
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
    const brandItem = await GeneralInfoModel.findOne({ _id: id });

    if (!brandItem) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 }
      );
    }

    const deletedBrand = await GeneralInfoModel.deleteOne({ _id: id });
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
