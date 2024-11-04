import mongoose from "mongoose";

const ProductGallerySchema = new mongoose.Schema(
  {
    image: {
      type: String, // Reference to Child Category
      required: true,
    },
  },
  { timestamps: true }
);

const ProductGalleryModel =
  mongoose.models.product_galleries ||
  mongoose.model("product_galleries", ProductGallerySchema);

export default ProductGalleryModel;
