import { useLogout, useUser } from "@/lib/auth";
import clsx from "clsx";
import {
  CircleUserRound,
  UsersRound,
  MessagesSquare,
  CirclePower,
} from "lucide-react";
import { NavLink } from "react-router";

const links = [
  {
    id: 1,
    href: "/profile",
    name: "Profile",
    icon: CircleUserRound,
  },
  {
    id: 2,
    href: "/chats",
    name: "Chats",
    icon: MessagesSquare,
  },
  {
    id: 3,
    href: "/groups",
    name: "Groups",
    icon: UsersRound,
  },
];

export default function MobileBottomNav() {
  const user = useUser();
  const logout = useLogout();

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-base-200 border-t border-base-300 animate-in duration-700 slide-in-from-bottom-full">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {links.map((link) => (
          <NavLink
            to={
              link.href === "/profile"
                ? `/profile/${user.data?.userId}`
                : link.href
            }
            key={link.id}
            className={({ isActive }) =>
              clsx(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-base-100 transition-all group",
                isActive
                  ? "bg-base-100 text-base-content link-active"
                  : "hover:bg-base-300"
              )
            }
          >
            <link.icon
              size={24}
              className="text-base-content/50 group-[.link-active]:text-base-content group-hover:text-base-content"
            />
            <span className="text-sm text-base-content/50 group-[.link-active]:text-base-content group-hover:text-base-content">
              {link.name}
            </span>
          </NavLink>
        ))}
        <button
          onClick={() => logout.mutate({})}
          className="inline-flex flex-col items-center cursor-pointer justify-center sm:px-5 hover:bg-base-300 transition-all group"
        >
          <CirclePower
            size={24}
            className="text-base-content/50 group-hover:text-base-content"
          />
          <span className="text-sm text-base-content/50 group-hover:text-base-content">
            Log-out
          </span>
        </button>
      </div>
    </div>
  );
}
