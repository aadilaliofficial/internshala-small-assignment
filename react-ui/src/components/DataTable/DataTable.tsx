import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortKey as keyof T];
      const valB = b[sortKey as keyof T];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortAsc]);

  function toggleRow(id: string | number) {
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelected(newSet);
    onRowSelect?.(data.filter(d => newSet.has(d.id)));
  }

  function handleSort(col: Column<T>) {
    if (!col.sortable) return;
    if (sortKey === col.key) setSortAsc(!sortAsc);
    else {
      setSortKey(col.key);
      setSortAsc(true);
    }
  }

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (data.length === 0) return <p className="p-4 text-center">No data</p>;

  return (
    <table className="min-w-full border border-gray-200 text-sm">
      <thead>
        <tr className="bg-gray-50">
          {selectable && <th className="p-2"></th>}
          {columns.map(col => {
            const thClass = [
              "p-2 text-left",
              col.sortable ? "cursor-pointer hover:underline" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <th key={col.key} className={thClass} onClick={() => handleSort(col)}>
                {col.title}
                {sortKey === col.key && (sortAsc ? " ↑" : " ↓")}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedData.map(row => (
          <tr key={row.id} className="border-t hover:bg-gray-50">
            {selectable && (
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => toggleRow(row.id)}
                />
              </td>
            )}
            {columns.map(col => (
              <td key={col.key} className="p-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
