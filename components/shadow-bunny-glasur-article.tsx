"use client";

import { useCallback, useId, useState } from "react";
import { Sparkles } from "lucide-react";

const RIDDLE =
	"Ta årstallet som står på kirkeveggen og trekk fra 1900!";

export function ShadowBunnyGlasurArticle() {
	const [open, setOpen] = useState(false);
	const toggle = useCallback(() => setOpen((o) => !o), []);
	const panelId = useId();

	return (
		<article className="bg-yellow-50 p-4 border-2 border-pink-300 decay-mold-border rounded-lg animate-structural-sway">
			<div className="flex items-center gap-2 mb-2">
				<Sparkles className="h-5 w-5 text-amber-600" />
				<h2 className="text-lg font-bold text-purple-700">
					Hva skjedde egentlig?
				</h2>
			</div>
			<p className="text-sm text-purple-800 corrupt-text leading-relaxed">
				Offisiell versjon:{" "}
				<span className="italic">tekniske problemer</span> og at påskeharer
				jobber hardt. Uoffisiell versjon: en hendelse vi kaller «den store
				glasur-ulykken», der lager, nettside og en mystisk gjest ved navn{" "}
				<button
					type="button"
					onClick={toggle}
					className="font-mono text-xs bg-purple-100 px-1 rounded-sm cursor-pointer touch-manipulation underline decoration-dotted decoration-purple-400 underline-offset-2 hover:bg-purple-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 active:scale-[0.98] transition-transform"
					aria-expanded={open}
					aria-controls={panelId}
					title={RIDDLE}
				>
					ShadowBunny
				</button>{" "}
				ble blandet sammen i feil rekkefølge. Resultatet er synkroniseringsfeil,
				risting, og feilmeldinger som kan dras rundt som post-it-lapper i
				vinden.
			</p>
			<p
				id={panelId}
				hidden={!open}
				className="mt-3 text-sm text-amber-950 font-mono border-l-4 border-amber-500 bg-amber-50/90 pl-3 py-2 pr-2 rounded-r corrupt-text leading-relaxed"
				role="status"
			>
				{RIDDLE}
			</p>
		</article>
	);
}
