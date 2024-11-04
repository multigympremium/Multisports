import connectDB from "@/dbConfig/dbConfig";
import ShippingPolicyModel from "@/models/ShippingPolicyModel/ShippingPolicyModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET() {
  try {
    const testimonials = await ShippingPolicyModel.find();
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

    const existingShippingPolicy = await ShippingPolicyModel.findById(id);

    if (existingShippingPolicy) {
      const updatedShippingPolicy = await ShippingPolicyModel.findByIdAndUpdate(
        id,
        {
          content,
        },
        { new: true }
      );

      if (!updatedShippingPolicy) {
        return NextResponse.json(
          { success: false, message: "Shipping Policy not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: false, data: updatedShippingPolicy },
        { status: 200 }
      );
    }

    const testimonialData = {
      content,
    };

    const testimonialResult = await ShippingPolicyModel.create(testimonialData);

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
