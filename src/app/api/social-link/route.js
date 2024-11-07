import connectDB from "@/dbConfig/dbConfig";
import SocialLinkModel from "@/models/SocialLinkModel/SocialLinkModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req, res) {
  try {
    const brands = await SocialLinkModel.find({});
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
    const requestData = await req.json();

    // const {facebook, twitter, instagram, linkedin, messenger, whatsapp, telegram, youtube, tiktok, pinterest, viber} = requestData;


    // const submitData = {
    //   facebook,
    //   twitter,
    //   instagram,
    //   linkedin,
    //   messenger,
    //   whatsapp,
    //   telegram,
    //   youtube,
    //   tiktok,
    //   pinterest,  
    //   viber
    // };

    const insertResult = await SocialLinkModel.create(requestData);

    if (insertResult) {
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
