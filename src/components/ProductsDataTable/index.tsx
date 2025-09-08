import { useEffect } from "react";
import { useProductStore } from "@/stores/ProductStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductsDataTable() {
	const { products, getProducts } = useProductStore();

	useEffect(() => {
		getProducts();
	}, [getProducts]);

	const activeProduct = products.filter((product) => product.isActive);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={activeProduct} />
		</div>
	);
}
