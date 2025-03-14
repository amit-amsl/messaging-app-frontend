import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@/types/api";

async function fetchUserProfile({
  userId,
}: {
  userId: string;
}): Promise<UserProfile> {
  return api.get(`/users/profile/${userId}`);
}

export const useUserProfile = ({ userId }: { userId: string }) =>
  useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => fetchUserProfile({ userId }),
    refetchOnMount: "always",
  });
