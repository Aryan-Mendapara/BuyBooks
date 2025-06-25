import React from 'react'

const ImagesApi = async (body) => {
    try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/file/import`,
      body
    );
    console.log(response);
    return response.data;
    
  } catch (error) {
    console.log("Images API error:",error);  
    throw error;
  }
}

export default ImagesApi
