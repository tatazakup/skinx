import { Outlet } from "react-router-dom";

export const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-full min-h-dvh m-auto relative">
      {children ? children : <Outlet />}
    </div>
  );
};
