import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import ProductModel from "@/models/ProductModel/ProductModel";
import ProductGalleryModel from "@/models/ProductModel/ProductGalleryModel";
import { NextResponse } from "next/server";

connectDB();

// Handle GET request
export async function GET(req, res) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search");
  const newArrival = searchParams.get("new-arrival");
  const size = searchParams.get("size");
  const color = searchParams.get("color");
  const brand = searchParams.get("brand");

  console.log(search, color, size, brand, "search, color, size, brand");

  const filter = {};
  if (search && !color && !size && !brand) {
    filter.$or = [
      { slug: { $regex: new RegExp(search, "i") } },
      { productTitle: { $regex: new RegExp(search, "i") } },
      { category: { $regex: new RegExp(search, "i") } },
      { subcategory: { $regex: new RegExp(search, "i") } },
      { childCategory: { $regex: new RegExp(search, "i") } },
      { modelOfBrandValue: { $regex: new RegExp(search, "i") } },
      { brandValue: { $regex: new RegExp(search, "i") } },
      { productColorValue: { $regex: new RegExp(search, "i") } },
      { productSizeValue: { $regex: new RegExp(search, "i") } },
      { productFlagValue: { $regex: new RegExp(search, "i") } },
    ];
  }

  if (size) {
    filter.productSizeValue = size;
  }

  if (color) {
    filter.productColorValue = color;
  }

  if (brand) {
    filter.brandValue = brand;
  }

  if (newArrival === "true") {
    filter.createdAt = {
      $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // Last 30 days
    };
  }
  console.log(filter, "filter");
  try {
    const products = await ProductModel.find(filter).populate("gallery");
    return NextResponse.json(
      { success: true, data: products },
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

    const productTitle = formData.get("productTitle");
    const shortDescription = formData.get("shortDescription");
    const fullDescription = formData.get("fullDescription");
    const specifications = formData.get("specifications");
    const returnPolicy = formData.get("returnPolicy");
    const price = formData.get("price");
    const discountPrice = formData.get("discountPrice");
    const rewardPoints = formData.get("rewardPoints");
    const stock = formData.get("stock");
    const productCode = formData.get("productCode");
    const metaTitle = formData.get("metaTitle");
    const metaKeywords = formData.get("metaKeywords");
    const metaDescription = formData.get("metaDescription");
    const specialOffer = formData.get("specialOffer") === "true";
    const hasVariants = formData.get("hasVariants") === "true";
    const category = formData.get("category");
    const brandValue = formData.get("brand");
    const productColorValue = formData.get("color");
    const productSizeValue = formData.get("size");
    const productFlagValue = formData.get("flag");
    const modelOfBrandValue = formData.get("model");
    const subcategory = formData.get("subcategory");
    const childCategory = formData.get("childCategory");
    const isNew = formData.get("isNew");
    const isRecommended = formData.get("isRecommended");

    // Checking required fields
    if (
      !productTitle ||
      !shortDescription ||
      !fullDescription ||
      !price ||
      !productCode ||
      !category ||
      !brandValue ||
      !modelOfBrandValue ||
      !subcategory,
      !returnPolicy,
      !specifications
    ) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    // Uploading the thumbnail file
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = "";
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnailUrl = `${Date.now()}-${thumbnailFile.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(
        thumbnailFile,
        thumbnailUrl,
        thumbnailFile.type
      );
      console.log(thumbnailResult, "thumbnailResult");
    }

    // Uploading gallery files
    const galleryFiles = formData.getAll("gallery"); // Handle multiple files
    let galleryEntries = [];
    console.log(galleryFiles, "galleryFiles");
    for (const file of galleryFiles) {
      console.log(file, "file", typeof file, file instanceof File);
      const galleryUrl = `${Date.now()}-${file?.name.replace(/\s/g, "-")}`;
      const galleryUploadResult = await uploadFile(file, galleryUrl, file.type);

      console.log(galleryUploadResult, "galleryUploadResult");

      const galleryEntry = await ProductGalleryModel.create({
        image: galleryUrl,
      });
      console.log(galleryEntry, "galleryEntry");
      galleryEntries.push(galleryEntry._id); // Save the gallery entry IDs
    }

    const submitData = {
      productTitle,
      shortDescription,
      fullDescription,
      returnPolicy,
      specifications,
      price: parseFloat(price),
      discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
      rewardPoints: rewardPoints ? parseInt(rewardPoints) : undefined,
      stock: parseInt(stock),
      productCode,
      metaTitle,
      metaKeywords,
      metaDescription,
      specialOffer,
      hasVariants,
      thumbnail: thumbnailUrl, // URL for thumbnail
      gallery: galleryEntries, // Array of gallery object IDs
      category,
      brandValue,
      productColorValue: productColorValue.split(","),
      productSizeValue: productSizeValue.split(","),
      productFlagValue,
      modelOfBrandValue,
      subcategory,
      childCategory,
      isNew: isNew === "true",
      isRecommended: isRecommended === "true",
    };

    console.log(submitData, "submitData");

    const productResult = await ProductModel.create(submitData);

    if (productResult) {
      return NextResponse.json(
        { success: true, data: productResult },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
