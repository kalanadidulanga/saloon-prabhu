import axios from "axios";

/**
 * Utility to upload an image to a given server and return its URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The URL of the uploaded image.
 * @throws Will throw an error if the upload fails.
 */

export const uploadImage2 = async (file: File) => {
  if (!(file instanceof File)) {
    throw new Error(
      "Invalid file provided. Please provide a valid File object."
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const url = import.meta.env.VITE_FILEUPLOAD_URL

  try {
    const response = await axios.post(
      url,
      formData
    );
    if (response.status === 200 && response.data.fileUrl) {
      return response.data.fileUrl;
    } else {
      throw new Error("Unexpected response format from the server.");
    }
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Failed to upload the image. Please try again.");
  }
};
