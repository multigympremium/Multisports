import connectDB from "@/dbConfig/dbConfig";
import PrivacyPolicyModel from "@/models/PrivacyPolicyModel/PrivacyPolicyModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get product by ID
export async function GET({ params }) {
  const { id } = params;
  try {
    const result = await PrivacyPolicyModel.findById(id);

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
export async function PUT(req) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const testimonialData = {
      content,
    };

    const updatedTestimonial = await PrivacyPolicyModel.findByIdAndUpdate(
      id,
      testimonialData,
      { new: true }
    );

    if (!updatedTestimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
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
export async function DELETE({ params }) {
  const id = params.id;

  try {
    const deletedTestimonial = await PrivacyPolicyModel.findByIdAndDelete(id);

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
