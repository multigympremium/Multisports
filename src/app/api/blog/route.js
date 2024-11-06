import connectDB from "@/dbConfig/dbConfig";
import { uploadFile } from "@/helpers/aws-s3";
import BlogModel from "@/models/BlogModel/BlogModel";
import { NextResponse } from "next/server";
import { write } from "xlsx";

connectDB();

// Handle GET request
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  const filter = {};
  if (search) {
    filter.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { writer: { $regex: new RegExp(search, "i") } },
      { blogCategory: { $regex: new RegExp(search, "i") } },
      {slug: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const testimonials = await BlogModel.find(filter);
    return NextResponse.json(
      { success: true, data: testimonials },
      { status: 200 }
    );
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
    const shortDescription = formData.get("shortDescription");
    const fullDescription = formData.get("fullDescription");
    const writer = formData.get("writer");
    const blogCategory = formData.get("blogCategory");
    const image = formData.get("image");
    const metaTitle = formData.get("metaTitle");
    const metaKeywords = formData.get("metaKeywords");
    const metaDescription = formData.get("metaDescription");
    const slug = formData.get("slug");

    if (
      !title ||
      !shortDescription ||
      !fullDescription ||
      !writer ||
      !blogCategory ||
      !image ||
      !metaTitle ||
      !metaKeywords ||
      !metaDescription
    ) {
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
       console.log(thumbnailResult, "thumbnailResult");
     }

    const blogData = {
      writer,
      blogCategory,
      shortDescription,
      fullDescription,
      image: thumbnailUrl,
      title,
      metaTitle,
      metaKeywords, 
      metaDescription,
      slug
    };

    const blogResult = await BlogModel.create(blogData);

    return NextResponse.json(
      { success: true, data: blogResult },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
