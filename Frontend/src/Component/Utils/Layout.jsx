import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  FiBarChart2,
  FiBookOpen,
  FiBox,
  FiGrid,
  FiHome,
  FiLogOut,
  FiSettings,
  FiShoppingBag,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { LuPin } from "react-icons/lu";
import { toast } from "react-toastify";

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPinned = () =>
    localStorage.getItem("adminMenuPinned") === "true" ||
    localStorage.getItem("adminDashboardPinned") === "true";
  const [adminMenuOpen, setAdminMenuOpen] = useState(isAdminPinned);
  const [adminMenuClosing, setAdminMenuClosing] = useState(false);
  const [adminMenuPinned, setAdminMenuPinned] = useState(isAdminPinned);

  // Routes where Header & Footer should be hidden
  const noHeaderFooterRoutes = ["/payment", "/payment/net-banking"];

  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname) || location.pathname.startsWith("/admin");
  const showAdminSidebar = Boolean(localStorage.getItem("adminToken")) && !location.pathname.startsWith("/admin");
  const adminMenuItems = [
    ["overview", "Overview", FiGrid],
    ["books", "Books", FiBookOpen],
    ["orders", "Orders", FiShoppingBag],
    ["customers", "Customers", FiUsers],
    ["inventory", "Inventory", FiBox],
    ["reports", "Reports", FiBarChart2],
    ["settings", "Settings", FiSettings],
  ];

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminMenuPinned");
    localStorage.removeItem("adminDashboardPinned");
    toast.success("Admin logged out successfully");
    window.location.href = "/";
  };

  const persistPin = (pinned) => {
    setAdminMenuPinned(pinned);
    if (pinned) {
      localStorage.setItem("adminMenuPinned", "true");
      localStorage.setItem("adminDashboardPinned", "true");
    } else {
      localStorage.removeItem("adminMenuPinned");
      localStorage.removeItem("adminDashboardPinned");
    }
  };

  const closeAdminMenu = () => {
    if (adminMenuPinned) return;
    setAdminMenuClosing(true);
    setTimeout(() => {
      setAdminMenuOpen(false);
      setAdminMenuClosing(false);
    }, 300);
  };

  const toggleAdminMenu = () => {
    if (adminMenuPinned) return;
    if (adminMenuOpen) {
      closeAdminMenu();
      return;
    }
    setAdminMenuOpen(true);
  };

  const toggleAdminMenuPin = () => {
    const nextPinnedState = !adminMenuPinned;
    persistPin(nextPinnedState);
    setAdminMenuOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showAdminSidebar && (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col items-center bg-[#191817] px-3 py-5 text-white lg:flex">
          <div className="mb-9">
            <span 
              className="grid h-9 w-9 place-items-center rounded-lg bg-orange-500 text-xl font-bold" 
              title="BuyBooks Admin"
            >
              B
            </span>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => { window.location.href = "/"; }} 
              title="Home / Store" 
              aria-label="Home / Store" 
              className={`flex h-11 w-11 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${adminMenuOpen ? "text-gray-300 hover:bg-[#2a2826] hover:text-white" : "bg-orange-500 hover:bg-orange-600"}`}
            >
              <FiHome className="text-lg" />
            </button>

            <button
              onClick={toggleAdminMenu}
              title="Admin Dashboard" 
              aria-label="Admin Dashboard" 
              className={`flex h-11 w-11 items-center justify-center rounded-lg text-gray-300 transition-colors ${adminMenuOpen ? "bg-orange-500 text-white hover:bg-orange-600" : "hover:bg-[#2a2826] hover:text-white"}`}
            >
              <FiGrid className="text-lg" />
            </button>
          </nav>

          <button 
            onClick={handleAdminLogout} 
            title="Sign out" 
            aria-label="Sign out" 
            className="mt-auto flex h-11 w-11 items-center justify-center rounded-lg text-gray-400 hover:bg-[#2a2826] hover:text-white"
          >
            <FiLogOut />
          </button>
        </aside>
      )}

        {showAdminSidebar && (adminMenuOpen || adminMenuClosing) && (
          <aside 
            className={`
              fixed inset-y-0 left-20 z-50 hidden flex-col border-r border-[#d9dede] bg-[#f4f6f6] text-[#27434a] shadow-xl transition-[width,transform] duration-300 ease-in-out lg:flex 
                ${adminMenuPinned ? "w-20" : "w-64"} 
                ${adminMenuClosing ? "-translate-x-full" : "translate-x-0"}`
            }
          >

          <div className={`flex h-20 items-center border-b border-[#d9dede] ${adminMenuPinned ? "justify-center" : "justify-between px-5"}`}>
            {!adminMenuPinned && <strong className="font-serif text-xl">Admin</strong>}

            <div className="flex items-center gap-3">
              <button 
                onClick={toggleAdminMenuPin} 
                title={adminMenuPinned ? "Unpin sidebar" : "Pin sidebar"} 
                aria-label={adminMenuPinned ? "Unpin sidebar" : "Pin sidebar"} 
                className={adminMenuPinned ? "text-orange-500" : "text-[#577078]"}
              >
                <LuPin />
              </button>

              {!adminMenuPinned && 
                <button 
                  onClick={closeAdminMenu} 
                  title="Close sidebar" 
                  aria-label="Close sidebar" 
                  className="text-[#577078] hover:text-orange-500"
                >
                <FiX />
                </button>
              }

            </div>
          </div>
          
          <nav className="space-y-2 p-3">

            {adminMenuItems.map(([id, label, Icon], index) => (
              <button 
                key={label} 
                onClick={() => {
                  if (!adminMenuPinned) closeAdminMenu();
                  navigate(`/admin/dashboard?section=${id}`);
                }} 
                title={label} 
                aria-label={label} 
                className={`flex h-11 w-full items-center rounded-xl text-sm font-semibold transition-opacity duration-200 ${adminMenuPinned ? "justify-center px-0" : "gap-3 px-4 text-left"} ${index === 0 ? "bg-[#cdd3d5]" : "hover:bg-[#dfe4e5]"}`}
              >
                <Icon className="text-lg" /> {!adminMenuPinned && label}
              </button>
            ))}
          </nav>
        </aside>
      )}
      
      {!hideHeaderFooter && (
        <div className={showAdminSidebar ? (adminMenuPinned ? "lg:ml-40" : "lg:ml-20") : ""}>
          <Header />
        </div>
      )}

      <main className={`w-full flex-grow ${showAdminSidebar ? (adminMenuPinned ? "lg:ml-40 lg:w-[calc(100%-10rem)]" : "lg:ml-20 lg:w-[calc(100%-5rem)]") : ""}`}>
        {children}
      </main>

      {!hideHeaderFooter && (
        <div className={showAdminSidebar ? (adminMenuPinned ? "lg:ml-40" : "lg:ml-20") : ""}>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Layout;
