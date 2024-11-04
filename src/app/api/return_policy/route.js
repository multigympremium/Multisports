import connectDB from "@/dbConfig/dbConfig";
import ReturnPolicyModel from "@/models/ReturnPolicyModel/ReturnPolicyModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET() {
  try {
    const testimonials = await ReturnPolicyModel.find();
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
    const { content, id } = await req.json();
    if (!content) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const existingReturnPolicy = await ReturnPolicyModel.findById(id);

    if (existingReturnPolicy) {
      const updatedReturnPolicy = await ReturnPolicyModel.findByIdAndUpdate(
        id,
        {
          content,
        },
        { new: true }
      );

      if (!updatedReturnPolicy) {
        return NextResponse.json(
          { success: false, message: "Shipping Policy not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: false, data: updatedReturnPolicy },
        { status: 200 }
      );
    }

    const testimonialData = {
      content,
    };

    const testimonialResult = await ReturnPolicyModel.create(testimonialData);

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
