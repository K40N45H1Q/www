"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
} from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Dropdown.module.css";

export type DropdownItem = {
  href?: string;
  label: string;
  value?: string;
};

type DropdownProps = {
  defaultValue?: string;
  disabled?: boolean;
  items: DropdownItem[];
  label: string;
  name?: string;
  onNavigate?: (item: DropdownItem) => void;
  onOpenChange?: (isOpen: boolean) => void;
  onValueChange?: (value: string, item: DropdownItem) => void;
  placeholder?: string;
  required?: boolean;
  tabIndex?: number;
  value?: string;
  variant?: "navigation" | "form";
};

export default function Dropdown({
  defaultValue = "",
  disabled = false,
  items,
  label,
  name,
  onNavigate,
  onOpenChange,
  onValueChange,
  placeholder = label,
  required = false,
  tabIndex,
  value,
  variant = "navigation",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const selectedValue = value ?? internalValue;
  const selectedItem = items.find(
    (item) => (item.value ?? item.href ?? item.label) === selectedValue,
  );
  const triggerLabel =
    variant === "form" ? selectedItem?.label ?? placeholder : label;

  function changeOpenState(nextState: boolean) {
    if (disabled) {
      return;
    }

    setIsOpen(nextState);
    onOpenChange?.(nextState);
  }

  function closeDropdown() {
    changeOpenState(false);
  }

  function toggleDropdown() {
    changeOpenState(!isOpen);
  }

  function handleSelect(item: DropdownItem) {
    const nextValue = item.value ?? item.href ?? item.label;

    setInternalValue(nextValue);
    onValueChange?.(nextValue, item);
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
  });

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${
        variant === "form" ? styles.formDropdown : styles.navigationDropdown
      }`}
      onBlurCapture={handleBlur}
    >
      {name && (
        <input type="hidden" name={name} value={selectedValue} />
      )}

      <button
        type="button"
        className={styles.trigger}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="listbox"
        disabled={disabled}
        data-invalid={required && selectedValue.length === 0}
        tabIndex={tabIndex}
      >
        <span>{triggerLabel}</span>
        <FiChevronDown aria-hidden="true" />
      </button>

      <div
        id={panelId}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.panelClip}>
          <div className={styles.panelContent}>
            <ul className={styles.list} role="listbox" aria-label={label}>
              {items.map((item) => {
                const itemValue = item.value ?? item.href ?? item.label;
                const isSelected = itemValue === selectedValue;

                return (
                  <li key={itemValue} role="presentation">
                    {item.href && variant === "navigation" ? (
                      <Link
                        href={item.href}
                        className={styles.option}
                        onClick={() => handleSelect(item)}
                        tabIndex={isOpen ? tabIndex : -1}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={`${styles.option} ${
                          isSelected ? styles.optionSelected : ""
                        }`}
                        onClick={() => handleSelect(item)}
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={isOpen ? tabIndex : -1}
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
