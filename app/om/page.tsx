import type { Metadata } from "next";
import Link from "next/link";
import { Cake, Heart, Rabbit } from "lucide-react";

import { BrokenBakeryChrome } from "@/components/broken-bakery-chrome";
import { ShadowBunnyGlasurArticle } from "@/components/shadow-bunny-glasur-article";

export const metadata: Metadata = {
	title: "Om oss — Bakermester Harepus",
	description:
		"Historien om Bakermester Harepus, påskeferien som gikk galt, og hvorfor nettsiden oppfører seg som den gjør.",
};

export default function OmPage() {
	return (
		<BrokenBakeryChrome>
			<section className="bg-pink-50 p-4 shadow-lg border-2 border-yellow-300 decay-mold-border">
				<h1 className="text-2xl font-bold glitch-text-severe text-purple-700 mb-3">
					Om Bakermester Harepus
				</h1>
				<p className="text-sm text-blue-700 corrupt-text animate-text-corrupt leading-relaxed">
					Siden 1995 har vi i utgangspunktet bakt byens mest pålitelige
					påskeverk — helt til den dagen noe gikk galt mellom ovnen, Wi‑Fi-en og
					en overivrig marsipin-hare. Det du ser på forsiden er ikke et
					designvalg fra markedsavdelingen. Det er{" "}
					<span className="text-pink-600 font-medium">tilstanden vår</span>.
				</p>
			</section>

			<section className="mt-6 space-y-4">
				<article className="bg-green-50 p-4 border-2 border-purple-200 decay-mold-border rounded-lg">
					<div className="flex items-center gap-2 mb-2">
						<Heart className="h-5 w-5 text-pink-500" />
						<h2 className="text-lg font-bold text-purple-700">Vårt løfte</h2>
					</div>
					<p className="text-sm text-green-800 corrupt-text">
						Vi lover fortsatt gode råvarer, ekte smør der det skal være smør, og
						en hare som bryr seg — når han er til stede. Akkurat nå jobber
						«teamet» bestående av en utholden påskekylling og et halvt
						kundeservice-skript under oppdatert feilmelding.
					</p>
				</article>

				<ShadowBunnyGlasurArticle />

				<article className="bg-purple-900/10 p-4 border-2 border-yellow-300 decay-mold-border rounded-lg">
					<div className="flex items-center gap-2 mb-2">
						<Cake className="h-5 w-5 text-purple-600" />
						<h2 className="text-lg font-bold text-purple-700">
							Produktene deres
						</h2>
					</div>
					<p className="text-sm text-blue-800 corrupt-text">
						Marsipan, sjokoladeegg, påskesøtsaker og harens favoritt er fortsatt
						«ekte» i vår verden — men på nett er de fanget i et grensesnitt som
						oppfører seg som en påskeeggjakt i et dataspill du ikke har lastet
						ned. Det er derfor beskrivelser og bilder ikke henger helt på
						grep… og derfor{" "}
						<span className="text-red-600">totalen noen ganger sier ERROR</span>.
					</p>
				</article>

				<article className="bg-pink-100/80 p-4 border-2 border-green-300 decay-mold-border rounded-lg">
					<div className="flex items-center gap-2 mb-2">
						<Rabbit className="h-5 w-5 text-purple-600" />
						<h2 className="text-lg font-bold text-purple-700">Veien videre</h2>
					</div>
					<p className="text-sm text-green-900 corrupt-text">
						Vi bygger en roligere versjon for de som faktisk vil handle. Hvis du
						allerede har funnet hint i fotografier eller rare systemmeldinger,
						vet du kanskje mer enn oss om neste steg.{" "}
						<span className="text-xs text-purple-600 font-mono">
							(Admin-koder og steder nord for byen er rent hypotetiske. Kanskje.)
						</span>
					</p>
				</article>
			</section>

			<p className="mt-8 text-center text-sm text-purple-600">
				<Link href="/kontakt" className="underline hover:text-pink-600">
					Trenger du å si fra? Kontakt
				</Link>
				{" — "}
				<Link href="/" className="underline hover:text-pink-600">
					eller tilbake til forsiden
				</Link>
				.
			</p>
		</BrokenBakeryChrome>
	);
}
