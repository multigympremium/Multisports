import connectDB from "@/dbConfig/dbConfig";
import { uploadFile } from "@/helpers/aws-s3";
import AboutUsModel from "@/models/AboutUsModel/AboutUsModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  const filter = {};
  if (search) {
    filter.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { subtitle: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const banners = await AboutUsModel.find(filter);
    return NextResponse.json({ success: true, data: banners }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// Handle POST request
export async function POST(req) {
  try {

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const sideImage = formData.get("sideImage");
    const bannerImage = formData.get("bannerImage");

    console.log(title, description);

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }
    



    let sideImageUrl = "";
    if (sideImage && sideImage.size > 0) {
      sideImageUrl = `${Date.now()}-${sideImage.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(
        sideImage,
        sideImageUrl,
        sideImage.type
      );
    }

    let bannerImageUrl = "";
    if (bannerImage && bannerImage.size > 0) {
      bannerImageUrl = `${Date.now()}-${bannerImage.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(
        bannerImage,
        bannerImageUrl,
        bannerImage.type
      );
    }

    const insertData = {
      title,
      description,
      sideImage : sideImageUrl,
      bannerImage : bannerImageUrl
    };

    const insertResult = await AboutUsModel.create(insertData);

    return NextResponse.json(
      { success: true, data: insertResult },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
