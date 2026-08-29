type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  getRowId: (row: T) => string;
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
};

export function DataTable<T>({
  columns,
  data,
  getRowId,
  actions,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center text-sm text-neutral-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-400 border-b border-neutral-100 bg-neutral-50">
            {columns.map((col, i) => (
              <th key={i} className={`font-medium py-3 px-4 ${col.className ?? ""}`}>
                {col.header}
              </th>
            ))}
            {actions && <th className="font-medium py-3 px-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={getRowId(row)} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50">
              {columns.map((col, i) => (
                <td key={i} className={`py-3 px-4 text-neutral-700 ${col.className ?? ""}`}>
                  {typeof col.accessor === "function"
                    ? col.accessor(row)
                    : String(row[col.accessor] ?? "")}
                </td>
              ))}
              {actions && (
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">{actions(row)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}