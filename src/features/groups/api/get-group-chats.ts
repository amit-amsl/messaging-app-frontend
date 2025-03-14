import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Group } from "@/types/api";

async function fetchGroupChats(): Promise<ReadonlyArray<Group>> {
  return api.get("/chats/group-chats");
}

export const useGroupChats = () =>
  useQuery({
    queryKey: ["group-chat", "list"],
    queryFn: () => fetchGroupChats(),
  });
