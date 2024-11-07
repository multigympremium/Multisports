import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    css: {
      type: String,
      required: true,
    },
    headerJs: {
      type: String,
      required: true,
    },
    footerJs: {
      type: String, // Storing the URL of the uploaded image
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const CustomCssAndJsModel =
  mongoose.models.custom_css_and_js ||
  mongoose.model("custom_css_and_js", TestimonialSchema);

export default CustomCssAndJsModel;
