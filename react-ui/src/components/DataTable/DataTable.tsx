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

  if (loading) return <p className="p-4 text-center text-neon-green">Loading...</p>;
  if (data.length === 0) return <p className="p-4 text-center text-neon-pink">No data</p>;

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full border border-neon-blue text-sm bg-black text-gray-200 shadow-neon">
        <thead>
          <tr className="bg-black text-neon-pink">
            {selectable && <th className="p-3"></th>}
            {columns.map(col => {
              const thClass = [
                "p-3 text-left font-semibold",
                col.sortable
                  ? "cursor-pointer hover:text-neon-green transition duration-200"
                  : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <th key={col.key} className={thClass} onClick={() => handleSort(col)}>
                  {col.title}
                  {sortKey === col.key && (
                    <span className="ml-1 text-neon-blue">
                      {sortAsc ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map(row => (
            <tr
              key={row.id}
              className="border-t border-gray-700 hover:bg-neon-dark hover:text-white transition"
            >
              {selectable && (
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    className="accent-neon-pink"
                  />
                </td>
              )}
              {columns.map(col => (
                <td key={col.key} className="p-3">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
