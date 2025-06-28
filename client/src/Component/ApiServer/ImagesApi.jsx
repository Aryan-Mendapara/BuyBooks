import axios from 'axios';
import React from 'react'

const ImagesApi = async (formdata) => {
    try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/file/import`,
      formdata
    );
    console.log(">>>>>>>>>>>>.",response);
    return response.data;
    
  } catch (error) {
    console.log("Images API error:",error);  
    throw error;
  }
}

export default ImagesApi
