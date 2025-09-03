import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export const personFormSchema = z.object({
    id: z.coerce.number().optional(),
    isActive: z.boolean().optional(),
    name: z.string().min(2, { message: "Esse campo deve ser preenchido." }),
    personRegisterNumber: z.string().min(11, { message: "Esse campo deve ser preenchido." }),
    personType: z.string(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    stateRegistration: z.string().max(14, { message: "Esse campo deve conter no máximo 14 caracteres." }).optional(),
    companyName: z.string().max(60, { message: "Tamanho máximo de 60 caracteres." }).optional(),
    street: z.string().max(60, { message: "Esse campo deve conter no máximo 60 caracteres." }).optional(),
    addressComplement: z.string().max(30, { message: "Esse campo deve conter no máximo 30 caracteres." }).optional(),
    number: z.string().max(10, { message: "Esse campo deve conter no máximo 10 caracteres." }).optional(),
    neighborhood: z.string().max(60, { message: "Esse campo deve conter no máximo 60 caracteres." }).optional(),
    state: z.string().optional(),
    city: z.string().max(60, { message: "Esse campo deve conter no máximo 60 caracteres." }).optional(),
    postalCode: z.string().optional()
})

export type PersonProps = z.infer<typeof personFormSchema>;

type PersonStoreProps = {
    people: PersonProps[],
    error: null | string | unknown,
    getPeople: () => void,
    addPerson: (person: Omit<PersonProps, "id" | "isActive">) => void,
    disablePerson: (person: PersonProps) => void,
    updatePerson: (person: PersonProps) => void,
};

export const usePersonStore = create<PersonStoreProps>((set) => ({
    people: [],
    error: null,
    getPeople: async function getPeople() {
        try {
            const { data, error } = await supabase.from("people").select("*");

            if (error) {
                toast("Erro ao buscar pessoas!");
                set({ error });
                return;
            }

            set({ people: data, error: null });
        } catch (err) {
            toast("Erro inesperado ao buscar pessoas!");
            set({ error: err });
        }
    },
    addPerson: () => { },
    disablePerson: () => { },
    updatePerson: () => { },
}))