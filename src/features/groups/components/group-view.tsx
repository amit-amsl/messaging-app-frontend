import ChatSkeletonView from "@/features/chats/components/skeletons/chat-skeleton-view";
import { useGroupChat } from "../api/get-group-chat";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Info, Settings, Trash2 } from "lucide-react";
import GroupMessages from "./group-messages";
import GroupMessageInput from "./group-message-input";
import { useUser } from "@/lib/auth";
import Drawer from "@/components/drawer";
import GroupInfo from "./group-info";
import UpdateGroupChat from "./group-update";
import { useState } from "react";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useDeleteGroupChat } from "../api/delete-group-chat";

export default function GroupView({ groupId }: { groupId: string }) {
  const [drawerViewMode, setDrawerViewMode] = useState<"info" | "edit">("info");
  const user = useUser();
  const navigate = useNavigate();

  const toggleDrawerView = () =>
    setDrawerViewMode((prev) => (prev === "edit" ? "info" : "edit"));

  const groupChatQuery = useGroupChat({
    groupId,
  });

  const deleteGroupChatMutation = useDeleteGroupChat();

  if (groupChatQuery.isLoading) {
    return <ChatSkeletonView />;
  }

  const groupChat = groupChatQuery.data;

  const isLoggedUserGroupAdmin = !!groupChat?.users.find(
    (groupUser) => groupUser.id === user.data?.userId && groupUser.isAdmin
  );

  if (
    groupChatQuery.error?.response?.status === 401 ||
    groupChatQuery.error?.response?.status === 404
  ) {
    navigate("/groups");
  }

  if (!groupChat) return null;

  return (
    <div className="md:min-w-[508px] h-[calc(100%-64px)] md:h-full w-full flex flex-col justify-between custom-chat-bg">
      <div className="h-16 flex-shrink-0 p-4 bg-base-200 border-b-2 border-base-300 flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link to={"/groups"}>
            <ArrowLeft className="hover:-translate-x-2 transition-transform" />
          </Link>
          <div>
            <h1 className="font-bold text-xl">{groupChat.groupName || ""}</h1>
          </div>
        </div>
        <Drawer
          triggerIcon={<Info size={28} />}
          drawerCloseCustomAction={() => setDrawerViewMode("info")}
        >
          {isLoggedUserGroupAdmin && (
            <button
              className="fixed top-2 right-2 transition-transform hover:scale-110 hover:rotate-45"
              onClick={toggleDrawerView}
            >
              <Settings size={28} />
            </button>
          )}
          {isLoggedUserGroupAdmin && (
            <ConfirmationDialog
              triggerButtonClasses="fixed top-10 right-2"
              triggerButtonBody={
                <Trash2
                  className="text-rose-500 hover:opacity-80 transition-opacity"
                  size={28}
                />
              }
              title="Delete group"
              body="Are you sure you want to delete this group?"
              actionButtonBody={"Delete"}
              action={() => {
                deleteGroupChatMutation.mutate({ groupId });
              }}
              isActionPending={deleteGroupChatMutation.isPending}
            />
          )}
          {drawerViewMode === "edit" ? (
            isLoggedUserGroupAdmin && (
              <UpdateGroupChat groupChat={groupChat} groupId={groupId} />
            )
          ) : (
            <GroupInfo
              groupChat={groupChat}
              isLoggedUserGroupAdmin={isLoggedUserGroupAdmin}
            />
          )}
        </Drawer>
      </div>
      <GroupMessages messages={groupChat.messages} />
      <GroupMessageInput groupId={groupId} />
    </div>
  );
}
