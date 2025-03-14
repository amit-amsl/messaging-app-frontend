import { useState } from "react";
import { useCreateChatMessage } from "../api/create-chat-message";
import { Send } from "lucide-react";

export default function MessageInput({ chatId }: { chatId: string }) {
  const [messageInput, setMessageInput] = useState("");

  const createChatMessageMutation = useCreateChatMessage();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  };

  const handleMessageSending = () => {
    createChatMessageMutation.mutate({
      messageInput,
      chatId,
    });
    setMessageInput("");
  };

  return (
    <div className="p-2 flex items-center gap-2">
      <textarea
        placeholder=""
        className="textarea textarea-bordered textarea-xs text-sm w-full resize-none"
        value={messageInput}
        onKeyUp={(e) => {
          if (e.key === "Enter" && e.shiftKey == false) {
            handleMessageSending();
          }
        }}
        onChange={handleInputChange}
      ></textarea>
      <button onClick={handleMessageSending}>
        <Send size={32} className="hover:fill-black" />
      </button>
    </div>
  );
}
