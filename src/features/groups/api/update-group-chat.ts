import { api } from "@/lib/api-client";
import { z } from "zod";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SOCKET_EVENTS } from "@/utils/socket-events";

export const updateGroupInputSchema = z.object({
  group_name: z.string().min(1, "Field is required"),
  group_members: z
    .object({
      id: z.number(),
      username: z.string(),
    })
    .array(),
});

export type updateGroupInput = z.infer<typeof updateGroupInputSchema>;

async function updateGroupChat({
  data,
  groupId,
}: {
  data: updateGroupInput;
  groupId: string;
}): Promise<any> {
  // TODO: Fix Promise type
  return api.patch(`/chats/group-chats/${groupId}`, data);
}

export const useUpdateGroupChat = () => {
  const { socket } = useAuthenticatedSocket();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGroupChat,
    onSuccess: async (_, variables) => {
      const { groupId: mutatedGroupId, data: updatedGroupData } = variables;
      const groupMembersIds = updatedGroupData.group_members.map(
        (gMember) => gMember.id
      );
      const updatedGroupName = updatedGroupData.group_name;
      Promise.all([
        await queryClient.invalidateQueries({
          queryKey: ["group-chat", mutatedGroupId],
        }),
        await queryClient.invalidateQueries({
          queryKey: ["group-chat", "list"],
        }),
      ]);
      socket.emit(SOCKET_EVENTS.groupChat.Update, {
        mutatedGroupId,
        groupMembersIds,
        updatedGroupName,
      });
    },
  });
};
