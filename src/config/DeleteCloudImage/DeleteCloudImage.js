"use client";
import { getStorage, ref, deleteObject } from "firebase/storage";
import toast from "react-hot-toast";

const DeleteCloudImage = ({ key }) => {
  const storage = getStorage();

  console.log(key, "key");

  // Create a reference to the file to delete
  const desertRef = ref(storage, key);

  // Delete the file
  deleteObject(desertRef)
    .then((result) => {
      console.log(result);
      // File deleted successfully
      toast.success(
        "previously uploaded image has been deleted successfully!",
        {
          duration: 2000,
          position: "top-right",
        }
      );

      console.log("File deleted successfully");
    })
    .catch((error) => {
      console.log(error, error);
      // Uh-oh, an error occurred!
    });
};

export default DeleteCloudImage;
