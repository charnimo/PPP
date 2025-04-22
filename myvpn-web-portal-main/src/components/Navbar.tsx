
import { Link } from "react-router-dom";
import { Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  SidebarTrigger
} from "@/components/ui/sidebar";

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="border-b bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {isMobile && (
          <SidebarTrigger className="mr-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
        )}
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">MY_VPN</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {!isMobile && (
          <>
            <Link to="/servers" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Servers
            </Link>
            <Link to="/settings" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Settings
            </Link>
            <Link to="/account" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Account
            </Link>
          </>
        )}
        <Button variant="default" size="sm">
          Connect
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
