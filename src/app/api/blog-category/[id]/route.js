import connectDB from "@/dbConfig/dbConfig";
import BlogCategoryModel from "@/models/BlogCategoryModel/BlogCategoryModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get data by ID
export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const data = await BlogCategoryModel.findOne({ _id: id });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "data not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT Request: Update data by ID
export async function PUT(req, { params }) {
  const id = params?.id;
  const formData = await req.formData();

  const dataData = await BlogCategoryModel.findById(id);
  if (!dataData) {
    return NextResponse.json(
      { success: false, message: "data not found" },
      { status: 404 }
    );
  }

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

  try {
    const updatedData = await BlogCategoryModel.findByIdAndUpdate(
      id,
      submitData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedData) {
      return NextResponse.json(
        { success: false, message: "data not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: updatedData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE Request: Delete data by ID
export async function DELETE(req, { params }) {
  const id = params?.id;
  try {
    const dataItem = await BlogCategoryModel.findOne({ _id: id });

    if (!dataItem) {
      return NextResponse.json(
        { success: false, message: "data not found" },
        { status: 404 }
      );
    }

    const deletedData = await BlogCategoryModel.deleteOne({ _id: id });
    if (!deletedData) {
      return NextResponse.json(
        { success: false, message: "data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "data deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
