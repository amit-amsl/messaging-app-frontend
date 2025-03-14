import { useEffect } from "react";
import { useUser } from "@/lib/auth";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import { useUsersActivityStore } from "@/store/users-activity-store";
import { SOCKET_EVENTS } from "@/utils/socket-events";

export function useOnlineUsersStatus() {
  const user = useUser();
  const { socket, connected } = useAuthenticatedSocket();
  const { setInitUserActivity, addNewOnlineUser, removeDisconnectedUser } =
    useUsersActivityStore();

  useEffect(() => {
    function onOnlineUsersStatusEvent(data: {
      newOnlineUser?: number;
      disconnectedUser?: number;
    }) {
      if (data.newOnlineUser === user.data?.userId) return;
      if (data.newOnlineUser) {
        addNewOnlineUser(data.newOnlineUser);
      }
      if (data.disconnectedUser) {
        removeDisconnectedUser(data.disconnectedUser);
      }
      console.log(data);
    }

    function onInitialOnlineUsersDataEvent(data: {
      currentOnlineUsers: number[];
    }) {
      console.log(`connectEvn`, data);
      setInitUserActivity(data.currentOnlineUsers);
      socket.emit(
        SOCKET_EVENTS.onlineUsersStatus.StatusUpdate,
        user.data?.userId
      );
    }

    socket.on(
      SOCKET_EVENTS.onlineUsersStatus.InitialLoginStatus,
      onInitialOnlineUsersDataEvent
    );
    socket.on(
      SOCKET_EVENTS.onlineUsersStatus.StatusUpdate,
      onOnlineUsersStatusEvent
    );
    return () => {
      socket.off(
        SOCKET_EVENTS.onlineUsersStatus.StatusUpdate,
        onOnlineUsersStatusEvent
      );
      socket.off(
        SOCKET_EVENTS.onlineUsersStatus.InitialLoginStatus,
        onInitialOnlineUsersDataEvent
      );
    };
  }, [socket, connected, user.data?.userId]);
}
