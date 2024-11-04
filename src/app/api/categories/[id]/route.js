import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import CategoryModel from "@/models/CategoryModel/CategoryModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const category = await CategoryModel.findOne({ _id: id });

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(req, { params }) {
  const id = params?.id;
  const formData = await req.formData();

  const categoryData = await CategoryModel.findById(id);
  console.log(categoryData, "categoryData");
  if (!categoryData) {
    return NextResponse.json(
      { success: false, message: "Category not found" },
      { status: 404 }
    );
  }

  const categoryName = formData.get("categoryName");
  const featureCategory = formData.get("featureCategory");
  const showOnNavbar = formData.get("showOnNavbar");
  const categoryIcon = formData.get("categoryIcon");
  const categoryBanner = formData.get("categoryBanner");
  const slug = formData.get("slug");

  if (!categoryName || !featureCategory || !showOnNavbar || !slug) {
    return NextResponse.json(
      { success: false, message: "Category not found" },
      { status: 400 }
    );
  }

  const submitData = {
    categoryName,
    featureCategory,
    showOnNavbar,
  };

  console.log(
    submitData,
    "categoryName, featureCategory, showOnNavbar, categoryIcon, categoryBanner"
  );
  let iconName;
  let bannerName;

  if (categoryIcon) {
    iconName = `${Date.now()}-${categoryIcon.name.replace(/\s/g, "-")}`;
    const iconsResult = await uploadFile(
      categoryIcon,
      iconName,
      categoryIcon.type
    );
    console.log(iconsResult, "bannerResult");
    deleteFile(categoryData.categoryIcon);
    submitData.categoryIcon = iconName;
  }

  if (categoryBanner) {
    bannerName = `${Date.now()}-${categoryBanner.name.replace(/\s/g, "-")}`;
    const bannerResult = await uploadFile(
      categoryBanner,
      bannerName,
      categoryBanner.type
    );
    console.log(bannerResult, " bannerResult");
    deleteFile(categoryData.categoryBanner);
    submitData.categoryBanner = bannerName;
  }

  try {
    const category = await CategoryModel.findByIdAndUpdate(id, submitData, {
      new: true,
      runValidators: true,
    });

    console.log(category, "category");
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  const id = params?.id;
  try {
    const categoryItem = await CategoryModel.findOne({ _id: id });
    console.log(categoryItem, "categoryItem");

    if (!categoryItem) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    const deleteIconResult = await deleteFile(categoryItem.categoryIcon);
    const deleteBannerResult = await deleteFile(categoryItem.categoryBanner);

    console.log(
      deleteIconResult,
      deleteBannerResult,
      "deleteIconResult, deleteBannerResult"
    );

    const deleted_category = await CategoryModel.deleteOne({ _id: id });
    if (!deleted_category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Category Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
