import { FiClock, FiPackage, FiShoppingBag, FiTruck } from "react-icons/fi";

function Orders({ stats }) {
  const orderStates = [
    ["Pending", 0, FiClock, "bg-orange-100 text-orange-700"],
    ["Processing", 0, FiPackage, "bg-blue-100 text-blue-700"],
    ["Shipped", 0, FiTruck, "bg-purple-100 text-purple-700"],
    ["Delivered", 0, FiShoppingBag, "bg-green-100 text-green-700"],
  ];

  return <div>
    <div className="mb-7"><p className="text-[10px] font-bold tracking-[2px] text-orange-600">ORDER MANAGEMENT</p><h2 className="font-serif text-4xl font-bold">Orders</h2><p className="mt-2 text-sm text-gray-500">Track and manage customer orders from one place.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{orderStates.map(([label, value, Icon, color]) => <div key={label} className="rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-5"><span className={`mb-5 grid h-10 w-10 place-items-center rounded-lg ${color}`}><Icon /></span><p className="text-sm text-gray-500">{label}</p><strong className="mt-1 block text-3xl font-bold">{value}</strong></div>)}</div>
    <div className="mt-5 rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-8 text-center"><FiShoppingBag className="mx-auto mb-3 text-4xl text-orange-500" /><h3 className="font-serif text-2xl font-bold">No orders yet</h3><p className="mt-2 text-sm text-gray-500">New customer orders will appear here. Total orders currently: {stats.orders}.</p></div>
  </div>;
}

export default Orders;
