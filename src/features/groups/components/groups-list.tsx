import { useGroupChats } from "../api/get-group-chats";
import { NavLink } from "react-router";
import { useUser } from "@/lib/auth";
import ChatsListSkeleton from "@/features/chats/components/skeletons/chats-list-skeleton";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import { Group, GroupConversation, Message } from "@/types/api";
import { SOCKET_EVENTS } from "@/utils/socket-events";

type NewGroupMessageSocketPayload = { groupId: string } & Message;

export default function GroupsList() {
  const user = useUser();
  const queryClient = useQueryClient();
  const { socket, connected } = useAuthenticatedSocket();
  const groupChatsQuery = useGroupChats();

  const groupChatsList = groupChatsQuery.data;

  useEffect(() => {
    groupChatsList?.forEach((groupChat) => {
      socket.emit(SOCKET_EVENTS.groupChat.Join, groupChat.groupId);
    });

    return () => {};
  }, [groupChatsList, socket, connected]);

  useEffect(() => {
    async function onGroupChatDelete(data: { groupId: string }) {
      await queryClient.invalidateQueries({
        queryKey: ["group-chat", data.groupId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["group-chat", "list"],
      });
    }

    async function onGroupChatAdminSetting(data: { groupId: string }) {
      await queryClient.invalidateQueries({
        queryKey: ["group-chat", data.groupId],
      });
    }

    async function onGroupChatMemberLeave(data: { groupId: string }) {
      await queryClient.invalidateQueries({
        queryKey: ["group-chat", data.groupId],
      });
    }

    async function onGroupChatCreateEvent() {
      await queryClient.invalidateQueries({
        queryKey: ["group-chat", "list"],
      });
    }

    async function onGroupChatUpdateEvent(data: {
      mutatedGroupId: string;
      groupMembersIds: number[];
      updatedGroupName: string;
    }) {
      const currentGroupsList: Group[] | undefined = queryClient.getQueryData([
        "group-chat",
        "list",
      ]);
      const groupExistsById = currentGroupsList?.find(
        (group) => group.groupId === data.mutatedGroupId
      );
      if (
        (user.data &&
          !groupExistsById &&
          data.groupMembersIds.includes(user.data?.userId)) ||
        (user.data &&
          groupExistsById &&
          !data.groupMembersIds.includes(user.data?.userId)) ||
        (groupExistsById && data.updatedGroupName !== groupExistsById.groupName)
      ) {
        await queryClient.invalidateQueries({
          queryKey: ["group-chat", "list"],
        });
        if (queryClient.getQueryData(["group-chat", data.mutatedGroupId])) {
          await queryClient.invalidateQueries({
            queryKey: ["group-chat", data.mutatedGroupId],
          });
        }
      }
    }
    async function onGroupChatMessageEvent(data: NewGroupMessageSocketPayload) {
      if (queryClient.getQueryData(["group-chat", data.groupId])) {
        queryClient.setQueryData(
          ["group-chat", data.groupId],
          (oldData: GroupConversation) => {
            return { ...oldData, messages: [...oldData.messages, data] };
          }
        );
      } else {
        await queryClient.prefetchQuery({
          queryKey: ["group-chat", data.groupId],
        });
      }

      queryClient.setQueryData(["group-chat", "list"], (oldData: Group[]) => {
        return oldData.map((group) => {
          if (group.groupId === data.groupId) {
            return { ...group, recentMessage: { ...data } };
          }
          return group;
        });
      });
    }
    socket.on(SOCKET_EVENTS.groupChat.Create, onGroupChatCreateEvent);
    socket.on(SOCKET_EVENTS.groupChat.Update, onGroupChatUpdateEvent);
    socket.on(SOCKET_EVENTS.groupChat.NewMessage, onGroupChatMessageEvent);
    socket.on(SOCKET_EVENTS.groupChat.Delete, onGroupChatDelete);
    socket.on(SOCKET_EVENTS.groupChat.MemberLeave, onGroupChatMemberLeave);
    socket.on(
      SOCKET_EVENTS.groupChat.AdminSettingUpdate,
      onGroupChatAdminSetting
    );
    return () => {
      socket.off(SOCKET_EVENTS.groupChat.Create, onGroupChatCreateEvent);
      socket.off(SOCKET_EVENTS.groupChat.Update, onGroupChatUpdateEvent);
      socket.off(SOCKET_EVENTS.groupChat.NewMessage, onGroupChatMessageEvent);
      socket.off(SOCKET_EVENTS.groupChat.Delete, onGroupChatDelete);
      socket.off(SOCKET_EVENTS.groupChat.MemberLeave, onGroupChatMemberLeave);
      socket.off(
        SOCKET_EVENTS.groupChat.AdminSettingUpdate,
        onGroupChatAdminSetting
      );
    };
  }, [queryClient, socket, connected]);

  if (groupChatsQuery.isFetching) {
    return <ChatsListSkeleton />;
  }

  if (!groupChatsList) return null;

  return (
    <div className="overflow-y-auto h-[calc(100%-64px)]">
      {groupChatsList.map((groupChat, idx) => (
        <NavLink
          to={`/groups/${groupChat.groupId}`}
          key={groupChat.groupId}
          style={{
            animationDelay: `${idx * 40}ms`,
            animationDuration: "1000ms",
          }}
          className={({ isActive }) =>
            clsx(
              `flex flex-row gap-4 items-center p-3 border-b border-base-300 transition-all animate-in fill-mode-both slide-in-from-left-full`,
              isActive ? "bg-base-300 text-base-content" : "hover:bg-base-200"
            )
          }
        >
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-12 rounded-full">
              <span>{groupChat.groupName.slice(0, 2).toUpperCase()}</span>
            </div>
          </div>
          <div>
            <h2 className="font-bold">{groupChat.groupName}</h2>
            <small className="text-base-content/50 line-clamp-1">
              {groupChat.recentMessage?.sender?.id &&
              groupChat.recentMessage?.sender?.id === user.data?.userId ? (
                <span className="font-bold">You: </span>
              ) : (
                <span className="font-bold">
                  {groupChat.recentMessage?.sender.username}:{" "}
                </span>
              )}
              {groupChat?.recentMessage?.content}
            </small>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
