import axios from "axios"

export const addaccount = async (body) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/books/account/add`,
            body,
        )
        console.log("Account API response:", response.data);
        return response.data;        
    } catch (error) {
        console.error("Account API error:", error);
        throw error;        
    }
}