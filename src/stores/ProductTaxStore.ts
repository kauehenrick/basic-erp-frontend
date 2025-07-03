import { toast } from "sonner";
import { create } from "zustand";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export const productTaxFormSchema = z.object({
  id: z.number().optional(),
  isActive: z.boolean().optional(),
  name: z.string().min(2, { message: "O nome deve conter pelo menos 2 caracteres." }),
});

export type ProductTaxProps = z.infer<typeof productTaxFormSchema>;

type ProductTaxStoreProps = {
  productTaxes: ProductTaxProps[],
  error: null | string | unknown,
  getProductTaxes: () => void,
  addProductTax: (tax: Omit<ProductTaxProps, "id" | "isActive">) => void,
  disableProductTax: (tax: ProductTaxProps) => void,
  updateProductTax: (tax: Omit<ProductTaxProps, "isActive">) => void,
};

export const useProductTaxStore = create<ProductTaxStoreProps>((set) => ({
  productTaxes: [],
  error: null,

  getProductTaxes: async function getProductTaxes() {
    try {
      const { data, error } = await supabase.from("productTaxes").select("*");

      if (error) {
        toast("Erro ao buscar tributações!");
        set({ error });
        return;
      }

      set({ productTaxes: data, error: null });
    } catch (err) {
      toast("Erro inesperado ao buscar tributações!");
      set({ error: err });
    }
  },

  addProductTax: async (tax) => {
    try {
      const { data, error } = await supabase
        .from("productTaxes")
        .insert([{ ...tax, isActive: true }])
        .select()
        .single();

      if (error) {
        toast("Erro ao cadastrar tributação!");
        set({ error });
        return;
      }

      set((state) => ({
        productTaxes: [...state.productTaxes, data],
        error: null,
      }));

      toast("Tributação cadastrada!");
    } catch (error) {
      toast("Erro inesperado ao cadastrar tributação!");
      set({ error });
    }
  },

  disableProductTax: async (tax) => {
    try {
      const { data, error } = await supabase
        .from("productTaxes")
        .update({ isActive: false })
        .eq("id", tax.id)
        .select()
        .single();

      if (error) {
        toast("Erro ao desabilitar tributação!");
        set({ error });
        return;
      }

      set((state) => ({
        productTaxes: state.productTaxes.map((t) =>
          t.id === tax.id ? data : t
        ),
        error: null,
      }));

      toast("Tributação desabilitada!");
    } catch (error) {
      toast("Erro inesperado ao desabilitar tributação!");
      set({ error });
    }
  },

  updateProductTax: async (tax) => {
    try {
      const { data, error } = await supabase
        .from("productTaxes")
        .update(tax)
        .eq("id", tax.id)
        .select()
        .single();

      if (error) {
        toast("Erro ao editar tributação!");
        set({ error });
        return;
      }

      set((state) => ({
        productTaxes: state.productTaxes.map((t) =>
          t.id === tax.id ? data : t
        ),
        error: null,
      }));

      toast("Tributação editada!");
    } catch (error) {
      toast("Erro inesperado ao editar tributação!");
      set({ error });
    }
  },
}));
