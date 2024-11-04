import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import CategoryModel from "@/models/CategoryModel/CategoryModel";
import SubcategoryModel from "@/models/SubcategoryModel/SubcategoryModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const category = await SubcategoryModel.findOne({ _id: id });

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

  const categoryData = await SubcategoryModel.findById(id);
  console.log(categoryData, "categoryData");
  if (!categoryData) {
    return NextResponse.json(
      { success: false, message: "Subcategory not found" },
      { status: 404 }
    );
  }
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
    submitData,
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

  try {
    const category = await SubcategoryModel.findByIdAndUpdate(id, submitData, {
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
    const categoryItem = await SubcategoryModel.findOne({ _id: id });
    console.log(categoryItem, "categoryItem");

    if (!categoryItem) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    const deleteIconResult = await deleteFile(categoryItem.subcategoryIcon);
    const deleteBannerResult = await deleteFile(categoryItem.subcategoryImage);

    console.log(
      deleteIconResult,
      deleteBannerResult,
      "deleteIconResult, deleteBannerResult"
    );

    const deleted_category = await SubcategoryModel.deleteOne({ _id: id });
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
