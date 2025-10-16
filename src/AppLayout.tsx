import { useState } from "react";
import { Outlet } from "react-router";
import { Container } from "reactstrap";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ScrollToTopSentry from "./components/ScrollToTopSentry";

export const AppLayout = () => {
  const [ isSidebarOpen, setSidebarOpen ] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div>
      <ScrollToTopSentry />
      <Header toggleSidebar={toggleSidebar} />
      <div className={`app-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar />
        <main>
          <Container className="px-4 py-3">
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
};