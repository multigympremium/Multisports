import connectDB from "@/dbConfig/dbConfig";
import {  uploadFile } from "@/helpers/aws-s3";
import ChildCategoryModel from "@/models/ChildCategoryModel/ChildCategoryModel";
import SubcategoryModel from "@/models/SubcategoryModel/SubcategoryModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  console.log(category, "category");

  const filter = {};
  if (category) filter.category = category;

  try {
    const categories = await SubcategoryModel.find(filter);
    const child_categories = await ChildCategoryModel.find({  });
    return NextResponse.json(
      { success: true, data: categories , child_categories: child_categories},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req, res) {
  try {
    const formData = await req.formData();

    const category = formData.get("category");
    const subcategoryName = formData.get("subcategoryName");
    const subcategoryIcon = formData.get("subcategoryIcon");
    const subcategoryImage = formData.get("subcategoryImage");
    const slug = formData.get("slug");

    if (!category || !subcategoryName || !slug) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 400 }
      );
    }

    const submitData = {
      category,
      subcategoryName,
      slug,
    };

    console.log(
      {
        category,
        subcategoryName,
        subcategoryIcon,
        subcategoryImage,
        slug,
      },

      "categoryName, featureCategory, showOnNavbar, categoryIcon, categoryBanner"
    );

    if (subcategoryIcon) {
      const iconName = `${Date.now()}-${subcategoryIcon.name.replace(
        /\s/g,
        "-"
      )}`;
      const iconsResult = await uploadFile(
        subcategoryIcon,
        iconName,
        subcategoryIcon.type
      );

      submitData.subcategoryIcon = iconName;

      console.log(iconsResult);
    }

    if (subcategoryImage) {
      const imageName = `${Date.now()}-${subcategoryImage.name.replace(
        /\s/g,
        "-"
      )}`;
      const bannerResult = await uploadFile(
        subcategoryImage,
        imageName,
        subcategoryImage.type
      );

      submitData.subcategoryImage = imageName;

      console.log(bannerResult);
    }

    const subcategoryResult = await SubcategoryModel.create(submitData);

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
