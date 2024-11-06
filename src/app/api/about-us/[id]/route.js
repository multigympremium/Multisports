import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import AboutMissionModel from "@/models/AboutMissionModel/AboutMissionModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get product by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const result = await AboutMissionModel.findById(id);

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

    const existingVision = await AboutMissionModel.findById(id);

    if (!existingVision) {
      return NextResponse.json(
        { success: false, message: "Item already exists" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const sideImage = formData.get("sideImage");
    const bannerImage = formData.get("bannerImage");
    const aboutData = {}

    if(title) aboutData.title = title;
    

    if(description) aboutData.description = description;
    


    let sideImageUrl = "";
    if (sideImage && sideImage.size > 0) {
      sideImageUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(
        image,
        sideImageUrl,
        image.type
      );
    }

    let bannerImageUrl = "";
    if (bannerImage && bannerImage.size > 0) {
      bannerImageUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(
        image,
        bannerImageUrl,
        image.type
      );
    }

    


    if(sideImageUrl !== "") aboutData.sideImage = sideImageUrl;
    if(bannerImageUrl !== "") aboutData.bannerImage = bannerImageUrl;

    const updatedBanner = await AboutMissionModel.findByIdAndUpdate(id, aboutData, {
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

    const existingVision = await AboutMissionModel.findById(id);

    if (!existingVision) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    const deletedBanner = await AboutMissionModel.findByIdAndDelete(id);


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
