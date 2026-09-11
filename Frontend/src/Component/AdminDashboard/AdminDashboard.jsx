import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiBarChart2, FiBookOpen, FiBox, FiGrid, FiHome, FiLogOut,
  FiMenu, FiSettings, FiShoppingBag, FiUsers, FiX,
} from "react-icons/fi";
import { LuPin } from "react-icons/lu";
import Overview from "./Overview";
import Books from "./Books";
import Orders from "./Orders";
import Customers from "./Customers";
import Inventory from "./Inventory";
import Reports from "./Reports";
import Settings from "./Settings";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
const menuItems = [
  { id: "overview", label: "Overview", icon: FiGrid },
  { id: "books", label: "Books", icon: FiBookOpen },
  { id: "orders", label: "Orders", icon: FiShoppingBag },
  { id: "customers", label: "Customers", icon: FiUsers },
  { id: "inventory", label: "Inventory", icon: FiBox },
  { id: "reports", label: "Reports", icon: FiBarChart2 },
  { id: "settings", label: "Settings", icon: FiSettings },
];

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionFromUrl = new URLSearchParams(location.search).get("section");
  const [activeTab, setActiveTab] = useState(sectionFromUrl || "overview");
  const isSidebarPinned = () =>
    localStorage.getItem("adminDashboardPinned") === "true" ||
    localStorage.getItem("adminMenuPinned") === "true";
  const [sidebarOpen, setSidebarOpen] = useState(isSidebarPinned);
  const [sidebarPinned, setSidebarPinned] = useState(isSidebarPinned);
  const [stats, setStats] = useState({ books: 0, customers: 0, orders: 0, revenue: 0 });
  const [books, setBooks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const request = async (path) => {
    const response = await fetch(`${backendUrl}${path}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
    });
    const data = await response.json();
    if (!response.ok) {
      localStorage.removeItem("adminToken");
      throw new Error(data.message || "Admin session expired");
    }
    return data;
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin", { replace: true });
      return;
    }

    Promise.all([request("/admin/dashboard"), request("/admin/books"), request("/admin/customers")])
      .then(([dashboard, booksData, customersData]) => {
        setStats(dashboard.stats || stats);
        setBooks(booksData.books || []);
        setCustomers(customersData.customers || []);
      })
      .catch((error) => {
        toast.error(error.message);
        navigate("/admin", { replace: true });
      });
  }, [navigate]);

  useEffect(() => {
    setActiveTab(sectionFromUrl || "overview");
  }, [sectionFromUrl]);

  const selectSection = (section) => {
    setActiveTab(section);
    navigate(`/admin/dashboard?section=${section}`);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminDashboardPinned");
    localStorage.removeItem("adminMenuPinned");
    toast.success("Admin logged out successfully");
    navigate("/admin", { replace: true });
  };

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author || ""}`.toLowerCase().includes(search.toLowerCase())
  );
  const activeLabel = menuItems.find((item) => item.id === activeTab)?.label || "Overview";

  return (
    <div className="min-h-screen bg-[#f5f2ee] text-[#171717]">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-20 flex-col items-center bg-[#191817] px-3 py-5 text-white">
        <span className="mb-9 grid h-9 w-9 place-items-center rounded-lg bg-orange-500 text-xl font-bold" title="BuyBooks Admin">B</span>
        <nav className="space-y-2">
          <button onClick={() => navigate("/")} title="Home / Store" aria-label="Home / Store" className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-300 hover:bg-[#2a2826] hover:text-white"><FiHome className="text-lg" /></button>
          <button
            onClick={() => {
              if (sidebarPinned) return;
              setSidebarOpen((open) => !open);
            }}
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500 text-white hover:bg-orange-600"
          >
            <FiGrid className="text-lg" />
          </button>
        </nav>
        <button onClick={logout} title="Sign out" aria-label="Sign out" className="mt-auto flex h-11 w-11 items-center justify-center rounded-lg text-gray-400 hover:bg-[#2a2826] hover:text-white"><FiLogOut /></button>
      </aside>

      {(sidebarOpen || sidebarPinned) && (
        <aside className={`fixed inset-y-0 left-20 z-30 flex flex-col border-r border-[#d9dede] bg-[#f4f6f6] text-[#27434a] shadow-xl transition-[width] duration-300 ${sidebarPinned ? "w-20" : "w-64"}`}>
          <div className={`flex h-20 items-center border-b border-[#d9dede] ${sidebarPinned ? "justify-center" : "justify-between px-5"}`}>
            {!sidebarPinned && <strong className="font-serif text-xl">Admin</strong>}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setSidebarPinned((pinned) => {
                    const next = !pinned;
                    if (next) {
                      localStorage.setItem("adminDashboardPinned", "true");
                      localStorage.setItem("adminMenuPinned", "true");
                    } else {
                      localStorage.removeItem("adminDashboardPinned");
                      localStorage.removeItem("adminMenuPinned");
                    }
                    return next;
                  });
                  setSidebarOpen(true);
                }}
                title={sidebarPinned ? "Unpin sidebar" : "Pin sidebar"}
                aria-label={sidebarPinned ? "Unpin sidebar" : "Pin sidebar"}
                className={sidebarPinned ? "text-orange-500" : "text-[#577078]"}
              >
                <LuPin />
              </button>
              {!sidebarPinned && <button onClick={() => setSidebarOpen(false)} title="Close sidebar" aria-label="Close sidebar" className="text-[#577078] hover:text-[#27434a]"><FiX /></button>}
            </div>
          </div>
          <nav className="space-y-2 p-3">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => selectSection(id)}
                title={label}
                aria-label={label}
                className={`flex h-11 w-full items-center rounded-xl transition ${sidebarPinned ? "justify-center px-0" : "gap-4 px-4 text-left"} ${activeTab === id ? "bg-[#cdd3d5] text-[#27434a]" : "hover:bg-[#dfe4e5]"}`}
              >
                <Icon className="text-lg" />
                {!sidebarPinned && <span>{label}</span>}
              </button>
            ))}
          </nav>
        </aside>
      )}

      <main className={sidebarPinned ? "lg:ml-40" : sidebarOpen ? "lg:ml-80" : "lg:ml-20"}>
        <header className="flex h-24 items-center justify-between border-b border-[#e5dfd8] bg-[#fffdf9] px-5 sm:px-10">
          <div className="flex items-center gap-4"><button className="text-2xl lg:hidden" onClick={() => setSidebarOpen(true)}><FiMenu /></button><div><p className="text-[10px] font-bold tracking-[2px] text-orange-600">BUYBOOKS CONTROL ROOM</p><h1 className="font-serif text-2xl font-bold">{activeLabel}</h1></div></div>
          <div className="flex items-center gap-3"><span className="hidden text-right sm:block"><strong className="block text-sm">Administrator</strong><small className="text-xs text-gray-500">Store manager</small></span><span className="grid h-10 w-10 place-items-center rounded-full bg-orange-200 font-bold text-orange-800">A</span></div>
        </header>
        <section className="p-5 sm:p-10">
          {activeTab === "overview" && <Overview stats={stats} books={books} onBooks={() => selectSection("books")} />}
          {activeTab === "books" && <Books books={filteredBooks} search={search} setSearch={setSearch} />}
          {activeTab === "orders" && <Orders stats={stats} />}
          {activeTab === "customers" && <Customers customers={customers} />}
          {activeTab === "inventory" && <Inventory books={books} />}
          {activeTab === "reports" && <Reports stats={stats} books={books} customers={customers} />}
          {activeTab === "settings" && <Settings />}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
