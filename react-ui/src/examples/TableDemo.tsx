import { DataTable } from "../components/DataTable/DataTable";
import type { Column } from "../components/DataTable/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const users: User[] = [
  { id: 1, name: "Ali", age: 24 },
  { id: 2, name: "Sara", age: 21 },
  { id: 3, name: "John", age: 30 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export default function TableDemo() {
  return (
    <div className="p-4">
      <DataTable<User> data={users} columns={columns} selectable />
    </div>
  );
}
