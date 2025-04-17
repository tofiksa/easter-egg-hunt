"use client";

import React, { useState } from "react";
import {
	Cake,
	Cookie,
	CreditCard,
	Egg,
	Rabbit,
	ShoppingCart,
	Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WorkingPage() {
	const [cartCount, setCartCount] = useState<number>(0);
	const [showThankYou, setShowThankYou] = useState(false);
	const [activeTab, setActiveTab] = useState("alle");

	// Bakery products with Easter theme
	const bakeryProducts = [
		{
			id: 1,
			name: "Påskebolle Deluxe",
			price: "39,90 kr",
			description: "Nybakt bolle med påskepynt og gul glasur",
			image: "/placeholder.svg?height=200&width=200",
			icon: Egg,
			category: "boller",
		},
		{
			id: 2,
			name: "Påskekake",
			price: "89,50 kr",
			description: "Saftig kake med marsipanpynt og påskemotiv",
			image: "/placeholder.svg?height=200&width=200",
			icon: Cake,
			category: "kaker",
		},
		{
			id: 3,
			name: "Sjokoladeegg",
			price: "45,00 kr",
			description: "Store sjokoladeegg med overraskelse inni",
			image: "/placeholder.svg?height=200&width=200",
			icon: Cookie,
			category: "sjokolade",
		},
		{
			id: 4,
			name: "Påskemarsipan",
			price: "69,90 kr",
			description: "Hjemmelaget marsipan formet som påskefigurer",
			image: "/placeholder.svg?height=200&width=200",
			icon: Rabbit,
			category: "marsipan",
		},
		{
			id: 5,
			name: "Påskebrød",
			price: "55,00 kr",
			description: "Nybakt brød med gulrøtter og påskekrydder",
			image: "/placeholder.svg?height=200&width=200",
			icon: Utensils,
			category: "brød",
		},
	];

	// Filter products based on active tab
	const filteredProducts =
		activeTab === "alle"
			? bakeryProducts
			: bakeryProducts.filter((product) => product.category === activeTab);

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
					<h2 className="text-2xl font-bold mb-6 text-purple-700">
						Våre Påskeprodukter
					</h2>

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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredProducts.map((product) => (
							<div
								key={product.id}
								className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
							>
								<div className="h-48 bg-pink-50 flex items-center justify-center relative">
									{React.createElement(product.icon, {
										className: "h-16 w-16 text-purple-400",
									})}
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
										<span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
											På lager
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
									<span className="text-purple-700">Påskebolle Deluxe</span>
								</div>
								<span className="text-pink-600">39,90 kr</span>
							</div>

							{cartCount > 1 && (
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<div className="h-10 w-10 bg-pink-100 rounded-full flex items-center justify-center">
											<Cookie className="h-5 w-5 text-purple-500" />
										</div>
										<span className="text-purple-700">Sjokoladeegg</span>
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
