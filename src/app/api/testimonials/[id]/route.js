import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import TestimonialsModel from "@/models/TestimonialsModel/TestimonialsModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get product by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const result = await TestimonialsModel.findById(id);

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
    
    const formData = await req.formData();

    const customerName = formData.get("customerName");
    const designation = formData.get("designation");
    const rating = formData.get("rating");
    const description = formData.get("description");
    const image = formData.get("image");

    const existingTestimonial = await TestimonialsModel.findById(id);

    if (!existingTestimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
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
    
    
    const updatedData = {
      customerName,
      designation,
      rating,
      description,
      image: thumbnailUrl,
    };
    
    const updatedTestimonial = await TestimonialsModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    
    if (!updatedTestimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    if (existingTestimonial.image !== updatedTestimonial.image) {
      await deleteFile(existingTestimonial.image);
    }

    return NextResponse.json(
      { success: true, data: updatedTestimonial },
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
    const deletedTestimonial = await TestimonialsModel.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Testimonial deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
