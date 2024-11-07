import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import WebsiteSEO_Model from "@/models/WebsiteSEO_Model/WebsiteSEO_Model";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get product by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const result = await WebsiteSEO_Model.findById(id);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
// Handle PUT request
export async function PUT(req, { params }) {
  try {

    const id = params.id;

    const existingVision = await WebsiteSEO_Model.findById(id);

    if (!existingVision) {
      return NextResponse.json(
        { success: false, message: "Item already exists" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const metaKeywords = formData.get("metaKeywords");
    const metaOgTitle = formData.get("metaOgTitle");
    const metaOgDescription = formData.get("metaOgDescription");
    const image = formData.get("metaOgImage");

    if (!metaTitle || !metaDescription || !metaKeywords || !metaOgTitle || !metaOgDescription) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    let thumbnailUrl = "";
    if (image && image.size > 0 && image !== existingVision.image) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(
        image,
        thumbnailUrl,
        image.type
      );
    }
    

    
    const insertData = {}

    if(metaTitle) insertData.metaTitle = metaTitle;
    if(metaDescription) insertData.metaDescription = metaDescription;
    if(metaKeywords) insertData.metaKeywords = metaKeywords;
    if(metaOgTitle) insertData.metaOgTitle = metaOgTitle;
    if(metaOgDescription) insertData.metaOgDescription = metaOgDescription;
    if(image) insertData.metaOgImage = thumbnailUrl;
    


    const updatedBanner = await WebsiteSEO_Model.findByIdAndUpdate(id, insertData, {
      new: true,
    });


    if (!updatedBanner) {
      return NextResponse.json(
        { success: false, message: "banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBanner },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Handle DELETE request
export async function DELETE(req, { params }) {
  const id = params.id;

  try {

    const existingVision = await WebsiteSEO_Model.findById(id);

    if (!existingVision) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    const deletedBanner = await WebsiteSEO_Model.findByIdAndDelete(id);


    await deleteFile(existingVision.image);

    return NextResponse.json(
      { success: true, message: "Banner deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
