import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { ChatConversation } from "@/types/api";

async function fetchPrivateChat({
  chatId,
}: {
  chatId: string;
}): Promise<ChatConversation> {
  return api.get(`/chats/private-chats/${chatId}`);
}

export const usePrivateChat = ({ chatId }: { chatId: string }) =>
  useQuery({
    queryKey: ["private-chat", chatId],
    queryFn: () => fetchPrivateChat({ chatId }),
    staleTime: Infinity,
    refetchOnMount: "always",
  });
