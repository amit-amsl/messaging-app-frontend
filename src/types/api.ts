/* 
    Groups & Chats common types
*/

export type Message = {
  id: string;
  sender: Contact;
  content: string;
  createdAt: Date;
};

export type Contact = {
  id: number;
  username: string;
  profile_img_url?: string;
};

export type MessageBubbleProps = {
  type: "sender" | "recipient";
  message: Message;
};

/* 
    Chats types
*/

export type ChatContact = {
  chatId: string;
  recentMessage?: Message;
  contact: Contact;
};

export type ChatConversation = {
  chatId: string;
  messages: Array<Message>;
  contact: Contact;
  createdAt: Date;
};

/* 
    Groups types
*/

export type Group = {
  groupId: string;
  groupName: string;
  recentMessage?: Message;
};

export type GroupCandidates = ReadonlyArray<Contact>;

export type GroupConversation = {
  groupId: string;
  groupName: string;
  users: Array<Contact & { isAdmin: boolean }>;
  messages: Array<Message>;
  createdAt: Date;
};

/* 
    User types
*/

export type UserProfile = Contact & {
  bio: string;
  createdAt: Date;
  stats: {
    sentMessages: number;
    receivedMessages: number;
    groupsMemberOf: number;
  };
};
