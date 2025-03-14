import clsx from "clsx";
import { format } from "date-fns";
import { MessageBubbleProps } from "@/types/api";
import { Link } from "react-router";

export default function GroupMessageBubble({
  type,
  message,
}: MessageBubbleProps) {
  return (
    <div
      className={clsx("chat", {
        "chat-end": type === "sender",
        "chat-start": type === "recipient",
      })}
    >
      {type === "recipient" && (
        <div
          className={`chat-image avatar ${!message.sender.profile_img_url && "placeholder"} `}
        >
          <div className="bg-neutral text-neutral-content w-10 rounded-full">
            {message.sender.profile_img_url ? (
              <img alt="" src={message.sender.profile_img_url} />
            ) : (
              <span className="text-xs md:text-base">
                {message.sender.username.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        </div>
      )}
      <div className="chat-header">
        {/* <time className="text-xs opacity-50">
            {format(message.createdAt, "HH:mm")}
          </time> */}
      </div>
      <div
        className={clsx("chat-bubble", {
          "bg-base-300 text-base-content": type === "sender",
        })}
      >
        {type === "recipient" && (
          <Link to={`/profile/${message.sender.id}`}>
            <div className="italic font-medium contents">
              {message.sender.username}
            </div>
          </Link>
        )}
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
