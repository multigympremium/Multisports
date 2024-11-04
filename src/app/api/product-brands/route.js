import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import BrandModel from "@/models/BrandModel/BrandModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req, res) {
  try {
    const categories = await BrandModel.find({});
    return NextResponse.json(
      { success: true, data: categories },
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
  try {
    const formData = await req.formData();

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
      isActive: isActive === "true", // Convert to Boolean
      featureBrand: featureBrand === "true", // Convert to Boolean
      brandName,
    };

    console.log(
      {
        category,
        subcategory,
        slug,
        isActive,
        featureBrand,
        logo,
        banner,
        brandName,
      },
      "Logging form data fields"
    );

    // Handle logo upload
    if (logo) {
      const logoName = `${Date.now()}-${logo.name.replace(/\s/g, "-")}`;
      const logoResult = await uploadFile(logo, logoName, logo.type);
      submitData.logo = logoName;
      console.log(logoResult);
    }

    // Handle banner upload
    if (banner) {
      const bannerName = `${Date.now()}-${banner.name.replace(/\s/g, "-")}`;
      const bannerResult = await uploadFile(banner, bannerName, banner.type);
      submitData.banner = bannerName;
      console.log(bannerResult);
    }

    const subcategoryResult = await BrandModel.create(submitData);

    if (subcategoryResult) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
