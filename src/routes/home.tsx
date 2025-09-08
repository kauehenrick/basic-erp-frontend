import { useEffect } from "react";
import {
	PiBoxArrowDownFill,
	PiCurrencyDollarFill,
	PiWarningFill,
} from "react-icons/pi";
import DashboardItem from "@/components/DashboardItem";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/stores/SidebarStore";

export default function Home() {
	const { setSelectedOption } = useSidebarStore();

	useEffect(() => {
		setSelectedOption("Tela inicial");
	}, []);

	return (
		<div className="flex">
			<Sidebar />

			<main className="flex flex-col w-full items-start">
				<Header pageName="Tela inicial" />

				<div className="px-6 mt-4 space-y-10">
					<p className="text-xl">Olá Kauê, seja bem vindo! 👋</p>

					<section id="dashboard" className="flex gap-7">
						<DashboardItem
							icon={PiCurrencyDollarFill}
							title="Vendas do mês"
							moneySign="R$"
							value="000.000,00"
						/>

						<DashboardItem
							icon={PiWarningFill}
							title="NF-e rejeitadas"
							value="5"
						/>

						<DashboardItem
							icon={PiBoxArrowDownFill}
							title="Produtos com estoque baixo"
							value="3"
						/>
					</section>

					<section id="quickactions">
						<p className="text-lg">Ações rápidas</p>

						<div className="mt-4 space-x-5">
							<Button>Cadastrar produto</Button>
							<Button>Emitir NF-e</Button>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
