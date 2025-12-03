import axios from 'axios';

export const ImagesApiPost = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axios.post(
            `${BASE_URL}/books/images/import`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );

        console.log("Images API response:", response.data);
        return response.data;

    } catch (error) {
        console.log("Images API error: ", error);
        throw error;
    }
};

export const ImagesApiGet = async (category) => {
  try {
    const response = await axios.get(
     `${import.meta.env.VITE_BACKEND_URL}/books/images/get`,
     { params: category ? { category } : {} }
   );
    // console.log("New Get : ",response);
    return response.data;
  } catch (error) {
    console.log("Images API Get error: ", error);
    throw error;
  }
}

export const ImagesApiDelete = async (bookId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/books/images/delete/${bookId}`,      
    );
    // console.log("New Delete : ",response);
    return response.data;
  } catch (error) {
    console.log("Images API Delete error", error);
    throw error;    
  }
}
