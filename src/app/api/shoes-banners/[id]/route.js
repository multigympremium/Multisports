import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import ShoesBannerModel from "@/models/ShoesBannerModel/ShoesBannerModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get product by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const result = await ShoesBannerModel.findById(id);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Data not found" },
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

    const existingBanner = await ShoesBannerModel.findById(id);

    if (!existingBanner) {
      return NextResponse.json(
        { success: false, message: "Item already exists" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const shortDescription = formData.get("shortDescription");
    const image = formData.get("image");
    const bannerData = {}

    if(title) bannerData.title = title;
    

    if(subtitle) bannerData.subtitle = subtitle;
    

    if(shortDescription) bannerData.shortDescription = shortDescription;




    let thumbnailUrl = "";
    if (image && image.size > 0 && image !== existingBanner.image) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(
        image,
        thumbnailUrl,
        image.type
      );
    }

    if(thumbnailUrl !== "") bannerData.image = thumbnailUrl;

    const updatedBanner = await ShoesBannerModel.findByIdAndUpdate(id, bannerData, {
      new: true,
    });


    if (!updatedBanner) {
      return NextResponse.json(
        { success: false, message: "Data not found" },
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

    const existingBanner = await ShoesBannerModel.findById(id);

    if (!existingBanner) {
      return NextResponse.json(
        { success: false, message: "Data not found" },
        { status: 404 }
      );
    }

    const deletedBanner = await ShoesBannerModel.findByIdAndDelete(id);


    await deleteFile(existingBanner.image);

    return NextResponse.json(
      { success: true, message: "Item deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
