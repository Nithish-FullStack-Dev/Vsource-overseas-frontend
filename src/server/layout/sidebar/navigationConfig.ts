import { UserRole } from "@/components/config/AuthContext";
import { Users, FileText, Settings, LayoutDashboard } from "lucide-react";

// Define navigation items for each role
export const navigationByRole: Record<
  UserRole,
  Array<{ to: string; icon: React.ElementType; label: string }>
> = {
  admin: [
    { to: "/", icon: LayoutDashboard, label: "Admin Dashboard" },
    { to: "/content", icon: FileText, label: "CMS" },
    { to: "/settings", icon: Settings, label: "System Config" },
    { to: "/profile", icon: Users, label: "Profile" },
  ],
};
