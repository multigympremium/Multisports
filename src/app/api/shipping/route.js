import connectDB from "@/dbConfig/dbConfig";
import ShippingAddress from "@/models/ShippingAddressModel/ShippingAddressModel";
import { NextResponse } from "next/server";

connectDB();
export async function GET(req) {
    try {
      const shippingAddresses = await ShippingAddress.find(); // Fetch all addresses
  
      return NextResponse.json({ success: true, data: shippingAddresses }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      recipientName,
      contactNumber,
      district,
      area,
      address,
      postCode,
      deliveryType
    } = body;

    // Check required fields
    if (!recipientName || !contactNumber || !district || !area || !address || !postCode) {
      return NextResponse.json({ success: false, message: 'Required fields are missing.' }, { status: 400 });
    }

    // Create a new shipping address
    const newAddress = await ShippingAddress.create({
      recipientName,
      contactNumber,
      district,
      area,
      address,
      postCode,
      deliveryType,
    });

    return NextResponse.json({ success: true, data: newAddress }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
