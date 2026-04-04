import type { Metadata } from "next";
import Link from "next/link";
import {
	AlertTriangle,
	Cookie,
	Egg,
	Lock,
	Rabbit,
	Utensils,
} from "lucide-react";

import { BrokenBakeryChrome } from "@/components/broken-bakery-chrome";

export const metadata: Metadata = {
	title: "Butikk — Bakermester Harepus",
	description:
		"Lager og varestatus for Bakermester Harepus. Akkurat nå: mer kaos enn katalog.",
};

const avdelinger = [
	{
		tittel: "Marsipan & boller",
		status: "Delvis synkronisert",
		tekst:
			"Marsipanpølse K og påskemarsipan O vises på forsiden, men lagerbeholdningen teller seg selv hvert syvende sekund. Vi anbefaler å ikke stole på «på lager»-merket — det kan være en hallusinasjon utløst av for mye gul glasur.",
		icon: Egg,
	},
	{
		tittel: "Sjokoladeegg & snacks",
		status: "Kø foran kassa: FEIL#404",
		tekst:
			"Sjokoladeegg R og påskesøtsaker S ligger i en kø som aldri blir behandlet. Noen kunder rapporterer at handlekurven hopper til 99 og tilbake til null. Det er ikke en funksjon. Det er et symptom.",
		icon: Cookie,
	},
	{
		tittel: "Brød, nøtter & harens favoritt",
		status: "Stengt av «teknisk påske»",
		tekst:
			"Gule kuler E, store nøtter T og harepus sin favoritt er teknisk sett til salgs, men betalingsmodulen mener fortsatt at det er påskeferie på serveren. Vi beklager — og haren beklager visstnok også, når han dukker opp.",
		icon: Utensils,
	},
];

export default function ButikkPage() {
	return (
		<BrokenBakeryChrome>
			<section className="bg-pink-50 p-4 shadow-lg border-2 border-yellow-300 decay-mold-border animate-structural-sway skew-x-1">
				<div className="flex items-start gap-2 mb-3">
					<AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
					<div>
						<h1 className="text-2xl font-bold glitch-text text-purple-700">
							Butikk{" "}
							<span className="text-red-600 text-lg font-normal">
								(ikke en vanlig nettbutikk akkurat nå)
							</span>
						</h1>
						<p className="mt-2 text-sm text-blue-700 corrupt-text animate-text-corrupt">
							Dette er fortsettelsen av det du så på forsiden: samme produkter,
							samme vakre kaos. Her forklarer vi — så godt vi kan — hva som
							egentlig skjer i «butikken» mens påskeharen er sporløst borte.
						</p>
					</div>
				</div>
			</section>

			<section className="mt-6 grid gap-4">
				{avdelinger.map((a) => (
					<article
						key={a.tittel}
						className="bg-green-50 p-4 border-2 border-yellow-300 decay-mold-border shadow-md relative overflow-hidden hover:animate-glitch-hover"
					>
						<div className="flex items-center gap-2 mb-2">
							<a.icon className="h-6 w-6 text-purple-500" aria-hidden />
							<h2 className="text-lg font-bold text-purple-700 glitch-text">
								{a.tittel}
							</h2>
						</div>
						<p className="text-xs font-mono text-pink-600 mb-2 animate-blink inline-block bg-yellow-100 px-2 py-0.5 rounded border border-pink-300">
							{a.status}
						</p>
						<p className="text-sm text-blue-800 corrupt-text">{a.tekst}</p>
					</article>
				))}
			</section>

			<section className="mt-6 bg-blue-50 p-4 border-2 border-pink-300 rounded-lg decay-mold-border">
				<div className="flex items-center gap-2 text-purple-800 font-bold mb-2">
					<Lock className="h-5 w-5" />
					Rabattkoder
				</div>
				<p className="text-sm text-green-700 corrupt-text">
					<span className="line-through">PÅSKE2025</span> er fortsatt{" "}
					<span className="text-red-600">ugyldig</span> — akkurat som på
					forsiden. Systemet hevder at koden ble spist av en intern
					påskekylling. Vi etterforsker ikke nærmere. Kanskje det hjelper å
					sende hjerter til Abu-hint?
				</p>
			</section>

			<section className="mt-6 flex flex-col sm:flex-row gap-3 items-start">
				<Link
					href="/"
					className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-pink-400 text-purple-900 px-4 py-2 rounded font-bold hover:animate-wiggle"
				>
					<Rabbit className="h-4 w-4" />
					Se produktene på forsiden
				</Link>
				<p className="text-xs text-purple-600 max-w-md">
					Vil du ha en versjon der knapper gjør det du tror de skal? Prøv{" "}
					<Link
						href="/nettbutikk-fikset"
						className="underline text-green-700 font-medium"
					>
						nettbutikk-fikset
					</Link>
					.
				</p>
			</section>
		</BrokenBakeryChrome>
	);
}
