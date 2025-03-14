import MobileBottomNav from "@/components/mobile-bottom-nav";
import Sidebar from "@/components/sidebar";
import { useOnlineUsersStatus } from "@/hooks/use-online-users-status";
import { Toaster } from "sonner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  useOnlineUsersStatus();

  return (
    <div className="flex h-dvh w-full">
      <Sidebar />
      {children}
      <Toaster position="top-center" />
      <MobileBottomNav />
    </div>
  );
}
