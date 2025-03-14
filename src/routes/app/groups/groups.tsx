import GroupsList from "@/features/groups/components/groups-list";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router";

export default function GroupsRoute() {
  const location = useLocation();

  const isOutletView = location.pathname !== "/groups";

  return (
    <div className="flex h-dvh w-full">
      <div
        className={clsx(
          "h-[calc(100%-64px)] w-full border-r-2 border-base-300 md:flex md:flex-col md:h-full md:max-w-sm",
          { hidden: isOutletView }
        )}
      >
        <div className="p-4 h-16 bg-base-200 border-b-2 border-base-300 flex items-center justify-between animate-in duration-1000 fill-mode-both slide-in-from-top-full">
          <div className="flex gap-2 justify-center items-center">
            <h1 className="font-bold text-xl">Groups</h1>
          </div>
          <NavLink
            className={({ isActive }) =>
              clsx(
                "btn btn-outline border-0 btn-square",
                isActive ? "bg-neutral text-white" : ""
              )
            }
            to={"create"}
          >
            <Plus size={28} />
          </NavLink>
        </div>

        <GroupsList />
      </div>
      {isOutletView ? (
        <Outlet />
      ) : (
        <div className="hidden md:flex p-4 w-full justify-center items-center mx-auto custom-chat-bg">
          <div className="max-w-4xl ">
            <p className="text-6xl font-bold [text-shadow:_2px_4px_20px_rgb(61_57_57_/_40%)]">
              Select a group on the sidebar and start chit chatting.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
