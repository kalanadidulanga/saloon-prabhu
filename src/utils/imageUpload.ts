import axios from "axios";

/**
 * Utility to upload an image to the backend server and return its URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The URL of the uploaded image.
 * @throws Will throw an error if the upload fails.
 */

export const uploadImage = async (file: File) => {
  if (!(file instanceof File)) {
    throw new Error(
      "Invalid file provided. Please provide a valid File object."
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  try {
    const response = await axios.post(`${baseUrl}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (
      response.status === 201 &&
      response.data.success &&
      response.data.data.fileUrl
    ) {
      return response.data.data.fileUrl;
    } else {
      throw new Error("Unexpected response format from the server.");
    }
  } catch (error: any) {
    console.error("Image upload failed:", error);
    if (error.response) {
      // Server responded with error status
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        "Failed to upload the image";
      throw new Error(errorMessage);
    }
    throw new Error("Failed to upload the image. Please try again.");
  }
};
