import { useEffect, useRef } from "react";

type ConfirmationDialogProps = {
  triggerButtonBody: React.ReactNode;
  triggerButtonClasses?: string;
  title: string;
  body: React.ReactNode;
  actionButtonBody: React.ReactNode;
  action: () => void;
  isActionPending: boolean;
};

export default function ConfirmationDialog({
  triggerButtonBody,
  triggerButtonClasses,
  title,
  body,
  actionButtonBody,
  action,
  isActionPending,
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isActionPending) {
      dialogRef.current?.close();
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
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{body}</p>
          <div className="modal-action">
            <div className="space-x-2">
              <button
                disabled={isActionPending}
                className="btn btn-error text-base-100"
                onClick={action}
              >
                {actionButtonBody}
                {isActionPending && (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
              <button
                disabled={isActionPending}
                className="btn"
                onClick={() => {
                  dialogRef.current?.close();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
