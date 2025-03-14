import { usePrivateChat } from "../api/get-private-chat";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import Messages from "./messages";
import MessageInput from "./message-input";
import ChatSkeletonView from "./skeletons/chat-skeleton-view";
import {
  isUserOnline,
  useUsersActivityStore,
} from "@/store/users-activity-store";
export default function ChatView({ chatId }: { chatId: string }) {
  const privateChatQuery = usePrivateChat({
    chatId,
  });
  const { usersActivity } = useUsersActivityStore();
  const navigate = useNavigate();

  if (privateChatQuery.isLoading) {
    return <ChatSkeletonView />;
  }

  const privateChat = privateChatQuery.data;

  if (privateChatQuery.error?.response?.status === 401) {
    navigate("/chats");
  }

  if (!privateChat) return null;

  return (
    <div className="md:min-w-[508px] h-[calc(100%-64px)] md:h-full w-full flex flex-col justify-between custom-chat-bg">
      <div className="h-16 flex-shrink-0 p-4 bg-base-200 border-b-2 border-base-300 flex gap-2 items-center ">
        <Link to={"/chats"}>
          <ArrowLeft className="hover:-translate-x-2 transition-transform" />
        </Link>
        <div>
          <Link to={`/profile/${privateChat.contact.id}`}>
            <h1 className="font-bold text-xl link-hover">
              {privateChat.contact.username || ""}
            </h1>
          </Link>
          {isUserOnline(privateChat.contact.id, usersActivity) ? (
            <span className="text-success font-bold">online</span>
          ) : (
            <span className="text-base-content/50">offline</span>
          )}
        </div>
      </div>
      <Messages messages={privateChat.messages} />
      <MessageInput chatId={chatId} />
    </div>
  );
}
