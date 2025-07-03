import { useProductStore } from "@/stores/ProductStore";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductsDataTable() {
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const activeProduct = products.filter(product => product.isActive);

  return (
    <div className="container mt-4 mx-auto">
      <DataTable columns={columns} data={activeProduct} />
    </div>
  )
}