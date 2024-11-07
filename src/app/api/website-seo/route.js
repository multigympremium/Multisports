import connectDB from "@/dbConfig/dbConfig";
import { uploadFile } from "@/helpers/aws-s3";
import WebsiteSEO_Model from "@/models/WebsiteSEO_Model/WebsiteSEO_Model";
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
    const banners = await WebsiteSEO_Model.find(filter);
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

    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const metaKeywords = formData.get("metaKeywords");
    const metaOgTitle = formData.get("metaOgTitle");
    const metaOgDescription = formData.get("metaOgDescription");
    const image = formData.get("metaOgImage");


    console.log(title, description);

    if (!metaTitle || !metaDescription || !metaKeywords || !metaOgTitle || !metaOgDescription) {
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
      metaTitle,
      metaDescription,
      metaKeywords,
      metaOgTitle,
      metaOgDescription,
      metaOgImage: thumbnailUrl,
    };

    const insertResult = await WebsiteSEO_Model.create(insertData);

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
