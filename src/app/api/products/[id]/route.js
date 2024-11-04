import connectDB from "@/dbConfig/dbConfig";
import { deleteFile, uploadFile } from "@/helpers/aws-s3";
import ProductModel from "@/models/ProductModel/ProductModel";
import ProductGalleryModel from "@/models/ProductModel/ProductGalleryModel";
import { NextResponse } from "next/server";

connectDB();

// GET Request: Get product by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const product = await ProductModel.findById(id).populate("gallery"); // populate gallery field

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT Request: Update product by ID
export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const formData = await req.formData();

    const productData = await ProductModel.findById(id).populate("gallery");
    if (!productData) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

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
    const galleryItemIds = formData.getAll("galleryItemIds");
    const isNew = formData.get("isNew");
    const isRecommended = formData.get("isRecommended");

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
    for (const id of galleryItemIds) {
      const galleryItem = await ProductGalleryModel.findById(id);
      console.log(galleryItem, "galleryItem");
      galleryEntries.push(galleryItem._id);
    }

    console.log(galleryFiles, "galleryFiles");
    for (const file of galleryFiles) {
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
      productColorValue,
      productSizeValue,
      productFlagValue,
      modelOfBrandValue,
      subcategory,
      childCategory,

      returnPolicy,
      specifications,

      isNew: isNew === "true",
      isRecommended: isRecommended === "true",
    };

    console.log(submitData, "submitData");

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      submitData,
      {
        new: true,
        runValidators: true,
      }
    ).populate("gallery"); // Populate gallery field in response

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Delete thumbnail from S3 if it exists
    if (productData.thumbnail !== updatedProduct.thumbnail) {
      await deleteFile(productData.thumbnail);
    }

    // Delete gallery images from S3
    if (productData.gallery && productData.gallery.length > 0) {
      for (const galleryImage of productData.gallery) {
        const isSameImage = updatedProduct.gallery.map(gallery => gallery.image).includes(galleryImage.image);
        if (isSameImage) {
          
          await deleteFile(galleryImage.image);
        }

      }
    }

    return NextResponse.json(
      { success: true, data: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE Request: Delete product by ID
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const productItem = await ProductModel.findById(id).populate("gallery");

    if (!productItem) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Delete thumbnail from S3 if it exists
    if (productItem.thumbnail) {
      await deleteFile(productItem.thumbnail);
    }

    // Delete gallery images from S3
    if (productItem.gallery && productItem.gallery.length > 0) {
      for (const galleryImage of productItem.gallery) {
        await deleteFile(galleryImage.image);
      }
    }

    // Delete product
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
