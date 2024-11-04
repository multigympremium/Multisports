import mongoose from "mongoose";

const ModelBrandSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ModelOfBrandModel =
  mongoose.models.models_of_brands ||
  mongoose.model("models_of_brands", ModelBrandSchema);

export default ModelOfBrandModel;
