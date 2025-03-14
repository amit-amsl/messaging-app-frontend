import AppLayout from "@/components/layouts/app-layout";
import { IoProvider } from "socket.io-react-hook";
import { Outlet } from "react-router";

export default function AppRoot() {
  return (
    <IoProvider>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </IoProvider>
  );
}
