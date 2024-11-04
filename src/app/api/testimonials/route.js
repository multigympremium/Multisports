import connectDB from "@/dbConfig/dbConfig";
import { uploadFile } from "@/helpers/aws-s3";
import TestimonialsModel from "@/models/TestimonialsModel/TestimonialsModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  const filter = {};
  if (search) {
    filter.$or = [
      { customerName: { $regex: new RegExp(search, "i") } },
      { designation: { $regex: new RegExp(search, "i") } },
      { description: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const testimonials = await TestimonialsModel.find(filter);
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

    const customerName = formData.get("customerName");
    const designation = formData.get("designation");
    const rating = formData.get("rating");
    const description = formData.get("description");
    const image = formData.get("image");

    if (
      !customerName ||
      !designation ||
    !rating ||
      !description ||
      !image 
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

    const testimonialData = {
      customerName,
      designation,
      rating,
      description,
      image: thumbnailUrl,
    };

    const testimonialResult = await TestimonialsModel.create(testimonialData);

    return NextResponse.json(
      { success: true, data: testimonialResult },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
