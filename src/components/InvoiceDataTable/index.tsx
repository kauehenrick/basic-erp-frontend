import { useInvoiceStore } from "@/stores/InvoiceStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function InvoiceDataTable() {
	const { invoices } = useInvoiceStore();

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={invoices} />
		</div>
	);
}
