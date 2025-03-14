import { useState } from "react";
import { Send } from "lucide-react";
import { useCreateGroupMessage } from "../api/create-group-message";

export default function GroupMessageInput({ groupId }: { groupId: string }) {
  const [messageInput, setMessageInput] = useState("");

  const createGroupMessageMutation = useCreateGroupMessage();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  };

  const handleMessageSending = () => {
    createGroupMessageMutation.mutate({
      messageInput,
      groupId,
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
