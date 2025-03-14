import { api } from "@/lib/api-client";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import { SOCKET_EVENTS } from "@/utils/socket-events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function leaveGroupChat({
  groupId,
  userId,
}: {
  groupId: string;
  userId: number;
}): Promise<any> {
  // TODO: Fix Promise type
  return api.delete(`/chats/group-chats/${groupId}/leave`, {
    data: { userId },
  });
}

export const useLeaveGroupChat = () => {
  const { socket } = useAuthenticatedSocket();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveGroupChat,
    onError: (error) => {
      toast.error("You can't leave this group", {
        className: "",
        description: error.response?.data.message,
      });
    },
    onSuccess: async (_, variables) => {
      const { groupId } = variables;

      await queryClient.invalidateQueries({
        queryKey: ["group-chat", variables.groupId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["group-chat", "list"],
      });
      socket.emit(SOCKET_EVENTS.groupChat.MemberLeave, {
        groupId,
      });
    },
  });
};
