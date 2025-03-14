import { useSocket } from "socket.io-react-hook";
import { useUser } from "./auth";

export function useAuthenticatedSocket() {
  const user = useUser();
  //localhost:3000
  //192.168.68.108:3000
  return useSocket("localhost:3000", {
    enabled: !!user.data,
    withCredentials: true,
    forceNew: true,
  });
}
