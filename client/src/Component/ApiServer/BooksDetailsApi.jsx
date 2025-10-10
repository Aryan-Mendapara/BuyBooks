import axios from 'axios';

export const ImagesApiPost = async (formdata) => {
    try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/images/import`,
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    // console.log("New Post : ",response);
    return response.data;
    
  } catch (error) {
    console.log("Images API error: ", error);  
    throw error;
  }
}

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

export const SearchBooksApi = async (query) => {
  try {
    // For now, we'll get all books and filter on the frontend
    // In a real implementation, you'd want a dedicated search endpoint
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/books/images/get`
    );
    
    if (response.data.books && query) {
      const searchTerm = query.toLowerCase();
      const filteredBooks = response.data.books.filter(book => 
        book.title?.toLowerCase().includes(searchTerm) ||
        book.author?.toLowerCase().includes(searchTerm) ||
        book.Publisher?.toLowerCase().includes(searchTerm)
      );
      
      return {
        ...response.data,
        books: filteredBooks,
        query: query,
        count: filteredBooks.length
      };
    }
    
    return response.data;
  } catch (error) {
    console.log("Search API error: ", error);
    throw error;
  }
}
