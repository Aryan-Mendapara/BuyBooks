import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ children }) {
  const location = useLocation();

  // Routes where Header & Footer should be hidden
  const noHeaderFooterRoutes = ["/payment", "/payment/net-banking"];

  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header />}

      <main className="w-full flex-grow">{children}</main>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default Layout;
