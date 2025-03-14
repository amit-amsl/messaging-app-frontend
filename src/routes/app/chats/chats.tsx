import { Outlet, useParams } from "react-router";
import { BookUser } from "lucide-react";
import { useState } from "react";
import ChatsList from "@/features/chats/components/chats-list";
import ContactsList from "@/features/chats/components/contacts-list";
import clsx from "clsx";

export default function ChatsRoute() {
  const { chatId } = useParams();
  const [contactsListMode, setContactsListMode] = useState(false);

  const toggleContactsListMode = () => setContactsListMode(!contactsListMode);
  const isChatView = !!chatId;

  return (
    <div className="flex h-dvh w-full">
      <div
        className={clsx(
          "h-[calc(100%-64px)] w-full border-r-2 border-base-300 md:flex md:flex-col md:h-full md:max-w-sm",
          { hidden: isChatView }
        )}
      >
        <div className="p-4 h-16 bg-base-200 border-b-2 border-base-300 flex items-center justify-between animate-in duration-1000 fill-mode-both slide-in-from-top-full">
          <div className="flex gap-2 justify-center items-center">
            <h1 className="font-bold text-xl">
              {contactsListMode ? "Contacts List" : "Chats"}
            </h1>
          </div>
          <button
            className={clsx(
              `btn btn-outline border-0 btn-square`,
              contactsListMode && "bg-neutral text-white"
            )}
            onClick={toggleContactsListMode}
          >
            <BookUser size={32} />
          </button>
        </div>

        {contactsListMode ? (
          <ContactsList setContactsListMode={setContactsListMode} />
        ) : (
          <ChatsList />
        )}
      </div>

      {isChatView ? (
        <Outlet />
      ) : (
        <div className="hidden md:flex p-4 w-full justify-center items-center mx-auto custom-chat-bg">
          <div className="max-w-4xl ">
            <p className="text-6xl font-bold [text-shadow:_2px_4px_20px_rgb(61_57_57_/_40%)]">
              Select a user on the sidebar and start chit chatting.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
