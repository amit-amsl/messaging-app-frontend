import clsx from "clsx";
import { GroupConversation } from "@/types/api";
import { useUpdateGroupChatAdmins } from "../api/update-group-chat-admins";
import { useLeaveGroupChat } from "../api/leave-group-chat";
import { useUser } from "@/lib/auth";
import {
  isUserOnline,
  useUsersActivityStore,
} from "@/store/users-activity-store";

type GroupInfoProps = {
  groupChat: GroupConversation;
  isLoggedUserGroupAdmin: boolean;
};

export default function GroupInfo({
  groupChat,
  isLoggedUserGroupAdmin,
}: GroupInfoProps) {
  const user = useUser();
  const { usersActivity } = useUsersActivityStore();

  const updateGroupChatAdminsMutation = useUpdateGroupChatAdmins();

  const leaveGroupChatMutation = useLeaveGroupChat();

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex flex-col gap-1 justify-center items-center mt-12">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-12 md:w-20 md:text-2xl rounded-full">
            <span>{groupChat.groupName.slice(0, 2).toUpperCase()}</span>
          </div>
        </div>
        <p className="font-bold md:text-2xl">{groupChat.groupName || ""}</p>
        <p className="text-xs md:text-base">
          Group | {groupChat.users.length} members
        </p>
      </div>
      <ul className="menu menu-xs md:menu-md flex-nowrap mt-4 overflow-y-auto h-[65%] bg-base-200">
        {groupChat.users.map((gUser) => (
          <li key={gUser.id} className="text-4xl group">
            <a className="space-x-2">
              <div
                className={clsx(
                  "avatar",
                  !gUser.profile_img_url && "placeholder",
                  isUserOnline(gUser.id, usersActivity) ||
                    gUser.id === user.data?.userId
                    ? "online"
                    : "offline"
                )}
              >
                <div className="bg-neutral text-neutral-content w-10 md:w-12 rounded-full">
                  {gUser.profile_img_url ? (
                    <img src={gUser.profile_img_url} />
                  ) : (
                    <span>{gUser.username.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
              </div>
              <span
                className={clsx(
                  "md:text-lg",
                  gUser.id === user.data?.userId && "font-bold"
                )}
              >
                {gUser.id === user.data?.userId ? "You" : gUser.username}
              </span>
              {isLoggedUserGroupAdmin && !(gUser.id === user.data?.userId) && (
                <button
                  className="hidden link link-primary link-hover group-hover:block"
                  onClick={() => {
                    updateGroupChatAdminsMutation.mutate({
                      groupId: groupChat.groupId,
                      userId: gUser.id,
                    });
                  }}
                >
                  {gUser.isAdmin ? "remove" : "assign"} admin
                </button>
              )}
              {gUser.isAdmin && (
                <div className="badge badge-primary">Admin</div>
              )}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-outline btn-error btn-sm md:btn-md"
        onClick={() => {
          if (user.data)
            leaveGroupChatMutation.mutate({
              groupId: groupChat.groupId,
              userId: user.data?.userId,
            });
        }}
      >
        Leave group
      </button>
    </div>
  );
}
