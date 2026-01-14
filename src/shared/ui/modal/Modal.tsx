import React from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

type ModalSize = "sm" | "md" | "lg";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: ModalSize;
  footer?: React.ReactNode;
  closeOnOverlay?: boolean;
};

const sizeCls: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
};

function useLockBody(open: boolean) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  footer,
  closeOnOverlay = true,
}: ModalProps) {
  useLockBody(open);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[999]">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => closeOnOverlay && onClose()}
      />

      {/* panel */}
      <div className="absolute inset-0 flex items-start justify-center p-4 sm:items-center">
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "w-full overflow-hidden rounded-3xl border shadow-2xl",
            "border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text))]",
            sizeCls[size]
          )}
        >
          {/* header */}
          <div className="flex items-start justify-between gap-3 border-b border-[rgb(var(--border))] px-5 py-4">
            <div>
              {title ? <h3 className="text-sm font-semibold">{title}</h3> : null}
              {description ? (
                <p className="mt-1 text-xs text-[rgb(var(--muted))]">{description}</p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-[rgb(var(--surface-2))]"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* content */}
          <div className="px-5 py-4">{children}</div>

          {/* footer */}
          {footer ? (
            <div className="flex items-center justify-end gap-2 border-t border-[rgb(var(--border))] px-5 py-4">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
