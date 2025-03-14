import { useLogout, useUser } from "@/lib/auth";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import {
  CirclePower,
  CircleUserRound,
  Leaf,
  MessagesSquare,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router";
import ThemeSwitcher from "./theme-switcher";

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

export default function Sidebar() {
  const { connected } = useAuthenticatedSocket();
  const user = useUser();
  const logout = useLogout();

  return (
    <div className="hidden p-4 border-r-2 border-base-300 bg-base-200 md:flex flex-col justify-between animate-in duration-700 fill-mode-both slide-in-from-left-full">
      <div className="flex flex-col gap-6 justify-center items-center">
        <NavLink
          className={({ isActive }) =>
            isActive ? "" : "opacity-60 hover:opacity-100 transition-opacity"
          }
          to={"/"}
        >
          <Leaf size={32} className={` ${connected && "text-emerald-500"}`} />
        </NavLink>
        {links.map((link) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? "" : "opacity-60 hover:opacity-100 transition-opacity"
            }
            to={
              link.href === "/profile"
                ? `/profile/${user.data?.userId}`
                : link.href
            }
            key={link.id}
          >
            <link.icon size={32} />
          </NavLink>
        ))}
      </div>

      <div className="flex flex-col gap-4 justify-center items-center">
        <ThemeSwitcher />
        <div onClick={() => logout.mutate({})}>
          <CirclePower
            size={32}
            className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
