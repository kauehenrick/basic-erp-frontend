import { usePersonStore } from "@/stores/PersonStore";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function PersonDataTable() {
  const { people, getPeople } = usePersonStore();

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  const activePeople = people.filter(person => person.isActive);

  return (
    <div className="container mt-4 mx-auto">
      <DataTable columns={columns} data={activePeople} />
    </div>
  )
}
