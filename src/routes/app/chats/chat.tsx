import { useParams } from "react-router";
import ChatView from "@/features/chats/components/chat-view";

export default function ChatRoute() {
  const params = useParams();
  const chatId = params.chatId as string;

  return (
    <>
      <ChatView chatId={chatId} />
    </>
  );
}
