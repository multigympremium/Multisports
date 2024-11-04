import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import CategoryModel from "@/models/CategoryModel/CategoryModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);

    // Get query parameters
    const slug = searchParams.get("slug");
    const featureCategory = searchParams.get("featureCategory");
    const showOnNavbar = searchParams.get("showOnNavbar");

    const filter = {};
    if (slug) {
      filter.$or = [{ slug }, { categoryName: slug }];
    }
    if (featureCategory) filter.featureCategory = featureCategory;
    if (showOnNavbar) filter.showOnNavbar = showOnNavbar;

    console.log(filter, "filter");
    const categories = await CategoryModel.find(filter);
    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req, res) {
  try {
    const formData = await req.formData();

    const categoryName = formData.get("categoryName");
    const featureCategory = formData.get("featureCategory");
    const showOnNavbar = formData.get("showOnNavbar");
    const categoryIcon = formData.get("categoryIcon");
    const categoryBanner = formData.get("categoryBanner");
    const slug = formData.get("slug");

    if (
      !categoryName ||
      !featureCategory ||
      !showOnNavbar ||
      !categoryIcon ||
      !categoryBanner ||
      !slug
    ) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 400 }
      );
    }

    console.log(
      {
        categoryName,
        featureCategory,
        showOnNavbar,
        categoryIcon: categoryIcon.name,
        categoryBanner: categoryBanner.name,
        slug,
      },
      "categoryName, featureCategory, showOnNavbar, categoryIcon, categoryBanner"
    );

    const removeSpacesIconName = categoryIcon.name.replace(/\s/g, "-");
    const removeSpacesBannerName = categoryBanner.name.replace(/\s/g, "-");

    console.log(
      removeSpacesIconName,
      removeSpacesBannerName,
      "removeSpacesIconName"
    );

    const categoryIconKey = `${Date.now()}-${removeSpacesIconName}`;
    const categoryBannerKey = `${Date.now()}-${removeSpacesBannerName}`;

    const iconsResult = await uploadFile(
      categoryIcon,
      categoryIconKey,
      categoryIcon.type
    );
    const bannerResult = await uploadFile(
      categoryBanner,
      categoryBannerKey,
      categoryBanner.type
    );

    console.log(iconsResult, bannerResult, "iconsResult, bannerResult");

    const category = await CategoryModel.create({
      categoryName,
      featureCategory,
      showOnNavbar,
      categoryIcon: categoryIconKey,
      categoryBanner: categoryBannerKey,
      slug,
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
