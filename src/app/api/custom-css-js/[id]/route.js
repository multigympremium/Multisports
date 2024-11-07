import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import CustomCssAndJsModel from "@/models/CustomCssAndJsModel/CustomCssAndJsModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get info by ID
export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const info = await CustomCssAndJsModel.findOne({ _id: id });

    if (!info) {
      return NextResponse.json(
        { success: false, message: "info not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: info }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT Request: Update info by ID
export async function PUT(req, { params }) {
  const id = params?.id;
  const requestData = await req.json();

  const existingData = await CustomCssAndJsModel.findById(id);
  if (!existingData) {
    return NextResponse.json(
      { success: false, message: "info not found" },
      { status: 404 }
    );
  }

  try {
    const updatedInfo = await CustomCssAndJsModel.findByIdAndUpdate(
      id,
      requestData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedInfo) {
      return NextResponse.json(
        { success: false, message: "info not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: updatedInfo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE Request: Delete info by ID
export async function DELETE(req, { params }) {
  const id = params?.id;
  try {
    const infoItem = await CustomCssAndJsModel.findOne({ _id: id });

    if (!infoItem) {
      return NextResponse.json(
        { success: false, message: "info not found" },
        { status: 404 }
      );
    }

    const deletedinfo = await CustomCssAndJsModel.deleteOne({ _id: id });
    if (!deletedinfo) {
      return NextResponse.json(
        { success: false, message: "info not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "info deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
