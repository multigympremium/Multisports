import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import AboutVisionModel from "@/models/AboutVisionModel/AboutVisionModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get product by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const result = await AboutVisionModel.findById(id);

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

    const id = params.id;

    const existingVision = await AboutVisionModel.findById(id);

    if (!existingVision) {
      return NextResponse.json(
        { success: false, message: "Banner already exists" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");
    const visionData = {}

    if(title) visionData.title = title;
    

    if(description) visionData.description = description;
    


    let thumbnailUrl = "";
    if (image && image.size > 0 && image !== existingVision.image) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(
        image,
        thumbnailUrl,
        image.type
      );
    }

    if(thumbnailUrl !== "") visionData.image = thumbnailUrl;

    const updatedBanner = await AboutVisionModel.findByIdAndUpdate(id, visionData, {
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

    const existingVision = await AboutVisionModel.findById(id);

    if (!existingVision) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    const deletedBanner = await AboutVisionModel.findByIdAndDelete(id);


    await deleteFile(existingVision.image);

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
