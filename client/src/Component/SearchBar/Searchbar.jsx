import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SearchBar() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`http://localhost:5000/books?search=${searchQuery}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error(err));
    }
  }, [searchQuery]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">
        Search Results for:{" "}
        <span className="text-orange-500">{searchQuery}</span>
      </h2>
      {results.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((book) => (
            <li key={book.id} className="border p-3 rounded-lg shadow-md">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default SearchBar;
