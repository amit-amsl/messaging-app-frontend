import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthLoader, ProtectedRoute } from "./lib/auth";
import LoginRoute from "@/routes/auth/login";
import RegisterRoute from "@/routes/auth/register";
import AppRoot from "./routes/app/app-root";
import ChatsRoute from "./routes/app/chats/chats";
import ChatRoute from "./routes/app/chats/chat";
import GroupRoute from "./routes/app/groups/group";
import GroupsRoute from "./routes/app/groups/groups";
import GroupCreationRoute from "./routes/app/groups/group-create";
import ProfileRoute from "./routes/app/profile";
import HomeRoute from "./routes/app/home";
import { LoaderCircle } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <AuthLoader
        renderLoading={
          <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
            <LoaderCircle
              className="animate-spin duration-700"
              size={220}
              strokeWidth={1}
            />
            <p className="font-bold text-3xl">checking stuff...</p>
          </div>
        }
      >
        <Routes>
          <Route path="auth/login" element={<LoginRoute />} />
          <Route path="auth/register" element={<RegisterRoute />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppRoot />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomeRoute />} />
            <Route path="profile">
              <Route path=":userId" element={<ProfileRoute />} />
            </Route>
            <Route path="groups" element={<GroupsRoute />}>
              <Route path="create" element={<GroupCreationRoute />} />
              <Route path=":groupId" element={<GroupRoute />} />
            </Route>
            <Route path="chats" element={<ChatsRoute />}>
              <Route path=":chatId" element={<ChatRoute />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthLoader>
    </BrowserRouter>
  );
}

export default App;
