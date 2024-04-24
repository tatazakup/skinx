import { PATH } from "@configs/path";
import { AuthLayout } from "layouts/auth.layout";
import { AppLayout } from "@layouts/app.layout";
import { SigninPage } from "@pages/auth/signin";
import { PostPage } from "@pages/app/Post/PostPage";
import { Route, Routes } from "react-router-dom";

export const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={PATH.AUTH_SIGNIN} element={<SigninPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path={PATH.APP_POST} element={<PostPage />} />
      </Route>
    </Routes>
  );
};
