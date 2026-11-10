import { cn } from "../../utils/cn";
import EmptyState from "./EmptyState";
import { FiInbox } from "react-icons/fi";

// Generic, dependency-free data table. `columns`: [{ key, header, render?, className? }]
export default function DataTable({ columns, rows, rowKey = "id", onRowClick, emptyLabel = "No records found" }) {
  if (!rows.length) {
    return <EmptyState icon={FiInbox} title={emptyLabel} className="mt-2" />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-navy-50/50">
            {columns.map((col) => (
              <th key={col.key} className={cn("whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[rowKey]}
              onClick={() => onRowClick?.(row)}
              className={cn("border-b border-line last:border-0", onRowClick && "cursor-pointer hover:bg-navy-50/40")}
            >
              {columns.map((col) => (
                <td key={col.key} className={cn("whitespace-nowrap px-4 py-3.5 text-slate-700", col.className)}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
