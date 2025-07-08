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
    console.log("Best Post :",response);
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
    console.log("Best Get : ",response);
    return response.data;
  } catch (error) {
    console.log("Images API Get error: ", error);
    throw error;
  }
}

export const ImagesApiDelete = async (bookId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/books/file/delete/${bookId}`,      
    );
    console.log("Best Delete : ",response);
    return response.data;
  } catch (error) {
    console.log("Images API Delete error", error);
    throw error;    
  }
}
