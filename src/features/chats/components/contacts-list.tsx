import { useContactsList } from "@/features/users/api/get-contacts-list";
import { useCreatePrivateChat } from "../api/create-private-chat";
import ContactsListSkeleton from "./skeletons/contacts-list-skeleton";
import { UserX } from "lucide-react";

type ContactsListProps = {
  setContactsListMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ContactsList({
  setContactsListMode,
}: ContactsListProps) {
  const contactsListQuery = useContactsList();
  const createPrivateChatMutation = useCreatePrivateChat();

  const handlePrivateChatCreation = (contactId: number) => {
    createPrivateChatMutation.mutate(contactId);
    setContactsListMode(false);
  };

  if (contactsListQuery.isFetching) {
    return <ContactsListSkeleton />;
  }

  const contactsList = contactsListQuery.data;

  if (!contactsList) return null;

  return (
    <div className="overflow-y-auto h-[calc(100%-64px)]">
      {contactsList.map((contact) => (
        <div
          key={contact.id}
          className="flex flex-row gap-4 items-center p-3 border-b-[1px] transition-all hover:bg-base-200 cursor-pointer"
          onClick={() => handlePrivateChatCreation(contact.id)}
        >
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-12 rounded-full">
              <span>{contact.username.slice(0, 2).toUpperCase()}</span>
            </div>
          </div>
          <div>
            <h2 className="font-bold">{contact.username}</h2>
            <small className="text-stone-400">
              Click to start a private chat...
            </small>
          </div>
        </div>
      ))}
      {contactsList.length === 0 && (
        <div className="flex justify-center items-center gap-3 mt-3">
          <span className="font-bold text-2xl ">No contacts available</span>
          <UserX className="h-10 w-10" />
        </div>
      )}
    </div>
  );
}
