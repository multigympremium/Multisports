import connectDB from "@/dbConfig/dbConfig";
import TermsConditionModel from "@/models/TermsConditionModel/TermsConditionModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET() {
  try {
    const testimonials = await TermsConditionModel.find();
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

    const existingTermsCondition = await TermsConditionModel.findById(id);

    if (existingTermsCondition) {
      const updatedTermsCondition = await TermsConditionModel.findByIdAndUpdate(
        id,
        {
          content,
        },
        { new: true }
      );

      if (!updatedTermsCondition) {
        return NextResponse.json(
          { success: false, message: "Shipping Policy not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: false, data: updatedTermsCondition },
        { status: 200 }
      );
    }

    const testimonialData = {
      content,
    };

    const testimonialResult = await TermsConditionModel.create(testimonialData);

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
