import { api } from "@/lib/api-client";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatConversation, ChatContact, Message } from "@/types/api";
import { toast } from "sonner";
import { SOCKET_EVENTS } from "@/utils/socket-events";

async function createChatMessage({
  messageInput,
  chatId,
}: {
  messageInput: string;
  chatId: string;
}): Promise<Message> {
  return api.post(`/chats/private-chats/${chatId}`, { messageInput });
}

export const useCreateChatMessage = () => {
  const { socket } = useAuthenticatedSocket();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChatMessage,
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
    onSuccess: (newData, variables) => {
      const { chatId } = variables;
      queryClient.setQueryData(
        ["private-chat", variables.chatId],
        (oldData: ChatConversation) => {
          return { ...oldData, messages: [...oldData.messages, newData] };
        }
      );
      queryClient.setQueryData(
        ["private-chat", "list"],
        (oldData: ChatContact[]) => {
          return oldData.map((contact) => {
            if (contact.chatId === chatId) {
              return { ...contact, recentMessage: { ...newData } };
            }
            return contact;
          });
        }
      );
      socket.emit(SOCKET_EVENTS.privateChat.NewMessage, { chatId, newData });
    },
  });
};
