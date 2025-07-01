import axios from 'axios';
import React from 'react'

export const ImagesApiPost = async (formdata) => {
    try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/file/import`,
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(">>>>>>>>>>>>.",response);
    return response.data;
    
  } catch (error) {
    console.log("Images API error: ", error);  
    throw error;
  }
}

export const ImagesApiGet = async (formdata) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/books/file/get`,
      formdata
    );
    console.log(">>>>>>>>>>>>.",response);
    return response.data;
  } catch (error) {
    console.log("Images API error: ", error);
    throw error;
  }
}

// export default {ImagesApiPost, ImagesApiGet}
