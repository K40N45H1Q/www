"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
} from "react";
import styles from "./Dropdown.module.css";

export type DropdownItem = {
  label: string;
  href: string;
};

type DropdownProps = {
  label: string;
  items: DropdownItem[];
  onNavigate?: (item: DropdownItem) => void;
  onOpenChange?: (isOpen: boolean) => void;
};

export default function Dropdown({
  label,
  items,
  onNavigate,
  onOpenChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  function changeOpenState(nextState: boolean) {
    setIsOpen(nextState);
    onOpenChange?.(nextState);
  }

  function closeDropdown() {
    changeOpenState(false);
  }

  function toggleDropdown() {
    changeOpenState(!isOpen);
  }

  function handleNavigate(item: DropdownItem) {
    onNavigate?.(item);
    closeDropdown();
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const nextElement = event.relatedTarget;

    if (
      nextElement instanceof Node &&
      dropdownRef.current?.contains(nextElement)
    ) {
      return;
    }

    closeDropdown();
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (
        target instanceof Node &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        closeDropdown();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDropdown();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={styles.dropdown}
      onBlurCapture={handleBlur}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="true"
      >
        {label}
      </button>

      <div
        id={panelId}
        className={`${styles.panel} ${
          isOpen ? styles.panelOpen : ""
        }`}
        aria-hidden={!isOpen}
      >
        <div className={styles.panelClip}>
          <div className={styles.panelContent}>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.link}
                    onClick={() => handleNavigate(item)}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}