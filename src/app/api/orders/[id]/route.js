import connectDB from "@/dbConfig/dbConfig";
import { deleteFile } from "@/helpers/aws-s3";
import OrderModel from "@/models/OrderModel/OrderModel";
import { NextResponse } from "next/server";


// GET Request: Get product by ID
export async function GET(req, { params }) {
  connectDB();
  const { id } = params;
  try {
    const product = await OrderModel.findById(id).populate("shipping_address_id") // populate gallery field
    
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

// PUT Request: Update product by ID
export async function PUT(req, { params }) {
  connectDB();
  const { id } = params;
  try {
    const reqData = await req.json();

    const {shipping_address_id, products, payment_method} = reqData;

    // Checking required fields
    if (
      !shipping_address_id ||
      !Orders ,
      payment_method
    ) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const submitData = {
      shipping_address_id,
      products,
      payment_method
    };

    console.log(submitData, "submitData");

    const updatedProduct = await OrderModel.findByIdAndUpdate(
      id,
      submitData,
      {
        new: true,
        runValidators: true,
      }
    ).populate("shipping_address_id")// Populate gallery field in response

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE Request: Delete product by ID
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const productItem = await OrderModel.findById(id).populate("shipping_address_id");

    if (!productItem) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    

    // Delete product
    const deletedProduct = await OrderModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
