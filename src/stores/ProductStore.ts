import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export const productFormSchema = z.object({
    id: z.number().optional(),
    isActive: z.boolean().optional(),
    description: z.string().min(2, { message: "Esse campo deve ser preenchido." }),
    quantityInStock: z.coerce.number().optional(),
    purchasePrice: z.coerce.number().optional(),
    salePrice: z.coerce.number().positive({ message: "O preço de venda deve ser maior que zero." }),
    measures: z.string(),
    NCMcode: z.coerce.string().min(8, { message: "O código NCM deve conter 8 dígitos." }),
    CESTcode: z.coerce.string().optional(),
    barcode: z.string().optional(),
    productTax: z.string(),
});

export type ProductProps = z.infer<typeof productFormSchema>;

type ProductStoreProps = {
    products: ProductProps[],
    error: null | string | unknown,
    getProducts: () => void,
    addProduct: (product: Omit<ProductProps, "id" | "isActive">) => void,
    disableProduct: (product: ProductProps) => void,
    updateProduct: (product: Omit<ProductProps, "isActive">) => void,
};

export const useProductStore = create<ProductStoreProps>((set) => ({
    products: [],
    error: null,

    getProducts: async function getProducts() {
        try {
            const { data, error } = await supabase.from("products").select("*");

            if (error) {
                toast("Erro ao buscar produtos!");
                set({ error });
                return;
            }

            set({ products: data, error: null });
        } catch (err) {
            toast("Erro inesperado ao buscar produtos!");
            set({ error: err });
        }
    },

    addProduct: async (product) => {
        try {
            const { data, error } = await supabase
                .from("products")
                .insert([{ ...product, isActive: true }])
                .select()
                .single();

            if (error) {
                toast("Erro ao cadastrar produto!");
                set({ error });
                return;
            }

            set((state) => ({
                products: [...state.products, data],
                error: null,
            }));

            toast("Produto cadastrado!");
        } catch (error) {
            toast("Erro inesperado ao cadastrar produto!");
            set({ error });
        }
    },

    disableProduct: async (product) => {
        try {
            const { data, error } = await supabase
                .from("products")
                .update({ isActive: false })
                .eq("id", product.id)
                .select()
                .single();

            if (error) {
                toast("Erro ao desabilitar produto!");
                set({ error });
                return;
            }

            set((state) => ({
                products: state.products.map((p) =>
                    p.id === product.id ? data : p
                ),
                error: null,
            }));

            toast("Produto desabilitado!");
        } catch (error) {
            toast("Erro inesperado ao desabilitar produto!");
            set({ error });
        }
    },

    updateProduct: async (product) => {
        try {
            const { data, error } = await supabase
                .from("products")
                .update(product)
                .eq("id", product.id)
                .select()
                .single();

            if (error) {
                toast("Erro ao editar produto!");
                set({ error });
                return;
            }

            set((state) => ({
                products: state.products.map((p) => (p.id === product.id ? data : p)),
                error: null,
            }));

            toast("Produto editado!");
        } catch (error) {
            toast("Erro inesperado ao editar produto!");
            set({ error });
        }
    },
}));
