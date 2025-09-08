import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/config/AuthContext";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarFooter from "./sidebar/SidebarFooter";

const Sidebar = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "bg-[#262b40] text-white border-r flex flex-col h-full transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />

      <SidebarNavigation collapsed={collapsed} />

      {/* <SidebarFooter collapsed={collapsed} /> */}
    </div>
  );
};

export default Sidebar;
