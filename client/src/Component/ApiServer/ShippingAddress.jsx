import axios from "axios";

export const addAddress = async (address) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/books/ShippingAddress/add`,
            address
        );
        
        return response.data;
    } catch (error) {
        console.error("Error adding shipping address:", error);
        throw error;
    }
}