import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import WishlistModel from "@/models/WishlistModel/WishlistModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET() {
  try {
    const wishlists = await WishlistModel.find({});
    return NextResponse.json({ success: true, data: wishlists }, { status: 200 });
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
    const { user_id, email, product_id } = await req.json();
    

    if (!user_id || !email || !product_id) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const submitData = { user_id, email, product_id };

    const wishlistResult = await WishlistModel.create(submitData);

    if (wishlistResult) {
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
