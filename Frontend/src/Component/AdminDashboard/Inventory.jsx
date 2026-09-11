import { FiAlertTriangle, FiBox, FiCheckCircle, FiPackage } from "react-icons/fi";

function Inventory({ books }) {
  const trackedStock = books.filter((book) => book.stock !== undefined);
  const lowStock = trackedStock.filter((book) => book.stock < 5);
  const outOfStock = trackedStock.filter((book) => book.stock === 0);
  const available = trackedStock.filter((book) => book.stock >= 5);
  const cards = [["Catalogue items", books.length, FiBox, "text-blue-700 bg-blue-100"], ["Available", available.length, FiCheckCircle, "text-green-700 bg-green-100"], ["Low stock", lowStock.length, FiAlertTriangle, "text-orange-700 bg-orange-100"], ["Out of stock", outOfStock.length, FiPackage, "text-red-700 bg-red-100"]];

  return <div><div className="mb-7"><p className="text-[10px] font-bold tracking-[2px] text-orange-600">STOCK CONTROL</p><h2 className="font-serif text-4xl font-bold">Inventory</h2><p className="mt-2 text-sm text-gray-500">Monitor availability across your book catalogue.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, Icon, color]) => <div key={label} className="rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-5"><span className={`mb-5 grid h-10 w-10 place-items-center rounded-lg ${color}`}><Icon /></span><p className="text-sm text-gray-500">{label}</p><strong className="mt-1 block text-3xl font-bold">{value}</strong></div>)}</div><div className="mt-5 rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-6"><h3 className="font-serif text-xl font-bold">Stock review</h3>{trackedStock.length ? trackedStock.map((book) => <div key={book._id} className="flex justify-between border-t border-[#eee8e1] py-3 text-sm"><span>{book.title}</span><strong className={book.stock < 5 ? "text-orange-600" : "text-green-700"}>{book.stock} units</strong></div>) : <p className="mt-4 text-sm text-gray-500">Stock tracking is not available yet. Add a stock field to book records to use inventory alerts.</p>}</div></div>;
}

export default Inventory;
