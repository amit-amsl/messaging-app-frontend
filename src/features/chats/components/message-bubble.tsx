import clsx from "clsx";
import { format } from "date-fns";
import { MessageBubbleProps } from "@/types/api";

export default function MessageBubble({ type, message }: MessageBubbleProps) {
  return (
    <div
      className={clsx("chat", {
        "chat-end": type === "sender",
        "chat-start": type === "recipient",
      })}
    >
      <div className="chat-header"></div>
      <div
        className={clsx("chat-bubble", {
          "bg-base-300 text-base-content": type === "sender",
        })}
      >
        <div className="flex flex-col items-end gap-2">
          <div>{message.content}</div>
          <time className="text-xs opacity-50">
            {format(message.createdAt, "HH:mm")}
          </time>
        </div>
      </div>
    </div>
  );
}
