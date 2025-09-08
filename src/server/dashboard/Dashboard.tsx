import { useAuth } from "@/components/config/AuthContext";
import { Loader2 } from "lucide-react";
import React from "react";
import AdminDashboard from "./AdminDashboard";
import MainLayout from "../layout/MainLayout";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  console.log(user);
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-estate-navy" />
      </div>
    );
  }
  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard />;
      default:
        return <p>Unknown role</p>;
    }
  };
  return <MainLayout>{renderDashboard()}</MainLayout>;
};

export default Dashboard;
