import { api } from "@/lib/api-client";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import { SOCKET_EVENTS } from "@/utils/socket-events";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateGroupChatAdmins({
  groupId,
  userId,
}: {
  groupId: string;
  userId: number;
}): Promise<any> {
  // TODO: Fix Promise type
  return api.patch(`/chats/group-chats/${groupId}/admins`, { userId });
}

export const useUpdateGroupChatAdmins = () => {
  const { socket } = useAuthenticatedSocket();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGroupChatAdmins,
    onSuccess: async (_, variables) => {
      const { groupId } = variables;

      await queryClient.invalidateQueries({
        queryKey: ["group-chat", variables.groupId],
      });

      socket.emit(SOCKET_EVENTS.groupChat.AdminSettingUpdate, {
        groupId,
      });
    },
  });
};
