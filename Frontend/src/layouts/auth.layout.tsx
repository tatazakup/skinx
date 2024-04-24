import { Outlet } from "react-router-dom";

export const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="max-w-mobile min-h-dvh m-auto relative">
      {children ? children : <Outlet />}
    </div>
  );
};
