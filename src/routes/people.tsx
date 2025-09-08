import AddPerson from "@/components/AddPerson";
import Header from "@/components/Header";
import PersonDataTable from "@/components/PersonDataTable";
import Sidebar from "@/components/Sidebar";

import { Button } from "@/components/ui/button";

export default function People() {
	return (
		<div className="flex">
			<Sidebar />

			<div className="flex flex-col w-full">
				<Header pageName="Pessoas" />

				<main className="w-full px-6">
					<div className="mt-4 space-x-2">
						<AddPerson />
						<Button>Exportar</Button>
					</div>
					<PersonDataTable />
				</main>
			</div>
		</div>
	);
}
