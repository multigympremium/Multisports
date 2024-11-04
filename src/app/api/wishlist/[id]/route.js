import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import WishlistModel from "@/models/WishlistModel/WishlistModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get Wishlist by ID
export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const Wishlist = await WishlistModel.findOne({ _id: id });

    if (!Wishlist) {
      return NextResponse.json(
        { success: false, message: "Wishlist not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: Wishlist }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT Request: Update Wishlist by ID
export async function PUT(req, {params} ) {
  const id = params?.id;
  const reqData = await req.json();


  const submitData = { user_id, email, product_id };

  try {
    const updatedWishlist = await WishlistModel.findByIdAndUpdate(
      id,
      reqData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedWishlist) {
      return NextResponse.json(
        { success: false, message: "Wishlist not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: updatedWishlist },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE Request: Delete Wishlist by ID
export async function DELETE(req, { params }) {
  const id = params?.id;
  try {
    const WishlistItem = await WishlistModel.findOne({ _id: id });

    if (!WishlistItem) {
      return NextResponse.json(
        { success: false, message: "Wishlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Wishlist deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
