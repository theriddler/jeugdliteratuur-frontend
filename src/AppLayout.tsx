import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Container } from "reactstrap";

export const AppLayout = () => {
  const [ isSidebarOpen, setSidebarOpen ] = useState(false);
  const location = useLocation();

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [ isSidebarOpen, location ]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-layout">
      {/* Mobile-only Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      ></div>
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar />
      </div>
      <div className="main-content">
        <Header />
        <main className="content-area">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
};