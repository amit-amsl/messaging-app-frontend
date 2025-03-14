import { useScrollToBottom } from "@/hooks/use-scrolltobottom";
import { useUser } from "@/lib/auth";
import { Fragment, useRef } from "react";
import { format } from "date-fns";
import GroupMessageBubble from "./group-message-bubble";
import { Message } from "@/types/api";

export default function GroupMessages({
  messages,
}: {
  messages: Array<Message>;
}) {
  const user = useUser();

  let lastRenderedDate: string | null = null;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useScrollToBottom(messagesEndRef, messages);

  return (
    <div className="h-full flex flex-col gap-2 px-2 overflow-y-auto scroll-smooth">
      {messages.map((message) => {
        const messageDate = format(message.createdAt, "eee (dd/MM/uuuu)");

        const showDateHeader = messageDate !== lastRenderedDate; // Check if the date is new

        // Update lastRenderedDate to the current messageDate
        if (showDateHeader) {
          lastRenderedDate = messageDate;
        }

        const isSelfMessage = message.sender.id === user.data?.userId;

        return (
          <Fragment key={message.id}>
            {showDateHeader && (
              <div className="badge badge-ghost mx-auto font-bold text-center my-2 ">
                {messageDate}
              </div>
            )}
            <GroupMessageBubble
              type={isSelfMessage ? "sender" : "recipient"}
              message={message}
            />
          </Fragment>
        );
      })}
      {/* Dummy <div/> for auto scroll */}
      <div ref={messagesEndRef}></div>
    </div>
  );
}
