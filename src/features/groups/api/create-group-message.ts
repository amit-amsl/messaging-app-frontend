import { api } from "@/lib/api-client";
import { Group, GroupConversation, Message } from "@/types/api";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SOCKET_EVENTS } from "@/utils/socket-events";

async function createGroupMessage({
  messageInput,
  groupId,
}: {
  messageInput: string;
  groupId: string;
}): Promise<Message> {
  return api.post(`/chats/private-chats/${groupId}`, { messageInput });
}

export const useCreateGroupMessage = () => {
  const { socket } = useAuthenticatedSocket();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroupMessage,
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
    onSuccess: (newData, variables) => {
      const { groupId } = variables;
      queryClient.setQueryData(
        ["group-chat", variables.groupId],
        (oldData: GroupConversation) => {
          return { ...oldData, messages: [...oldData.messages, newData] };
        }
      );
      queryClient.setQueryData(["group-chat", "list"], (oldData: Group[]) => {
        return oldData.map((group) => {
          if (group.groupId === groupId) {
            return { ...group, recentMessage: { ...newData } };
          }
          return group;
        });
      });
      socket.emit(SOCKET_EVENTS.groupChat.NewMessage, { groupId, newData });
    },
  });
};
