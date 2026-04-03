import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import { BrokenBakeryChrome } from "@/components/broken-bakery-chrome";
import { KontaktForm } from "@/components/kontakt-form";

export const metadata: Metadata = {
	title: "Kontakt — Bakermester Harepus",
	description:
		"Kontaktinformasjon for Bakermester Harepus. Kanaler er… variable akkurat nå.",
};

export default function KontaktPage() {
	return (
		<BrokenBakeryChrome>
			<section className="bg-pink-50 p-4 shadow-lg border-2 border-yellow-300 decay-mold-border skew-x-1 animate-structural-sway">
				<h1 className="text-2xl font-bold glitch-text text-purple-700 mb-2">
					Kontakt
				</h1>
				<p className="text-sm text-blue-700 corrupt-text animate-text-corrupt-delay">
					Vi <span className="text-green-600">elsker</span> å høre fra deg.
					Problemet er at våre kanaler akkurat nå er like stabile som en
					påskekurv full av sprø sjokolade — og like forutsigbare som
					handlekurven på forsiden.
				</p>
			</section>

			<div className="mt-6 grid gap-4 md:grid-cols-2">
				<section className="bg-green-50 p-4 border-2 border-yellow-300 decay-mold-border rounded-lg">
					<h2 className="text-sm font-bold text-purple-700 mb-3 flex items-center gap-2">
						<Phone className="h-4 w-4" />
						Telefon
					</h2>
					<p className="text-sm text-purple-800 corrupt-text mb-2">
						<span className="font-mono">+47 22 33 44 55</span> (påskehotline)
					</p>
					<p className="text-xs text-red-600 bg-red-50 border border-red-200 p-2 rounded">
						For øyeblikket: linjen er stengt av «påskeferie på
						betalingsserveren». Du kan like gjerne nynne påskeviser i
						telefonsvareren — den svarer ikke, men den har god rytme.
					</p>
				</section>

				<section className="bg-blue-50 p-4 border-2 border-pink-300 decay-mold-border rounded-lg">
					<h2 className="text-sm font-bold text-purple-700 mb-3 flex items-center gap-2">
						<Mail className="h-4 w-4" />
						E-post
					</h2>
					<p className="text-sm text-purple-800 corrupt-text mb-2">
						<Link
							href="mailto:harepus@eksempel.no"
							className="underline decoration-wavy decoration-pink-400"
						>
							harepus@eksempel.no
						</Link>
					</p>
					<p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded">
						Innboksen vår er filtrert med et lag gul glasur. Svar kan ta 3–5
						påskedager, eller aldri, avhengig av om e-posten blir klassifisert
						som «marsipan» eller «kritisk systemfeil».
					</p>
				</section>

				<section className="md:col-span-2 bg-purple-900/5 p-4 border-2 border-purple-300 decay-mold-border rounded-lg">
					<h2 className="text-sm font-bold text-purple-700 mb-3 flex items-center gap-2">
						<MapPin className="h-4 w-4" />
						Besøk oss (kanskje)
					</h2>
					<p className="text-sm text-purple-800 corrupt-text">
						<span className="font-medium">Bakermester Harepus</span>
						<br />
						Påskegata 12
						<br />
						0484 Oslo
					</p>
					<p className="mt-2 text-xs text-purple-600 font-mono border-l-4 border-pink-400 pl-3">
						Åpningstider følger forsiden: alt som er gjennomstreket er stengt.
						Hvis du bor i nærheten av steder der admin-koder og egg-hint
						nevnes… ta med godt humør og en ekstra kopp kaffe.
					</p>
				</section>
			</div>

			<section className="mt-6 bg-yellow-50 p-4 border-2 border-pink-300 decay-mold-border rounded-lg">
				<h2 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
					<Send className="h-5 w-5" />
					Send oss en melding
				</h2>
				<KontaktForm />
			</section>

			<p className="mt-6 text-center text-xs text-purple-500">
				Nødhjelp for stabile bestillinger:{" "}
				<Link
					href="/nettbutikk-fikset"
					className="underline text-green-700 font-medium"
				>
					nettbutikk-fikset
				</Link>
			</p>
		</BrokenBakeryChrome>
	);
}
