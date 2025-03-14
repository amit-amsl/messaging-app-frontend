import clsx from "clsx";
import { X } from "lucide-react";
import { useState } from "react";

type DrawerProps = {
  children: React.ReactNode;
  triggerIcon: React.ReactNode;
  drawerCloseCustomAction?: () => void;
};

export default function Drawer({
  children,
  triggerIcon,
  drawerCloseCustomAction,
}: DrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    if (drawerCloseCustomAction) drawerCloseCustomAction();
  };

  return (
    <>
      <button className="btn btm-nav-xs" onClick={() => setIsDrawerOpen(true)}>
        {triggerIcon}
      </button>
      <DrawerOverlay
        drawerCloseAction={closeDrawer}
        isDrawerOpen={isDrawerOpen}
      />
      <div
        className={clsx(
          `fixed top-0 right-0 p-4 z-50 w-80 md:w-96 h-[calc(100%-64px)] md:h-full bg-base-200 shadow-lg
                transition-transform transform`,
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          className="fixed top-2 left-2 transition-transform hover:scale-110 hover:rotate-90"
          onClick={closeDrawer}
        >
          <X size={28} />
        </button>
        {children}
      </div>
    </>
  );
}

type DrawerOverlayProps = {
  drawerCloseAction: () => void;
  isDrawerOpen: boolean;
};
function DrawerOverlay({
  drawerCloseAction,
  isDrawerOpen,
}: DrawerOverlayProps) {
  return (
    <div
      className={clsx(
        "bg-black/20 min-h-screen backdrop-blur-sm w-screen z-50 absolute top-0 left-0 transition-all",
        !isDrawerOpen && "hidden"
      )}
      onClick={drawerCloseAction}
    ></div>
  );
}
