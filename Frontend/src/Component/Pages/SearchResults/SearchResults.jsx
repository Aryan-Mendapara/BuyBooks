import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchBooks } from "../../ApiServer/BooksDetailsApi";
import { getImageUrl } from "../../Utils/imageUrl";
import { ThemeContext } from "../../ThemeContext/ThemeContext";

function SearchResults() {
  const { darkMode } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchText = searchParams.get("q")?.trim() || "";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadResults = async () => {
      if (!searchText) {
        setBooks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await SearchBooks(searchText);
        if (isMounted) setBooks(response.books || []);
      } catch (requestError) {
        if (isMounted) setError("Unable to load search results. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadResults();
    return () => {
      isMounted = false;
    };
  }, [searchText]);

  return (
    <main className={`${darkMode ? "bg-black/90 text-white" : "bg-gray-100 text-black"} min-h-screen px-4 py-8`}>
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-2xl font-bold">Search Results</h1>
        {searchText && <p className="mb-6 text-gray-500">Results for: {searchText}</p>}

        {loading && <p>Searching books...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && !books.length && (
          <p className="text-gray-500">No books found for this search.</p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {books.map((book) => (
              <article
                key={book._id}
                onClick={() => navigate(`/images-details/${book._id}`)}
                className={`${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"} cursor-pointer overflow-hidden rounded-lg border p-3 transition hover:shadow-lg`}
              >
                <div className="flex aspect-[3/4] items-center justify-center overflow-hidden">
                  <img
                    src={getImageUrl(book.image)}
                    alt={book.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h2 className="mt-3 line-clamp-2 text-sm font-semibold">{book.title}</h2>
                {book.author && <p className="mt-1 truncate text-xs text-gray-500">{book.author}</p>}
                <p className="mt-2 font-bold text-orange-500">₹{book.price}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default SearchResults;
