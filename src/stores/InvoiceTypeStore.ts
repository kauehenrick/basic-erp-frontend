import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const invoiceTypeFormSchema = z.object({
	id: z.number().optional(),
	isActive: z.boolean().optional(),
	name: z
		.string()
		.min(2, { message: "O nome deve conter pelo menos 2 caracteres." }),
});

export type InvoiceTypeProps = z.infer<typeof invoiceTypeFormSchema>;

type InvoiceTypeStoreProps = {
	invoiceTypes: InvoiceTypeProps[];
	error: null | string | unknown;
	getInvoiceTypes: () => void;
	addInvoiceType: (type: Omit<InvoiceTypeProps, "id" | "isActive">) => void;
	disableInvoiceType: (type: InvoiceTypeProps) => void;
	updateInvoiceType: (type: Omit<InvoiceTypeProps, "isActive">) => void;
};

export const useInvoiceTypeStore = create<InvoiceTypeStoreProps>((set) => ({
	invoiceTypes: [],
	error: null,

	getInvoiceTypes: async function getInvoiceTypes() {
		try {
			const { data, error } = await supabase.from("invoiceTypes").select("*");

			if (error) {
				toast("Erro ao buscar tipos de nota!");
				set({ error });
				return;
			}

			set({ invoiceTypes: data, error: null });
		} catch (err) {
			toast("Erro inesperado ao buscar tipos de nota!");
			set({ error: err });
		}
	},

	addInvoiceType: async (type) => {
		try {
			const { data, error } = await supabase
				.from("invoiceTypes")
				.insert([{ ...type, isActive: true }])
				.select()
				.single();

			if (error) {
				toast("Erro ao cadastrar tipo de nota!");
				set({ error });
				return;
			}

			set((state) => ({
				invoiceTypes: [...state.invoiceTypes, data],
				error: null,
			}));

			toast("Tipo de nota cadastrado!");
		} catch (error) {
			toast("Erro inesperado ao cadastrar tipo de nota!");
			set({ error });
		}
	},

	disableInvoiceType: async (type) => {
		try {
			const { data, error } = await supabase
				.from("invoiceTypes")
				.update({ isActive: false })
				.eq("id", type.id)
				.select()
				.single();

			if (error) {
				toast("Erro ao desabilitar tipo de nota!");
				set({ error });
				return;
			}

			set((state) => ({
				invoiceTypes: state.invoiceTypes.map((t) =>
					t.id === type.id ? data : t,
				),
				error: null,
			}));

			toast("Tipo de nota desabilitado!");
		} catch (error) {
			toast("Erro inesperado ao desabilitar tipo de nota!");
			set({ error });
		}
	},

	updateInvoiceType: async (type) => {
		try {
			const { data, error } = await supabase
				.from("invoiceTypes")
				.update(type)
				.eq("id", type.id)
				.select()
				.single();

			if (error) {
				toast("Erro ao editar tipo de nota!");
				set({ error });
				return;
			}

			set((state) => ({
				invoiceTypes: state.invoiceTypes.map((t) =>
					t.id === type.id ? data : t,
				),
				error: null,
			}));

			toast("Tipo de nota editado!");
		} catch (error) {
			toast("Erro inesperado ao editar tipo de nota!");
			set({ error });
		}
	},
}));
