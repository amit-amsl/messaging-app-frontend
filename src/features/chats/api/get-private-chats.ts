import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { ChatContact } from "@/types/api";

async function fetchPrivateChats(): Promise<ReadonlyArray<ChatContact>> {
  return api.get("/chats/private-chats");
}

export const usePrivateChats = () =>
  useQuery({
    queryKey: ["private-chat", "list"],
    queryFn: () => fetchPrivateChats(),
  });
