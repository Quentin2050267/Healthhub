import React from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ChatBot from "./ChatBot/ChatBot";

/**
 * Layout component
 * This component renders the layout of the website, including the header, footer, and chatbot.
 * It conditionally renders different layouts based on the current route.
 */
function Layout() {
  const location = useLocation();
  // Define the paths where the layout should be disabled
  const match = useMatch('/hospital/:id');

  if (location.pathname === "/bot" || match) {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }

  if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/verify-email") {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
      <ChatBot />
    </div>
  );
}

export default Layout;