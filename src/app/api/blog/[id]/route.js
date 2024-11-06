import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import BlogModel from "@/models/BlogModel/BlogModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get product by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const result = await BlogModel.findById(id);

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

    const existingBlog = await BlogModel.findById(id);

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }
    
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
     if (image && image.size > 0 ) {
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

    
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      blogData,
      { new: true }
    );
    
    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    if (existingBlog.image !== updatedBlog.image) {
      await deleteFile(existingBlog.image);
    }

    return NextResponse.json(
      { success: true, data: updatedBlog },
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
    const deletedTestimonial = await BlogModel.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    await deleteFile(deletedTestimonial.image);

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
