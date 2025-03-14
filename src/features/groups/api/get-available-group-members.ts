import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { GroupCandidates } from "@/types/api";

async function fetchGroupCandidates(): Promise<GroupCandidates> {
  return api.get("/chats/group-chats/candidates");
}

export const useGroupCandidates = () =>
  useQuery({
    queryKey: ["group-candidates"],
    queryFn: () => fetchGroupCandidates(),
  });
