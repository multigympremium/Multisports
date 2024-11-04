import connectDB from "@/dbConfig/dbConfig";
import OrderModel from "@/models/OrderModel/OrderModel";
import { NextResponse } from "next/server";


// Handle GET request
export async function GET(req, res) {
  connectDB();

  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");

  console.log(status, start_date, end_date, "search, color, size, brand");

  const filter = {};

  if(status){
    filter.status = status;
  }

  if(start_date){
    filter.createdAt = {
      $gte: new Date(start_date),
      $lte: new Date(end_date)
    };
  }

  
  
  try {
    const Orders = await OrderModel.find(filter).populate("shipping_address_id");
    return NextResponse.json(
      { success: true, data: Orders },
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
export async function POST(req, res) {
  connectDB();
  try {
    const reqData = await req.json();

    const {shipping_address_id, products, payment_method, total} = reqData;

    // Checking required fields
    if (
      !shipping_address_id ||
      !products ,
      !payment_method,
      !total
    ) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const submitData = {
      shipping_address_id,
      products,
      payment_method,
      total
    };

    console.log(submitData, "submitData");

    const OrderResult = await OrderModel.create(submitData);

    if (OrderResult) {
      return NextResponse.json(
        { success: true, data: OrderResult },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
