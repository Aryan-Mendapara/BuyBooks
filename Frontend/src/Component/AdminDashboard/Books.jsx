import { FiSearch, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Books({ books, search, setSearch }) {
  const navigate = useNavigate();

  return (
    <div>

      {/* PAGE HEADER */}

      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">

        <div>
          <p className="text-[10px] font-bold tracking-[2px] text-orange-600">
            CATALOGUE MANAGEMENT
          </p>

          <h2 className="font-serif text-4xl font-bold">
            Books
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage all books available in your BuyBooks store.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/addImages")
          }
          className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <FiPlus />
          Add book
        </button>

      </div>


      {/* BOOK TABLE */}

      <div className="rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-5">

        {/* SEARCH */}

        <div className="mb-5 flex items-center justify-between gap-4">

          <label className="flex max-w-sm flex-1 items-center gap-2 rounded-md border border-[#e5dfd8] bg-white px-3 py-2 text-gray-500">

            <FiSearch />

            <input
              type="text"
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search books by title or author..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </label>

          <span className="text-xs text-gray-500">
            {books.length} books
          </span>

        </div>


        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] text-left text-sm">

            <thead className="text-xs uppercase tracking-wider text-gray-500">

              <tr>
                <th className="pb-3">
                  Book
                </th>

                <th className="pb-3">
                  Author
                </th>

                <th className="pb-3">
                  Category
                </th>

                <th className="pb-3">
                  Price
                </th>

                <th className="pb-3">
                  Stock
                </th>

                <th className="pb-3">
                  Added
                </th>
              </tr>

            </thead>

            <tbody>

              {books.map((book) => (

                <tr
                  key={book._id}
                  className="border-t border-[#eee8e1]"
                >

                  <td className="py-3">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-9 items-center justify-center overflow-hidden rounded bg-[#eee8e1]">

                        {book.image ? (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            No image
                          </span>
                        )}

                      </div>

                      <strong>
                        {book.title}
                      </strong>

                    </div>

                  </td>

                  <td className="py-3 text-gray-500">
                    {book.author || "-"}
                  </td>

                  <td className="py-3 capitalize text-gray-500">
                    {book.category || "-"}
                  </td>

                  <td className="py-3 font-semibold">
                    ₹{book.price || 0}
                  </td>

                  <td className="py-3">
                    {book.stock ?? 0}
                  </td>

                  <td className="py-3 text-gray-500">
                    {book.createdAt
                      ? new Date(
                          book.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {!books.length && (
            <div className="py-12 text-center">

              <p className="text-sm text-gray-500">
                No books found.
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Books;