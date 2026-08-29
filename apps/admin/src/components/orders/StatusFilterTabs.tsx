import type { OrderStatus } from "./mockData";

type FilterValue = OrderStatus | "All";

const FILTERS: FilterValue[] = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export const StatusFilterTabs = ({
  active,
  onChange,
}: {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}) => (
  <div className="flex gap-2">
    {FILTERS.map((filter) => (
      <button
        key={filter}
        onClick={() => onChange(filter)}
        className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          active === filter
            ? "bg-neutral-900 text-white"
            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
        }`}
      >
        {filter}
      </button>
    ))}
  </div>
);

export type { FilterValue };