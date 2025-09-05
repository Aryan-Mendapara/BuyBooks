import axios from 'axios';

export const BillingApiPost = async (book) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/billing/import`,
      book
    );
    return response.data;
  } catch (error) {
    console.error("BillingApiPost error:", error);
    throw error;
  }
};

export const BillingApiGet = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/books/billing/get`
        );
        return response.data;
    } catch (error) {
        console.error("BillingApiGet error:", error);
        return [];
    }
};

export const BillingApiDelete = async (bookId) => {
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/books/billing/delete/${bookId}`
        );
        return response.data;
    } catch (error) {
        console.error("BillingApiDelete error:", error);
        throw error;
    }
};
