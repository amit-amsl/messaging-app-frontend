import { useSocket } from "socket.io-react-hook";
import { useUser } from "./auth";

export function useAuthenticatedSocket() {
  const user = useUser();
  return useSocket(import.meta.env.VITE_APP_SOCKET_URL, {
    enabled: !!user.data,
    withCredentials: true,
    forceNew: true,
  });
}
