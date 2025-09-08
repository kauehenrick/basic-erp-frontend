import { ColumnDef } from "@tanstack/react-table";
import type { InvoiceProps } from "@/stores/InvoiceStore";
import { useInvoiceTypeStore } from "@/stores/InvoiceTypeStore";

export const columns: ColumnDef<InvoiceProps>[] = [
	{
		accessorKey: "invoiceType",
		header: ({ column }) => (
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Operação
			</p>
		),
		cell: ({ row }) => {
			const { invoiceTypes } = useInvoiceTypeStore.getState();
			const invoiceType = invoiceTypes.find(
				(it) => it.id === row.original.invoiceType,
			);
			return <p>{invoiceType?.name || "Não definido"}</p>;
		},
	},
	{
		accessorKey: "client",
		header: ({ column }) => (
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Cliente
			</p>
		),
		cell: ({ row }) => {
			const client = row.original.client;
			return <p>{client?.name || "Sem cliente"}</p>;
		},
	},
];
