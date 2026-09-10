import axios from "axios";

export const wishlistApiPost = async (book) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/wishlist/add`,
      book
    );
    return response.data;
  } catch (error) {
    console.error("wishlistApiPost error:", error);
    throw error;
  }
}

export const wishlistApiGet = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/books/wishlist/get`
        );
        return response.data;
    } catch (error) {
        console.error("wishlistApiGet error:", error);
        return [];
    }
};

export const wishlistApiDelete = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/books/wishlist/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("wishlistApiDelete error:", error);
    throw error;
  }    
}