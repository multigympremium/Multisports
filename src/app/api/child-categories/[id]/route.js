import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import CategoryModel from "@/models/CategoryModel/CategoryModel";
import ChildCategoryModel from "@/models/ChildCategoryModel/ChildCategoryModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req, { params }) {
  const id = params?.id;
  try {
    const result = await ChildCategoryModel.findOne({ _id: id });

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(req, { params }) {
  const id = params?.id;
  console.log(id, "id");
  const formData = await req.formData();

  const categoryData = await ChildCategoryModel.findById(id);
  console.log(categoryData, "categoryData");
  if (!categoryData) {
    return NextResponse.json(
      { success: false, message: "Subcategory not found" },
      { status: 404 }
    );
  }
  const category = formData.get("category");
  const subcategory = formData.get("subcategory");
  const childCategoryName = formData.get("childCategoryName");
  const childCategoryIcon = formData.get("childCategoryIcon");
  const slug = formData.get("slug");

  console.log(category, subcategory, slug, childCategoryName, "category");

  if (!category || !subcategory || !slug || !childCategoryName) {
    return NextResponse.json(
      { success: false, message: "Please fill all the fields" },
      { status: 400 }
    );
  }
  const submitData = {
    category,
    childCategoryName,
    slug,
    subcategory,
  };

  if (childCategoryIcon) {
    const iconName = `${Date.now()}-${childCategoryIcon.name.replace(
      /\s/g,
      "-"
    )}`;
    const iconsResult = await uploadFile(
      childCategoryIcon,
      iconName,
      childCategoryIcon.type
    );

    submitData.childCategoryIcon = iconName;

    console.log(iconsResult);
  }

  try {
    const category = await ChildCategoryModel.findByIdAndUpdate(
      id,
      submitData,
      {
        new: true,
        runValidators: true,
      }
    );

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
    const resultData = await ChildCategoryModel.findOne({ _id: id });
    console.log(resultData, "resultData");

    if (!resultData) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    const deleteIconResult = await deleteFile(resultData.childCategoryIcon);

    console.log(
      deleteIconResult,

      "deleteIconResult, deleteBannerResult"
    );

    const deleted_category = await ChildCategoryModel.deleteOne({ _id: id });
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
