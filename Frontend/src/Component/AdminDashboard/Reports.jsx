import { FiBarChart2, FiBookOpen, FiUsers } from "react-icons/fi";

function Reports({ stats, books, customers }) {
  const reportCards = [["Catalogue size", books.length, FiBookOpen], ["Registered customers", customers.length, FiUsers], ["Revenue recorded", `₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`, FiBarChart2]];

  return <div><div className="mb-7"><p className="text-[10px] font-bold tracking-[2px] text-orange-600">STORE INSIGHTS</p><h2 className="font-serif text-4xl font-bold">Reports</h2><p className="mt-2 text-sm text-gray-500">A quick view of your current BuyBooks performance.</p></div><div className="grid gap-4 md:grid-cols-3">{reportCards.map(([label, value, Icon]) => <div key={label} className="rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-6"><Icon className="mb-5 text-2xl text-orange-500" /><p className="text-sm text-gray-500">{label}</p><strong className="mt-1 block text-3xl font-bold">{value}</strong></div>)}</div><div className="mt-5 rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-8"><h3 className="font-serif text-xl font-bold">Reporting period</h3><p className="mt-2 text-sm text-gray-500">Live catalogue and customer totals are shown above. Sales charts will be enabled when order data is connected.</p><div className="mt-6 h-3 rounded-full bg-[#eee8e1]"><div className="h-3 w-2/3 rounded-full bg-orange-500" /></div></div></div>;
}

export default Reports;
