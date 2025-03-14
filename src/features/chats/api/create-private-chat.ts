import { api } from "@/lib/api-client";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import { SOCKET_EVENTS } from "@/utils/socket-events";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createPrivateChat(contactId: number): Promise<any> {
  return api.post(`/chats/private-chats/`, { contactId });
}

export const useCreatePrivateChat = () => {
  const { socket } = useAuthenticatedSocket();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPrivateChat,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["contacts-list"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["private-chat", "list"],
        }),
      ]);
      socket.emit(SOCKET_EVENTS.privateChat.Create, variables);
    },
  });
};
