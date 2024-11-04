import connectDB from "@/dbConfig/dbConfig";
import BannerModel from "@/models/BannerModel/BannerModel";
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
    const banners = await BannerModel.find(filter);
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
    const { title, subtitle, shortDescription, image, key } = await req.json();

    if (!title || !subtitle || !shortDescription || !image || !key) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const bannerData = {
      title,
      subtitle,
      shortDescription,
      image,
      key,
    };

    const bannerResult = await BannerModel.create(bannerData);

    return NextResponse.json(
      { success: true, data: bannerResult },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
