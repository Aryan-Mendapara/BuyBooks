import axios from 'axios';

export const ImagesApiPost = async (formData) => {

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/books/images/import`,
            formData
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

export const SearchBooks = async (search) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/books/images/get`,
      { params: { search } }
    );
    return response.data;
  } catch (error) {
    console.log("Search books API error: ", error);
    throw error;
  }
};

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
