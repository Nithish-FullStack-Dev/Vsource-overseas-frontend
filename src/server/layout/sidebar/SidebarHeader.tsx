import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarHeader = ({ collapsed, toggleCollapsed }: SidebarHeaderProps) => {
  return (
    <div
      className={cn(
        "h-16 flex items-center px-3",
        collapsed ? "justify-center" : "justify-between"
      )}
    >
      {!collapsed ? (
        <Link
          to="/"
          className="flex items-center gap-2 transition-all duration-300 hover:opacity-90"
        >
          <img
            src="/assets/images/red vs logo.PNG"
            alt="Vsource"
            className="h-14 w-auto transition-all duration-300"
          />
        </Link>
      ) : (
        <img
          src="/assets/images/red vs logo.PNG"
          alt="Vsource Logo"
          className="h-10 w-auto transition-all duration-300"
        />
      )}
    </div>
  );
};

export default SidebarHeader;
