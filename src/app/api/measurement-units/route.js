import connectDB from "@/dbConfig/dbConfig";
import MeasurementUnitsModel from "@/models/MeasurementUnitsModel/MeasurementUnitsModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req, res) {
  try {
    const brands = await MeasurementUnitsModel.find({});
    return NextResponse.json({ success: true, data: brands }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// Handle POST request
export async function POST(req, res) {
  try {
    const formData = await req.formData();

    const unitName = formData.get("unitName");

    if (!unitName) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const submitData = {
      unitName,
    };

    const brandResult = await MeasurementUnitsModel.create(submitData);

    if (brandResult) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
