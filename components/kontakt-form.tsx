"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, Send } from "lucide-react";

export function KontaktForm() {
	const [sent, setSent] = useState(false);

	return (
		<>
			<form
				className="space-y-3"
				onSubmit={(e) => {
					e.preventDefault();
					setSent(true);
					window.setTimeout(() => setSent(false), 4000);
				}}
			>
				<div>
					<label htmlFor="navn" className="text-xs text-purple-700 block mb-1">
						Navn
					</label>
					<input
						id="navn"
						name="navn"
						type="text"
						className="w-full bg-pink-50 border-2 border-yellow-300 rounded px-3 py-2 text-sm animate-input-glitch text-purple-800"
						placeholder="Ditt navn"
					/>
				</div>
				<div>
					<label
						htmlFor="melding"
						className="text-xs text-purple-700 block mb-1"
					>
						Melding
					</label>
					<textarea
						id="melding"
						name="melding"
						rows={4}
						className="w-full bg-pink-50 border-2 border-yellow-300 rounded px-3 py-2 text-sm animate-input-glitch text-purple-800 resize-y"
						placeholder="Skriv hva du vil — systemet lover ingenting…"
					/>
				</div>
				<button
					type="submit"
					className="bg-yellow-400 text-purple-800 px-4 py-2 rounded font-bold hover:bg-yellow-500 animate-button-glitch w-full sm:w-auto flex items-center justify-center gap-2"
				>
					<Send className="h-4 w-4" />
					Send (simulert)
				</button>
			</form>
			{sent && (
				<div
					className="mt-4 flex gap-2 items-start bg-pink-100 border-l-4 border-purple-500 p-3 text-sm text-purple-800 animate-slide-in"
					role="status"
				>
					<AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
					<div>
						<p className="font-bold">Melding «sendt»</p>
						<p className="text-xs text-green-700 mt-1 corrupt-text">
							I virkeligheten gikk ingenting noe sted — akkurat som
							påskebetalingen. Takk for at du spilte med. Prøv{" "}
							<Link href="/" className="underline">
								forsiden
							</Link>{" "}
							igjen hvis du savner kaoset.
						</p>
					</div>
				</div>
			)}
		</>
	);
}
