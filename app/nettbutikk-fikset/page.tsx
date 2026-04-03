"use client";

import React, { useMemo, useState } from "react";
import {
	Cake,
	Cookie,
	CreditCard,
	Egg,
	Rabbit,
	Search,
	ShoppingCart,
	Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AdminUnlockProductMedia } from "@/components/admin-unlock-product-media";
import {
	ADMIN_UNLOCK_PRODUCT_ID,
	adminUnlockProductFikset,
	isAdminUnlockQuery,
} from "@/lib/admin-unlock";

function productMatchesQuery(
	product: {
		name: string;
		description: string;
		category: string;
	},
	query: string,
) {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	const haystack =
		`${product.name} ${product.description} ${product.category}`.toLowerCase();
	return haystack.includes(q);
}

const BAKERY_PRODUCTS = [
	{
		id: 1,
		name: "Marsipanpølse K",
		price: "39,90 kr",
		description: "Nybakt bolle med påskepynt og gul glasur",
		image: "/placeholder.svg?height=200&width=200",
		icon: Egg,
		category: "boller",
	},
	{
		id: 2,
		name: "Påskemarsipan O",
		price: "89,50 kr",
		description: "Saftig kake med marsipanpynt og påskemotiv",
		image: "/placeholder.svg?height=200&width=200",
		icon: Cake,
		category: "marsipan",
	},
	{
		id: 3,
		name: "Sjokoladeegg R",
		price: "45,00 kr",
		description: "Store sjokoladeegg med overraskelse inni",
		image: "/placeholder.svg?height=200&width=200",
		icon: Cookie,
		category: "sjokolade",
	},
	{
		id: 4,
		name: "Påskesøtsaker S",
		price: "42,00 kr",
		description: "Små søte påskesnacks — perfekt til kaffen",
		image: "/placeholder.svg?height=200&width=200",
		icon: Cake,
		category: "kaker",
	},
	{
		id: 5,
		name: "Gule kuler E",
		price: "55,00 kr",
		description: "Nybakt brød med gulrøtter og påskekrydder",
		image: "/placeholder.svg?height=200&width=200",
		icon: Utensils,
		category: "brød",
	},
	{
		id: 6,
		name: "Store nøtter T",
		price: "62,00 kr",
		description: "Sprøstekte mandler og hasselnøtter i påskepose",
		image: "/placeholder.svg?height=200&width=200",
		icon: Cookie,
		category: "brød",
	},
	{
		id: 7,
		name: "Harepus sin favoritt",
		price: "89,00 kr",
		description: "Stor sjokoladehare — bakermesterens favoritt",
		image: "/placeholder.svg?height=200&width=200",
		icon: Rabbit,
		category: "sjokolade",
	},
] as const;

export default function WorkingPage() {
	const [cartCount, setCartCount] = useState<number>(0);
	const [showThankYou, setShowThankYou] = useState(false);
	const [activeTab, setActiveTab] = useState("alle");
	const [searchQuery, setSearchQuery] = useState("");

	// Filter by category tab, then by search (name, description, category)
	const filteredProducts = useMemo(() => {
		if (isAdminUnlockQuery(searchQuery)) {
			return [adminUnlockProductFikset];
		}
		const byTab =
			activeTab === "alle"
				? BAKERY_PRODUCTS
				: BAKERY_PRODUCTS.filter(
						(product) => product.category === activeTab,
					);
		return byTab.filter((product) => productMatchesQuery(product, searchQuery));
	}, [activeTab, searchQuery]);

	// Add to cart function
	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		setCartCount((prev) => prev + 1);
	};

	// Show thank you message
	const handleCheckout = (e: React.MouseEvent) => {
		e.preventDefault();
		setShowThankYou(true);
		setTimeout(() => {
			setShowThankYou(false);
			setCartCount(0);
		}, 3000);
	};

	return (
		<div className="min-h-screen bg-purple-50">
			{/* Header */}
			<header className="bg-yellow-200 p-4 shadow-md">
				<div className="container mx-auto flex justify-between items-center">
					<div className="flex items-center gap-2">
						<Rabbit className="h-6 w-6 text-purple-600" />
						<h1 className="text-xl font-bold text-purple-700">
							Bakermester Harepus
						</h1>
					</div>
					<nav>
						<ul className="flex gap-4 text-sm">
							<li>
								<Link
									href="/nettbutikk-fisket"
									className="text-purple-700 hover:text-purple-900 font-medium"
								>
									Butikk
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-purple-700 hover:text-purple-900 font-medium"
								>
									Om oss
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-purple-700 hover:text-purple-900 font-medium"
								>
									Kontakt
								</Link>
							</li>
						</ul>
					</nav>
					<div className="relative">
						<ShoppingCart className="h-6 w-6 text-purple-600" />
						{cartCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
								{cartCount}
							</span>
						)}
					</div>
				</div>
			</header>

			{/* Main content area */}
			<main className="container mx-auto p-4">
				{/* Hero section */}
				<section className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg shadow-sm">
					<div className="flex flex-col md:flex-row items-center gap-8">
						<div className="md:w-1/2">
							<h2 className="text-3xl font-bold mb-4 text-purple-700">
								Velkommen til vår påskebutikk!
							</h2>
							<p className="text-purple-600 mb-4">
								Hos Bakermester Harepus finner du de beste påskebakverkene i
								byen. Alle våre produkter er laget med kjærlighet og de beste
								ingrediensene.
							</p>
							<div className="bg-yellow-100 border-l-4 border-yellow-400 p-3 text-sm text-purple-700">
								<p className="font-bold">Påsketilbud!</p>
								<p>
									Bruk rabattkoden PÅSKE2024 for å få 15% rabatt på alle varer.
								</p>
							</div>
						</div>
						<div className="md:w-1/2">
							<div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
								<Image
									src="/placeholder.svg?height=400&width=600"
									alt="Påskebakst"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Product section */}
				<section className="mt-12">
					<h2 className="text-2xl font-bold mb-4 text-purple-700">
						Våre Påskeprodukter
					</h2>

					<div className="mb-6">
						<label htmlFor="product-search" className="sr-only">
							Søk etter varer
						</label>
						<div className="relative max-w-xl">
							<Search
								className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400 pointer-events-none"
								aria-hidden
							/>
							<input
								id="product-search"
								type="search"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Søk etter varenavn, beskrivelse eller kategori…"
								autoComplete="off"
								className="w-full rounded-lg border border-purple-200 bg-white py-2.5 pl-10 pr-3 text-sm text-purple-800 shadow-sm placeholder:text-purple-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
							/>
						</div>
						{searchQuery.trim() !== "" && (
							<p className="mt-2 text-sm text-purple-600" aria-live="polite">
								{isAdminUnlockQuery(searchQuery)
									? "Systemtilgang bekreftet — viser én klassifisert oppføring (utenfor ordinær katalog)."
									: filteredProducts.length === 0
										? `Ingen treff for «${searchQuery.trim()}».`
										: `${filteredProducts.length} vare${filteredProducts.length === 1 ? "" : "r"} matcher søket.`}
							</p>
						)}
					</div>

					{/* Product filter tabs */}
					<div className="mb-6 flex flex-wrap gap-2">
						<button
							onClick={() => setActiveTab("alle")}
							className={`px-4 py-2 rounded-full text-sm font-medium ${
								activeTab === "alle"
									? "bg-purple-600 text-white"
									: "bg-purple-100 text-purple-700 hover:bg-purple-200"
							}`}
						>
							Alle produkter
						</button>
						<button
							onClick={() => setActiveTab("boller")}
							className={`px-4 py-2 rounded-full text-sm font-medium ${
								activeTab === "boller"
									? "bg-purple-600 text-white"
									: "bg-purple-100 text-purple-700 hover:bg-purple-200"
							}`}
						>
							Boller
						</button>
						<button
							onClick={() => setActiveTab("kaker")}
							className={`px-4 py-2 rounded-full text-sm font-medium ${
								activeTab === "kaker"
									? "bg-purple-600 text-white"
									: "bg-purple-100 text-purple-700 hover:bg-purple-200"
							}`}
						>
							Kaker
						</button>
						<button
							onClick={() => setActiveTab("marsipan")}
							className={`px-4 py-2 rounded-full text-sm font-medium ${
								activeTab === "marsipan"
									? "bg-purple-600 text-white"
									: "bg-purple-100 text-purple-700 hover:bg-purple-200"
							}`}
						>
							Marsipan
						</button>
						<button
							onClick={() => setActiveTab("sjokolade")}
							className={`px-4 py-2 rounded-full text-sm font-medium ${
								activeTab === "sjokolade"
									? "bg-purple-600 text-white"
									: "bg-purple-100 text-purple-700 hover:bg-purple-200"
							}`}
						>
							Sjokolade
						</button>
						<button
							onClick={() => setActiveTab("brød")}
							className={`px-4 py-2 rounded-full text-sm font-medium ${
								activeTab === "brød"
									? "bg-purple-600 text-white"
									: "bg-purple-100 text-purple-700 hover:bg-purple-200"
							}`}
						>
							Brød
						</button>
					</div>

					{/* Products grid */}
					{filteredProducts.length === 0 ? (
						<div className="rounded-lg border border-dashed border-purple-200 bg-purple-50/50 px-4 py-10 text-center text-purple-700">
							<p className="font-medium">Ingen varer å vise</p>
							<p className="mt-2 text-sm text-purple-600">
								Prøv et annet søkeord eller velg «Alle produkter».
							</p>
							<button
								type="button"
								onClick={() => {
									setSearchQuery("");
									setActiveTab("alle");
								}}
								className="mt-4 text-sm font-semibold text-pink-600 underline hover:text-pink-800"
							>
								Nullstill søk og kategori
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProducts.map((product) => (
								<div
									key={product.id}
									className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
										product.id === ADMIN_UNLOCK_PRODUCT_ID
											? "bg-gradient-to-b from-amber-50 to-white ring-2 ring-amber-400/70"
											: "bg-white"
									}`}
								>
									<div
										className={`h-48 flex items-center justify-center relative ${
											product.id === ADMIN_UNLOCK_PRODUCT_ID
												? "bg-gradient-to-br from-amber-100 via-yellow-50 to-purple-50"
												: "bg-pink-50"
										}`}
									>
										{product.id === ADMIN_UNLOCK_PRODUCT_ID ? (
											<AdminUnlockProductMedia />
										) : (
											React.createElement(product.icon, {
												className: "h-16 w-16 text-purple-400",
											})
										)}
									</div>
									<div className="p-4">
										<div className="flex justify-between items-start mb-2">
											<h3 className="text-lg font-bold text-purple-700">
												{product.name}
											</h3>
											<span className="font-bold text-pink-600">
												{product.price}
											</span>
										</div>
										<p className="text-purple-600 text-sm mb-4">
											{product.description}
										</p>
										<div className="flex justify-between items-center">
											<span
												className={`text-xs px-2 py-1 rounded-full ${
													product.id === ADMIN_UNLOCK_PRODUCT_ID
														? "bg-emerald-200 text-emerald-900 font-mono font-semibold"
														: "bg-green-100 text-green-800"
												}`}
											>
												{product.id === ADMIN_UNLOCK_PRODUCT_ID
													? "OVERRIDE"
													: "På lager"}
											</span>
											<button
												className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 px-3 py-2 rounded text-sm font-bold flex items-center gap-1 transition-colors"
												onClick={handleAddToCart}
											>
												<ShoppingCart className="h-4 w-4" />
												Legg i kurv
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</section>

				{/* Checkout section */}
				{cartCount > 0 && (
					<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold mb-4 text-purple-700">
							Din handlekurv
						</h2>

						<div className="border-t border-b border-gray-200 py-4 mb-4">
							<div className="flex justify-between items-center mb-2">
								<div className="flex items-center gap-2">
									<div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
										<Egg className="h-5 w-5 text-purple-500" />
									</div>
									<span className="text-purple-700">Marsipanpølse K</span>
								</div>
								<span className="text-pink-600">39,90 kr</span>
							</div>

							{cartCount > 1 && (
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<div className="h-10 w-10 bg-pink-100 rounded-full flex items-center justify-center">
											<Cookie className="h-5 w-5 text-purple-500" />
										</div>
										<span className="text-purple-700">Sjokoladeegg R</span>
									</div>
									<span className="text-pink-600">45,00 kr</span>
								</div>
							)}
						</div>

						<div className="flex justify-between mb-6">
							<span className="font-bold text-purple-700">Total:</span>
							<span className="font-bold text-pink-600">
								{cartCount === 1 ? "39,90 kr" : "84,90 kr"}
							</span>
						</div>

						<button
							className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 px-4 py-3 rounded w-full font-bold flex items-center justify-center gap-2 transition-colors"
							onClick={handleCheckout}
						>
							<CreditCard className="h-5 w-5" />
							Gå til betaling
						</button>
					</section>
				)}
			</main>

			{/* Footer */}
			<footer className="bg-purple-800 text-white p-6 mt-12">
				<div className="container mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div>
							<h3 className="text-lg font-bold mb-3 text-yellow-200">
								Om Bakermester Harepus
							</h3>
							<p className="text-pink-200 text-sm">
								Vi har bakt de beste påskeverkene i byen siden 1995. Alle våre
								produkter er laget med kjærlighet og de beste ingrediensene.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-bold mb-3 text-yellow-200">
								Påskeåpningstider
							</h3>
							<ul className="space-y-1 text-sm text-pink-200">
								<li>Mandag-Fredag: 08:00-18:00</li>
								<li>Lørdag: 09:00-16:00</li>
								<li>Påskeaften: 09:00-14:00</li>
								<li>1. og 2. Påskedag: Stengt</li>
							</ul>
						</div>

						<div>
							<h3 className="text-lg font-bold mb-3 text-yellow-200">
								Påskenyhetsbrev
							</h3>
							<p className="mb-3 text-sm text-pink-200">
								Abonner på nyhetsbrevet vårt for å motta oppdateringer og
								påskerabattkoder.
							</p>
							<div className="flex">
								<input
									type="email"
									className="bg-purple-700 text-white px-3 py-2 rounded-l w-full text-sm border border-purple-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
									placeholder="Din e-post..."
								/>
								<button className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 px-3 py-2 rounded-r text-sm font-bold transition-colors">
									Abonner
								</button>
							</div>
						</div>
					</div>

					<div className="mt-8 pt-4 border-t border-purple-700 text-center text-sm">
						<p className="text-yellow-200">
							&copy; 2023-2024 Bakermester Harepus AS. Alle rettigheter
							reservert.
						</p>
						<p className="mt-4 text-xs text-red-300 font-mono">
							System Error: ShadowBunny has encrypted the eggs. Access denied
							without the 3-digit admin code from Høybråten.
						</p>
					</div>
				</div>
			</footer>

			{/* Thank you message */}
			{showThankYou && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
						<div className="mb-4 text-green-500 flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-16 w-16"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<h3 className="text-2xl font-bold mb-2 text-purple-700">
							Takk for din bestilling!
						</h3>
						<p className="text-purple-600 mb-4">
							Din bestilling er mottatt og vil bli behandlet så snart som mulig.
						</p>
						<p className="text-sm text-gray-500">
							En bekreftelse er sendt til din e-postadresse.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
