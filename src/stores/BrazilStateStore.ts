import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { create } from "zustand";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);

type BrazilStateProps = {
	nome: string;
	sigla: string;
};

type BrazilStateStoreProps = {
	brazilStates: BrazilStateProps[];
	error: null | string | unknown;
	getBrazilStates: () => void;
};

export const useBrazilStateStore = create<BrazilStateStoreProps>((set) => ({
	brazilStates: [],
	error: null,

	getBrazilStates: async function getBrazilStates() {
		try {
			const { data, error } = await supabase.from("brazilStates").select("*");

			if (error) {
				toast("Erro ao buscar estados brasileiros!");
				set({ error });
				return;
			}

			set({ brazilStates: data, error: null });
		} catch (err) {
			toast("Erro inesperado ao buscar estados!");
			set({ error: err });
		}
	},
}));
