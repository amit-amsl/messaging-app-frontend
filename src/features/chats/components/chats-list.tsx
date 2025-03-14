import { useAuthenticatedSocket } from "@/lib/use-socket";
import { useQueryClient } from "@tanstack/react-query";
import { usePrivateChats } from "../api/get-private-chats";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import ChatsListSkeleton from "./skeletons/chats-list-skeleton";
import clsx from "clsx";
import { useUser } from "@/lib/auth";
import { ChatConversation, Message, ChatContact } from "@/types/api";
import {
  isUserHasUnseenMessages,
  isUserOnline,
  useUsersActivityStore,
} from "@/store/users-activity-store";
import { SOCKET_EVENTS } from "@/utils/socket-events";

type NewChatMessageSocketPayload = { chatId: string } & Message;

export default function ChatsList() {
  const user = useUser();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { socket, connected } = useAuthenticatedSocket();
  const { usersActivity, setIsMessagesUnseenByUserId } =
    useUsersActivityStore();

  const privateChatsQuery = usePrivateChats();

  const privateChatsList = privateChatsQuery.data;

  useEffect(() => {
    privateChatsList?.forEach((privChat) => {
      socket.emit(SOCKET_EVENTS.privateChat.Join, privChat.chatId);
    });

    return () => {};
  }, [privateChatsList, socket, connected]);

  useEffect(() => {
    function onPrivateChatCreateEvent() {
      queryClient.invalidateQueries({
        queryKey: ["private-chat", "list"],
      });
    }
    async function onPrivateChatMessageEvent(
      data: NewChatMessageSocketPayload
    ) {
      if (queryClient.getQueryData(["private-chat", data.chatId])) {
        queryClient.setQueryData(
          ["private-chat", data.chatId],
          (oldData: ChatConversation) => {
            return { ...oldData, messages: [...oldData.messages, data] };
          }
        );
      } else {
        await queryClient.prefetchQuery({
          queryKey: ["private-chat", data.chatId],
        });
        //setIsMessagesUnseenByUserId(data.sender.id, true);
      }
      if (location.pathname !== `/chats/${data.chatId}`) {
        setIsMessagesUnseenByUserId(data.sender.id, true);
      }

      queryClient.setQueryData(
        ["private-chat", "list"],
        (oldData: ChatContact[]) => {
          return oldData.map((contact) => {
            if (contact.chatId === data.chatId) {
              return { ...contact, recentMessage: { ...data } };
            }
            return contact;
          });
        }
      );
    }

    socket.on(SOCKET_EVENTS.privateChat.Create, onPrivateChatCreateEvent);
    socket.on(SOCKET_EVENTS.privateChat.NewMessage, onPrivateChatMessageEvent);
    return () => {
      socket.off(SOCKET_EVENTS.privateChat.Create, onPrivateChatCreateEvent);
      socket.off(
        SOCKET_EVENTS.privateChat.NewMessage,
        onPrivateChatMessageEvent
      );
    };
  }, [queryClient, socket, connected]);

  if (privateChatsQuery.isFetching) {
    return <ChatsListSkeleton />;
  }

  if (!privateChatsList) return null;

  return (
    <div className="overflow-y-auto h-[calc(100%-64px)]">
      {privateChatsList.map((privChat, idx) => (
        <NavLink
          to={`/chats/${privChat.chatId}`}
          key={privChat.chatId}
          style={{
            animationDelay: `${idx * 40}ms`,
            animationDuration: "1000ms",
          }}
          className={({ isActive }) =>
            clsx(
              `flex flex-row gap-4 items-center p-3 border-b border-base-300 transition-all animate-in fill-mode-both slide-in-from-left-full`,
              isActive ? "bg-base-300 text-base-content" : "hover:bg-base-200",
              isUserHasUnseenMessages(privChat.contact.id, usersActivity)
                .isMessagesUnseen && "bg-[#009485]/40"
            )
          }
          onClick={() =>
            setIsMessagesUnseenByUserId(privChat.contact.id, false)
          }
        >
          <div
            className={clsx(
              "avatar",
              !privChat.contact.profile_img_url && "placeholder",
              isUserOnline(privChat.contact.id, usersActivity)
                ? "online"
                : "offline"
            )}
          >
            <div className="bg-neutral text-neutral-content w-12 rounded-full">
              {privChat.contact.profile_img_url ? (
                <img src={privChat.contact.profile_img_url} />
              ) : (
                <span>
                  {privChat.contact.username.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <div>
            <h2 className="font-bold">{privChat.contact.username}</h2>
            <small className="text-base-content/50">
              {privChat.recentMessage?.sender?.id &&
                privChat.recentMessage?.sender?.id === user.data?.userId && (
                  <span className="font-bold">You: </span>
                )}
              {privChat?.recentMessage?.content}
            </small>
          </div>
          {isUserHasUnseenMessages(privChat.contact.id, usersActivity)
            .isMessagesUnseen && (
            <div className="flex-grow flex justify-end">
              <div className="badge text-lg font-bold">
                {
                  isUserHasUnseenMessages(privChat.contact.id, usersActivity)
                    .unseenMessagesCount
                }
              </div>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
}
