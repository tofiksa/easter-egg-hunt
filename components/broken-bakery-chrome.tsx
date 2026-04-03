"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Egg, Rabbit, ShoppingCart } from "lucide-react";

const nav = [
	{ href: "/", label: "Hjem" },
	{ href: "/butikk", label: "Butikk" },
	{ href: "/om", label: "Om" },
	{ href: "/kontakt", label: "Kontakt" },
] as const;

export function BrokenBakeryChrome({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<div className="decay-atmosphere min-h-screen bg-purple-50 overflow-x-hidden relative">
			<div className="decay-scanlines" aria-hidden />
			<div className="decay-grain bg-static" aria-hidden />
			<div className="decay-content flex min-h-screen flex-col">
				<header className="bg-yellow-200 p-3 flex flex-wrap justify-between items-center gap-2 animate-glitch animate-power-flicker border-b-2 border-amber-300/60">
					<Link
						href="/"
						className="flex items-center gap-1 min-w-0"
					>
						<Rabbit className="h-6 w-6 shrink-0 animate-spin-slow text-purple-500" />
						<span className="text-lg font-bold glitch-text text-purple-700 truncate">
							Bakermester Harepus
						</span>
					</Link>
					<nav className="rotate-1 animate-float">
						<ul className="flex flex-wrap gap-2 text-sm">
							{nav.map(({ href, label }) => {
								const active = pathname === href;
								return (
									<li key={href} className="hover:animate-bounce">
										<Link
											href={href}
											className={`broken-link px-1 rounded ${
												active
													? "text-purple-800 underline decoration-pink-400 decoration-2"
													: "text-pink-600"
											}`}
											aria-current={active ? "page" : undefined}
										>
											{label}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
					<div className="relative shrink-0" aria-hidden>
						<ShoppingCart className="h-6 w-6 animate-wiggle text-purple-600" />
						<span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-blink">
							?
						</span>
					</div>
				</header>

				<main className="container mx-auto p-3 flex-1">{children}</main>

				<footer className="bg-purple-800 text-white p-4 mt-8 relative overflow-hidden">
					<div className="container mx-auto text-center text-sm text-pink-200 corrupt-text">
						<p className="glitch-text text-yellow-200 font-bold mb-2">
							Bakermester Harepus
						</p>
						<p>
							<Link href="/" className="underline hover:text-yellow-200">
								Til forsiden
							</Link>
							{" · "}
							<Link
								href="/nettbutikk-fikset"
								className="underline hover:text-yellow-200"
							>
								Stabile versjon (beta)
							</Link>
						</p>
						<p className="mt-3 text-xs text-red-300/90 font-mono">
							Lagerstatus: ukjent · Betaling: utilgjengelig · Påskeharen: sporløst
							borte
						</p>
					</div>
					<div className="absolute bottom-0 left-0 animate-bounce-slow pointer-events-none">
						<Egg className="h-8 w-8 text-yellow-300" aria-hidden />
					</div>
					<div className="absolute top-0 right-0 animate-spin-slow pointer-events-none">
						<Rabbit className="h-6 w-6 text-pink-300" aria-hidden />
					</div>
				</footer>
			</div>
		</div>
	);
}
