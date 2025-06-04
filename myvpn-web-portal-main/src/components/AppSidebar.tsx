import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { 
  Home, 
  Globe, 
  Settings, 
  User, 
  Shield, 
  HelpCircle, 
  LogOut 
} from "lucide-react";

export function AppSidebar() {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  let userRole = null;
  if (authToken) {
    try {
      const decoded: any = jwtDecode(authToken);
      userRole = decoded?.role || null;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
    }
  }

  const mainMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/"
    },
    {
      title: "Servers",
      icon: Globe,
      path: "/servers"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings"
    },
    {
      title: "Account",
      icon: User,
      path: "/account"
    },
    ...(userRole === "admin"
      ? [
          {
            title: "Admin",
            icon: User,
            path: "/admin"
          }
        ]
      : [])
  ];

  const supportMenuItems = [
    {
      title: "Help Center",
      icon: HelpCircle,
      path: "/help"
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-4 flex items-center">
        <Shield className="h-6 w-6 text-sidebar-foreground mr-2" />
        <span className="text-lg font-bold text-sidebar-foreground">MY_VPN</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton onClick={() => navigate(item.path)}>
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton onClick={() => navigate(item.path)}>
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                localStorage.removeItem("authToken");
                navigate("/");
              }}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
