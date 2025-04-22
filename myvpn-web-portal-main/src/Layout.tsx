
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultCollapsed={isMobile}>
      <div className="min-h-screen flex w-full">
        {!isMobile && <AppSidebar />}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
