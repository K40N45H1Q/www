"use client";

import { useRequestModal } from "@/components/RequestModal/RequestModal";

type RequestButtonProps = {
  children: React.ReactNode;
  className: string;
};

export default function RequestButton({
  children,
  className,
}: RequestButtonProps) {
  const { openRequestModal } = useRequestModal();

  return (
    <button
      type="button"
      className={className}
      onClick={openRequestModal}
    >
      {children}
    </button>
  );
}
