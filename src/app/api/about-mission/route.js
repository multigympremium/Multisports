import connectDB from "@/dbConfig/dbConfig";
import { uploadFile } from "@/helpers/aws-s3";
import AboutMissionModel from "@/models/AboutMissionModel/AboutMissionModel";
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
    const banners = await AboutMissionModel.find(filter);
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
    const image = formData.get("image");

    console.log(title, description);

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }
    



    let thumbnailUrl = "";
    if (image && image.size > 0) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(
        image,
        thumbnailUrl,
        image.type
      );
    }

    const insertData = {
      title,
      description,
      image : thumbnailUrl
    };

    const insertResult = await AboutMissionModel.create(insertData);

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
