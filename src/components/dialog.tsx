import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type DialogProps = {
  triggerButtonBody: React.ReactNode;
  triggerButtonClasses?: string;
  title: string;
  isActionPending?: boolean;
  children: React.ReactNode;
};

export default function Dialog({
  triggerButtonBody,
  triggerButtonClasses,
  title,
  isActionPending,
  children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isActionPending) {
      //dialogRef.current?.close();
      window.location.reload();
    }
  }, [isActionPending]);

  return (
    <>
      <button
        className={triggerButtonClasses}
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        {triggerButtonBody}
      </button>
      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box">
          <button
            className="fixed top-2 right-2 hover:scale-90 transition-all"
            disabled={isActionPending}
            onClick={() => {
              dialogRef.current?.close();
            }}
          >
            <X />
          </button>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4">{children}</div>
        </div>
      </dialog>
    </>
  );
}
