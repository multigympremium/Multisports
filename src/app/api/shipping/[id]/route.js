import connectDB from "@/dbConfig/dbConfig";
import ShippingAddress from "@/models/ShippingAddressModel/ShippingAddressModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get product by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const product = await ShippingAddress.findById(id).populate("gallery"); // populate gallery field

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

 
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Address ID is required.' }, { status: 400 });
    }

    const updatedAddress = await ShippingAddress.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedAddress) {
      return NextResponse.json({ success: false, message: 'Address not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedAddress }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, message: 'Address ID is required.' }, { status: 400 });
  }

  try {
    const deletedAddress = await ShippingAddress.findByIdAndDelete(id);

    if (!deletedAddress) {
      return NextResponse.json({ success: false, message: 'Address not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Address deleted successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
