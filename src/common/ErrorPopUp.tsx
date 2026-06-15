import { useEffect, useId, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { CloseOutlined } from "@ant-design/icons"; 
import failIcon from "../assets/images/fail_icon.webp";
import { NoWifiIcon } from "./ErrorPopUpIcons";

type ErrorPopUpProps = {
  error?: {
    code: string;
    message: string;
  } | null;
  disableBackdropClose?: boolean;
  onClose?: () => void;
};

const modalCloseButtonFill =
  "linear-gradient(249.27deg, #F9995D 2.18%, #D8611A 21.56%, #EF7D38 74.47%, #F9995D 100.43%)";
const modalCloseButtonBorder =
  "linear-gradient(190.74deg, #FE554E -4.3%, #F8CD29 92.03%)";

// Hook to detect online/offline status
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

export function ErrorPopUp({
  error,
  disableBackdropClose = false,
  onClose,
}: ErrorPopUpProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (error) setOpen(true);
    else setOpen(false);
  }, [error]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!disableBackdropClose && event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, disableBackdropClose, handleClose]);

  if (!open) return null;

  const isNetworkError = error?.code === "No Internet" || !isOnline;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
    >
      {!disableBackdropClose ? (
        <button
          type="button"
          className="absolute inset-0 bg-black/55"
          aria-label="Close dialog"
          onClick={handleClose}
        />
      ) : (
        <div className="absolute inset-0 bg-black/55" aria-hidden />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex flex-col items-center gap-2 px-6 pb-6 pt-8 w-[320px] text-center rounded-2xl border-2 border-[#a74000] bg-[#fff3db] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute top-2 right-2 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1.21px] border-transparent text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
          style={{
            background: `${modalCloseButtonFill} padding-box, ${modalCloseButtonBorder} border-box`,
            backgroundClip: "padding-box, border-box",
            WebkitBackgroundClip: "padding-box, border-box",
            backgroundOrigin: "padding-box, border-box",
          }}
        >
          <CloseOutlined className="text-white text-sm" />
        </button>

        {isNetworkError ? (
          <NoWifiIcon className="max-h-[120px] w-full max-w-[155px]" />
        ) : (
          <img
            src={failIcon}
            alt="Error"
            className="max-w-[155px] object-contain"
          />
        )}

        <h2
          id={titleId}
          className="text-[#E8913A] text-xl font-extrabold mb-3 uppercase drop-shadow-[1px_1px_0px_rgba(255,255,255,0.5)]"
        >
          {error?.code ?? "—"}
        </h2>

        <p className="text-[#C47A2E] text-sm font-semibold mb-6 leading-[1.4] drop-shadow-[0.5px_0.5px_0px_rgba(255,255,255,0.3)] whitespace-pre-line">
          {error?.message ?? "No error message provided"}
        </p>
      </div>
    </div>,
    document.body,
  );
}

export default ErrorPopUp;
