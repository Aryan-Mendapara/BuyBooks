import { useState, useEffect } from 'react';
import { ImagesApiGet, ImagesApiDelete } from '../ApiServer/NewArrivalImgApi';

export default function useBookList() {
  const [books, setBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooksFromServer();
    // eslint-disable-next-line
  }, []);

  const fetchBooksFromServer = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ImagesApiGet();
      setBooks(response.books || []);
    } catch (err) {
      setError('Failed to load books.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleBooks((prev) => Math.min(prev + 12, books.length));
  };

  const handleDeleteImages = async (bookId) => {
    setError(null);
    try {
      await ImagesApiDelete(bookId);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (err) {
      setError('Failed to delete book.');
    }
  };

  return {
    books,
    visibleBooks,
    loading,
    error,
    setBooks,
    setVisibleBooks,
    fetchBooksFromServer,
    handleLoadMore,
    handleDeleteImages,
  };
} 