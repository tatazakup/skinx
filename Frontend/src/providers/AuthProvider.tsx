import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ck from "js-cookie";
import { createContext } from "@utils/CreateContext";
import { PATH } from "@configs/path";

interface AuthContext {}

interface AuthProviderProps {
  children: ReactNode;
}

const [Provider, useContext] = createContext<AuthContext>();

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const routes = useLocation();
  const navigate = useNavigate();

  const [cookies] = useState<{
    refreshToken?: string;
    accessToken?: string;
  }>(ck.get());

  useEffect(() => {
    const routeSplit = routes.pathname.split("/");
    if (routeSplit[1] === "app" && !cookies?.refreshToken) {
      navigate(PATH.AUTH_SIGNIN);
    } else if (cookies?.accessToken && cookies?.refreshToken) {
      navigate(PATH.APP_POST);
    }
  }, [cookies]);

  const authValue = {};

  return <Provider value={authValue}>{children}</Provider>;
};

export { AuthProvider, useContext as useAuthContext };
