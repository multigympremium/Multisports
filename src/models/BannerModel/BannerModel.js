import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },

    image: {
      type: String, // Storing the URL of the uploaded image
      required: true,
    },
    key: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const BannerModel =
  mongoose.models.banners || mongoose.model("banners", BannerSchema);

export default BannerModel;
