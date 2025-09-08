import { Outlet } from "react-router-dom";

const ServerLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default ServerLayout;
