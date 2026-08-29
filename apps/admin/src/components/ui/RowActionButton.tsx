import type { LucideIcon } from "lucide-react";

export const RowActionButton = ({
  icon: Icon,
  onClick,
  variant = "default",
  title,
}: {
  icon: LucideIcon;
  onClick: () => void;
  variant?: "default" | "danger";
  title?: string;
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded-lg transition-colors ${
      variant === "danger"
        ? "text-neutral-400 hover:text-red-600 hover:bg-red-50"
        : "text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100"
    }`}
  >
    <Icon size={16} />
  </button>
);