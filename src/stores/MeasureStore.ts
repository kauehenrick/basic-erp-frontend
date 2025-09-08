import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const measureFormSchema = z.object({
	id: z.number().optional(),
	isActive: z.boolean().optional(),
	name: z
		.string()
		.min(2, { message: "O nome deve conter pelo menos 2 caracteres." }),
	abbreviation: z
		.string()
		.min(1, { message: "A sigla deve conter pelo menos 1 caractere." }),
});

export type MeasureProps = z.infer<typeof measureFormSchema>;

type MeasureStoreProps = {
	measures: MeasureProps[];
	error: null | string | unknown;
	getMeasures: () => void;
	addMeasure: (measure: Omit<MeasureProps, "id" | "isActive">) => void;
	disableMeasure: (measure: MeasureProps) => void;
	updateMeasure: (measure: Omit<MeasureProps, "isActive">) => void;
};

export const useMeasureStore = create<MeasureStoreProps>((set) => ({
	measures: [],
	error: null,

	getMeasures: async function getMeasures() {
		try {
			const { data, error } = await supabase.from("measures").select("*");

			if (error) {
				toast("Erro ao buscar unidades de medida!");
				set({ error });
				return;
			}

			set({ measures: data, error: null });
		} catch (err) {
			toast("Erro inesperado ao buscar unidades!");
			set({ error: err });
		}
	},

	addMeasure: async (measure) => {
		try {
			const { data, error } = await supabase
				.from("measures")
				.insert([{ ...measure, isActive: true }])
				.select()
				.single();

			if (error) {
				toast("Erro ao cadastrar unidade!");
				set({ error });
				return;
			}

			set((state) => ({
				measures: [...state.measures, data],
				error: null,
			}));

			toast("Unidade cadastrada!");
		} catch (error) {
			toast("Erro inesperado ao cadastrar unidade!");
			set({ error });
		}
	},

	disableMeasure: async (measure) => {
		try {
			const { data, error } = await supabase
				.from("measures")
				.update({ isActive: false })
				.eq("id", measure.id)
				.select()
				.single();

			if (error) {
				toast("Erro ao desabilitar unidade!");
				set({ error });
				return;
			}

			set((state) => ({
				measures: state.measures.map((m) => (m.id === measure.id ? data : m)),
				error: null,
			}));

			toast("Unidade desabilitada!");
		} catch (error) {
			toast("Erro inesperado ao desabilitar unidade!");
			set({ error });
		}
	},

	updateMeasure: async (measure) => {
		try {
			const { data, error } = await supabase
				.from("measures")
				.update(measure)
				.eq("id", measure.id)
				.select()
				.single();

			if (error) {
				toast("Erro ao editar unidade!");
				set({ error });
				return;
			}

			set((state) => ({
				measures: state.measures.map((m) => (m.id === measure.id ? data : m)),
				error: null,
			}));

			toast("Unidade editada!");
		} catch (error) {
			toast("Erro inesperado ao editar unidade!");
			set({ error });
		}
	},
}));
