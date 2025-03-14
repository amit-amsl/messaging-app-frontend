import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { GroupConversation } from "@/types/api";

async function fetchGroupChat({
  groupId,
}: {
  groupId: string;
}): Promise<GroupConversation> {
  return api.get(`/chats/group-chats/${groupId}`);
}

export const useGroupChat = ({ groupId }: { groupId: string }) =>
  useQuery({
    queryKey: ["group-chat", groupId],
    queryFn: () => fetchGroupChat({ groupId }),
    staleTime: Infinity,
    refetchOnMount: "always",
  });
