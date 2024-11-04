import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import BrandModel from "@/models/BrandModel/BrandModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get subcategory by ID
export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const subcategory = await BrandModel.findOne({ _id: id });

    if (!subcategory) {
      return NextResponse.json(
        { success: false, message: "Subcategory not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: subcategory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT Request: Update subcategory by ID
export async function PUT(req, { params }) {
  const id = params?.id;
  const formData = await req.formData();

  const subcategoryData = await BrandModel.findById(id);
  if (!subcategoryData) {
    return NextResponse.json(
      { success: false, message: "Subcategory not found" },
      { status: 404 }
    );
  }

  const category = formData.get("category");
  const subcategory = formData.get("subcategory");
  const slug = formData.get("slug");
  const isActive = formData.get("isActive");
  const featureBrand = formData.get("featureBrand");
  const logo = formData.get("logo");
  const banner = formData.get("banner");
  const brandName = formData.get("brandName");

  if (!category || !subcategory || !slug || !brandName) {
    return NextResponse.json(
      { success: false, message: "Required fields missing" },
      { status: 400 }
    );
  }

  const submitData = {
    category,
    subcategory,
    slug,
    isActive: isActive === "true",
    featureBrand: featureBrand === "true",
    brandName,
  };

  // Upload new logo if provided
  if (logo) {
    const logoName = `${Date.now()}-${logo.name.replace(/\s/g, "-")}`;
    const logoResult = await uploadFile(logo, logoName, logo.type);
    submitData.logo = logoName;
    console.log(logoResult);
  }

  // Upload new banner if provided
  if (banner) {
    const bannerName = `${Date.now()}-${banner.name.replace(/\s/g, "-")}`;
    const bannerResult = await uploadFile(banner, bannerName, banner.type);
    submitData.banner = bannerName;
    console.log(bannerResult);
  }

  try {
    const updatedSubcategory = await BrandModel.findByIdAndUpdate(
      id,
      submitData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSubcategory) {
      return NextResponse.json(
        { success: false, message: "Subcategory not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: updatedSubcategory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE Request: Delete subcategory by ID
export async function DELETE(req, { params }) {
  const id = params?.id;
  try {
    const subcategoryItem = await BrandModel.findOne({ _id: id });

    if (!subcategoryItem) {
      return NextResponse.json(
        { success: false, message: "Subcategory not found" },
        { status: 404 }
      );
    }

    // Delete files from S3 if they exist
    const deleteLogoResult = await deleteFile(subcategoryItem.logo);
    const deleteBannerResult = await deleteFile(subcategoryItem.banner);
    console.log(deleteLogoResult, deleteBannerResult, "Files deleted");

    const deletedSubcategory = await BrandModel.deleteOne({ _id: id });
    if (!deletedSubcategory) {
      return NextResponse.json(
        { success: false, message: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Subcategory deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
