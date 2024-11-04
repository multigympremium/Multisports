import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import ChildCategoryModel from "@/models/ChildCategoryModel/ChildCategoryModel";
import SubcategoryModel from "@/models/SubcategoryModel/SubcategoryModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");


const filter = {
  
};
if(category){
  filter.category = category;
}
if(subcategory){
  filter.subcategory = subcategory;
}
  try {
    const result = await ChildCategoryModel.find(filter);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
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
    const subcategory = formData.get("subcategory");
    const childCategoryName = formData.get("childCategoryName");
    const childCategoryIcon = formData.get("childCategoryIcon");
    const slug = formData.get("slug");

    if (!category || !childCategoryName || !slug || !subcategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
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

    const result = await ChildCategoryModel.create(submitData);
    
   

    

    console.log(result, "result");

    if (result) {
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
