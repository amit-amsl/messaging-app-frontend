import { api } from "@/lib/api-client";
import { z } from "zod";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SOCKET_EVENTS } from "@/utils/socket-events";

export const createGroupInputSchema = z.object({
  group_name: z.string().min(1, "Field is required"),
  group_members: z
    .object({
      id: z.number(),
      username: z.string(),
    })
    .array(),
});

export type createGroupInput = z.infer<typeof createGroupInputSchema>;

async function createGroupChat(data: createGroupInput): Promise<any> {
  // TODO: Fix Promise type
  return api.post(`/chats/group-chats`, data);
}

export const useCreateGroupChat = () => {
  const { socket } = useAuthenticatedSocket();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroupChat,
    onSuccess: async (_, variables) => {
      const groupMembersIds = variables.group_members.map(
        (gMember) => gMember.id
      );
      await queryClient.invalidateQueries({
        queryKey: ["group-chat", "list"],
      });

      socket.emit(SOCKET_EVENTS.groupChat.Create, groupMembersIds);
    },
  });
};
