import axios from 'axios';

export const BillingApiGet = async (userId) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/books/billing/get/${userId}`
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
