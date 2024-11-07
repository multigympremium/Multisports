import connectDB from "@/dbConfig/dbConfig";
import GeneralInfoModel from "@/models/GeneralInfoModel/GeneralInfoModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req, res) {
  try {
    const brands = await GeneralInfoModel.find({});
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
    const {company_name, phone, email, description, address, google_map_link, play_store_link, app_store_link, trade_license, tin_no, bin_no, footer_copyright} = await req.json();

    console.log(company_name, phone, email, description, address, trade_license, tin_no, bin_no, footer_copyright) 


    if (!company_name || !phone || !email || !description || !address || !trade_license || !tin_no || !bin_no || !footer_copyright) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }


    const insertData = {
      company_name,
      phone,
      email,
      description,
      address,
      google_map_link,
      play_store_link,
      app_store_link,
      trade_license,
      tin_no,
      bin_no,
      footer_copyright,
    };

    

   

    const brandResult = await GeneralInfoModel.create(insertData);  

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
