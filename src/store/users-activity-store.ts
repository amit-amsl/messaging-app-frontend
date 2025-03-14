/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";

type UserActivity = {
  userId: number;
  isOnline: boolean;
  isMessagesUnseen: boolean;
  unseenMessagesCount: number;
};

type UserActivityStore = {
  usersActivity: UserActivity[];
  setIsMessagesUnseenByUserId: (
    userId: number,
    messagesUnseenFlag: boolean
  ) => void;
  addNewOnlineUser: (userId: number) => void;
  removeDisconnectedUser: (userId: number) => void;
  setInitUserActivity: (onlineUserIds: number[]) => void;
};

export const useUsersActivityStore = create<UserActivityStore>((set) => ({
  usersActivity: [],
  setIsMessagesUnseenByUserId: (userId, messagesUnseenFlag) =>
    set((state) => ({
      usersActivity: state.usersActivity.map((userAct) => {
        if (userAct.userId === userId)
          return {
            ...userAct,
            isMessagesUnseen: messagesUnseenFlag,
            unseenMessagesCount: messagesUnseenFlag
              ? userAct.unseenMessagesCount + 1
              : 0,
          };
        return userAct;
      }),
    })),
  addNewOnlineUser: (userId) =>
    set((state) => ({
      usersActivity: [
        ...state.usersActivity,
        {
          userId: userId,
          isOnline: true,
          isMessagesUnseen: false,
          unseenMessagesCount: 0,
        },
      ],
    })),
  removeDisconnectedUser: (userId) =>
    set((state) => ({
      usersActivity: state.usersActivity.filter(
        (user) => user.userId !== userId
      ),
    })),
  setInitUserActivity: (onlineUserIds) =>
    set((_state) => ({
      usersActivity: onlineUserIds
        .map((id) => [
          {
            userId: id,
            isOnline: true,
            isMessagesUnseen: false,
            unseenMessagesCount: 0,
          },
        ])
        .flat(),
    })),
}));

export const isUserOnline = (usrId: number, usersActivity: UserActivity[]) => {
  return usersActivity.find((usr) => usr.userId === usrId)?.isOnline;
};

export const isUserHasUnseenMessages = (
  usrId: number,
  usersActivity: UserActivity[]
) => {
  const userAct = usersActivity.find((usr) => usr.userId === usrId);
  const isMessagesUnseen = userAct?.isMessagesUnseen;
  const unseenMessagesCount = userAct?.unseenMessagesCount;

  return { isMessagesUnseen, unseenMessagesCount };
};
