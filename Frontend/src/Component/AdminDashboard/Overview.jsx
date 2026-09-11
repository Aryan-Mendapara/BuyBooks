import { FiBarChart2, FiBookOpen, FiShoppingBag, FiUsers } from "react-icons/fi";

function Overview({ stats, books, onBooks }) {
  const cards = [
    ["Total books", stats.books, FiBookOpen, "text-orange-600 bg-orange-100"],
    ["Total orders", stats.orders, FiShoppingBag, "text-blue-600 bg-blue-100"],
    ["Customers", stats.customers, FiUsers, "text-green-600 bg-green-100"],
    ["Revenue", `₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`, FiBarChart2, "text-purple-600 bg-purple-100"],
  ];

  return <>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[2px] text-orange-600">STORE OVERVIEW</p><h2 className="mt-1 font-serif text-4xl font-bold">Good morning, admin.</h2><p className="mt-2 text-sm text-gray-500">Here is what is happening across BuyBooks today.</p></div><button onClick={onBooks} className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"><FiBookOpen /> Manage books</button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, Icon, color]) => <div key={label} className="rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-5"><span className={`mb-5 grid h-10 w-10 place-items-center rounded-lg ${color}`}><Icon /></span><p className="text-sm text-gray-500">{label}</p><strong className="mt-1 block text-3xl font-bold">{value}</strong><small className="text-xs text-gray-500">Current store data</small></div>)}</div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_.7fr]"><div className="rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-5"><div className="mb-4 flex items-center justify-between"><div><p className="text-[10px] font-bold tracking-[2px] text-orange-600">CATALOGUE</p><h3 className="font-serif text-xl font-bold">Recently added books</h3></div><span className="text-xs text-gray-500">{books.length} total</span></div>{books.slice(0, 5).map((book) => <div key={book._id} className="flex items-center gap-3 border-t border-[#eee8e1] py-3"><div className="grid h-12 w-10 place-items-center overflow-hidden rounded bg-[#eee8e1] text-gray-500">{book.image ? <img src={book.image} alt="" className="h-full w-full object-cover" /> : <FiBookOpen />}</div><div className="min-w-0 flex-1"><strong className="block truncate text-sm">{book.title}</strong><small className="text-xs text-gray-500">{book.author || "Unknown author"}</small></div><b className="text-sm">₹{book.price}</b></div>)}{!books.length && <p className="py-8 text-center text-sm text-gray-500">No books added yet.</p>}</div><div className="rounded-xl bg-[#292625] p-6 text-white"><p className="text-[10px] font-bold tracking-[2px] text-orange-300">QUICK INSIGHT</p><h3 className="mt-4 font-serif text-2xl font-bold">Keep your catalogue fresh.</h3><p className="mt-4 text-sm leading-6 text-gray-300">Review pricing, add new arrivals and keep every title ready for your customers.</p></div></div>
  </>;
}

export default Overview;
