"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { FiX } from "react-icons/fi";
import RequestForm from "@/components/RequestForm/RequestForm";
import styles from "./RequestModal.module.css";

type ModalState = "closed" | "opening" | "open" | "closing";

type RequestModalContextValue = {
  openRequestModal: () => void;
};

const RequestModalContext =
  createContext<RequestModalContextValue | null>(null);

export default function RequestModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [modalState, setModalState] = useState<ModalState>("closed");

  const isVisible = modalState === "opening" || modalState === "open";

  const openRequestModal = useCallback(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setModalState("opening");
  }, []);

  const closeRequestModal = useCallback(() => {
    if (modalState !== "closed" && modalState !== "closing") {
      setModalState("closing");
    }
  }, [modalState]);

  useEffect(() => {
    if (modalState === "closed") {
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeRequestModal();
      }

      if (event.key !== "Tab" || !modalRef.current || !isVisible) {
        return;
      }

      const focusableElements =
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      if (focusableElements.length === 0) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeRequestModal, isVisible, modalState]);

  useEffect(() => {
    if (modalState !== "opening") {
      return;
    }

    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [modalState]);

  return (
    <RequestModalContext.Provider value={{ openRequestModal }}>
      {children}

      <div
        className={styles.backdrop}
        data-state={modalState}
        aria-hidden={!isVisible}
      >
        <div
          ref={modalRef}
          className={styles.modal}
          data-state={modalState}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          onAnimationEnd={(event) => {
            if (event.target !== event.currentTarget) {
              return;
            }

            if (
              modalState === "opening" &&
              event.animationName.includes("modalEnter")
            ) {
              setModalState("open");
              return;
            }

            if (
              modalState === "closing" &&
              event.animationName.includes("modalExit")
            ) {
              setModalState("closed");

              if (previousFocusRef.current?.isConnected) {
                previousFocusRef.current.focus();
              }
            }
          }}
        >
          <header className={styles.modalHeader}>
            <h2 id={titleId} className={styles.title}>
              Leave a request
            </h2>

            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={closeRequestModal}
              aria-label="Close modal"
              tabIndex={isVisible ? 0 : -1}
            >
              <FiX size={24} strokeWidth={1.75} />
            </button>
          </header>

          <div className={styles.content}>
            {modalState !== "closed" && (
              <RequestForm variant="modal" isInteractive={isVisible} />
            )}
          </div>
        </div>
      </div>
    </RequestModalContext.Provider>
  );
}

export function useRequestModal() {
  const context = useContext(RequestModalContext);

  if (!context) {
    throw new Error(
      "useRequestModal must be used inside RequestModalProvider",
    );
  }

  return context;
}
