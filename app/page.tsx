"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	AlertTriangle,
	Bug,
	Cake,
	Cookie,
	CreditCard,
	Egg,
	Rabbit,
	ShoppingCart,
	Utensils,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
	useRandomMobileVibration,
	vibrateIfSupported,
} from "@/hooks/use-mobile-vibration";

/** Deterministic 0–1 from id + salt (stable across renders; avoids hydration drift). */
function stable01(id: number, salt: number) {
	const x = Math.sin(id * 12.9898 + salt * 78.233) * 43758.5453;
	return x - Math.floor(x);
}

const POSSIBLE_ERRORS = [
	"FEIL 404: Påskeegg ikke funnet",
	"KRITISK FEIL: Påskeharen har stukket av",
	"ADVARSEL: Påskeliljer ikke tilgjengelig",
	"FATAL FEIL: Marsipanegg smeltet",
	"SYSTEMALARM: Uventet påskekylling i linje 42",
	"KJØRETIDSFEIL: Påskekaken falt sammen",
	"SYNTAKSFEIL: Forventet gul; fikk lilla 🐣",
	"TILKOBLING AVVIST: Påskeserveren i brann",
	"SEGMENTERINGSFEIL: Påskekurv ødelagt",
	"KERNELPANIKK: Eggemaling stoppet",
] as const;

type ErrorLine = { id: string; text: string };

type Pos = { x: number; y: number };

function DraggableErrorCard({
	entry,
	position,
	rotationDeg,
	zIndex,
	containerRef,
	onPositionChange,
	onDragStart,
	onDragEnd,
	animationDelay,
}: {
	entry: ErrorLine;
	position: Pos;
	rotationDeg: number;
	zIndex: number;
	containerRef: React.RefObject<HTMLDivElement | null>;
	onPositionChange: (id: string, pos: Pos) => void;
	onDragStart: (id: string) => void;
	onDragEnd: () => void;
	animationDelay: string;
}) {
	const cardRef = useRef<HTMLDivElement>(null);
	const dragRef = useRef<{
		pointerId: number;
		startClientX: number;
		startClientY: number;
		originX: number;
		originY: number;
	} | null>(null);

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.button !== 0) return;
		e.preventDefault();
		e.currentTarget.setPointerCapture(e.pointerId);
		onDragStart(entry.id);
		dragRef.current = {
			pointerId: e.pointerId,
			startClientX: e.clientX,
			startClientY: e.clientY,
			originX: position.x,
			originY: position.y,
		};
	};

	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!dragRef.current || e.pointerId !== dragRef.current.pointerId) return;
		const container = containerRef.current;
		if (!container) return;
		const rect = container.getBoundingClientRect();
		const cardEl = cardRef.current;
		const cardW = cardEl?.offsetWidth ?? 0;
		const cardH = cardEl?.offsetHeight ?? 0;
		const dx = e.clientX - dragRef.current.startClientX;
		const dy = e.clientY - dragRef.current.startClientY;
		let nx = dragRef.current.originX + dx;
		let ny = dragRef.current.originY + dy;
		nx = Math.max(0, Math.min(nx, Math.max(0, rect.width - cardW)));
		ny = Math.max(0, Math.min(ny, Math.max(0, rect.height - cardH)));
		onPositionChange(entry.id, { x: nx, y: ny });
	};

	const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!dragRef.current || e.pointerId !== dragRef.current.pointerId) return;
		try {
			e.currentTarget.releasePointerCapture(e.pointerId);
		} catch {
			/* ignore */
		}
		dragRef.current = null;
		onDragEnd();
	};

	return (
		<div
			ref={cardRef}
			className="animate-fade-in absolute cursor-grab touch-none select-none bg-yellow-100 border-2 border-pink-300 text-purple-700 px-3 py-2 rounded shadow-md active:cursor-grabbing"
			style={{
				left: position.x,
				top: position.y,
				width: "calc(100% - 16px)",
				maxWidth: "calc(100% - 16px)",
				zIndex,
				transform: `rotate(${rotationDeg}deg)`,
				animationDelay,
			}}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={endDrag}
			onPointerCancel={endDrag}
		>
			<span className="pointer-events-none block pr-6">{entry.text}</span>
			<span className="pointer-events-none absolute top-0 bottom-0 right-0 px-3 py-2">
				<X className="h-4 w-4 text-pink-500" aria-hidden />
			</span>
		</div>
	);
}

export default function BrokenPage() {
	const [shake, setShake] = useState(false);
	const errorIdRef = useRef(0);
	const [errorMessages, setErrorMessages] = useState<ErrorLine[]>([]);
	const [brokenProducts, setBrokenProducts] = useState<
		{
			id: number;
			name: string;
			price: string;
			description: string;
			image: string;
			icon: React.ElementType;
		}[]
	>([]);
	const [showEasterEgg, setShowEasterEgg] = useState(false);
	const [cartCount, setCartCount] = useState<number>(0);
	const [totalPrice, setTotalPrice] = useState<string>("84,90 kr");
	const [showFaultToast, setShowFaultToast] = useState(false);
	const [errorPositions, setErrorPositions] = useState<Record<string, Pos>>({});
	const [draggingErrorId, setDraggingErrorId] = useState<string | null>(null);
	const errorLayerRef = useRef<HTMLDivElement>(null);
	const reduceMotion = usePrefersReducedMotion();
	const isMobile = useIsMobile();
	const vibrationOn = isMobile && !reduceMotion;
	useRandomMobileVibration({ active: vibrationOn });

	// Bakery products with Easter theme
	const bakeryProducts = useMemo(
		() => [
			{
				id: 1,
				name: "Påskebolle Deluxe",
				price: "39,90 kr",
				description: "Nybakt bolle med påskepynt og gul glasur",
				image: "/placeholder.svg?height=200&width=200",
				icon: Egg,
			},
			{
				id: 2,
				name: "Påskekake",
				price: "89,50 kr",
				description: "Saftig kake med marsipanpynt og påskemotiv",
				image: "/placeholder.svg?height=200&width=200",
				icon: Cake,
			},
			{
				id: 3,
				name: "Sjokoladeegg",
				price: "45,00 kr",
				description: "Store sjokoladeegg med overraskelse inni",
				image: "/placeholder.svg?height=200&width=200",
				icon: Cookie,
			},
			{
				id: 4,
				name: "Påskemarsipan",
				price: "69,90 kr",
				description: "Hjemmelaget marsipan formet som påskefigurer",
				image: "/placeholder.svg?height=200&width=200",
				icon: Rabbit,
			},
			{
				id: 5,
				name: "Påskebrød",
				price: "55,00 kr",
				description: "Nybakt brød med gulrøtter og påskekrydder",
				image: "/placeholder.svg?height=200&width=200",
				icon: Utensils,
			},
		],
		[],
	);

	const productDecay = useMemo(() => {
		const o: Record<
			number,
			{
				rot: number;
				inStock: boolean;
				showAllergen: boolean;
				showCorner: boolean;
				cornerLabel: string;
			}
		> = {};
		for (const p of bakeryProducts) {
			o[p.id] = {
				rot: (stable01(p.id, 1) - 0.5) * 4,
				inStock: stable01(p.id, 2) > 0.5,
				showAllergen: stable01(p.id, 3) > 0.7,
				showCorner: stable01(p.id, 4) > 0.6,
				cornerLabel:
					stable01(p.id, 5) > 0.5 ? "30% Påskerabatt" : "Utgått på dato",
			};
		}
		return o;
	}, [bakeryProducts]);

	/* ─── Haptisk velkomst ───────────────────────────────────────────────
	   Gi brukeren en umiddelbar fysisk følelse av at noe er galt:
	   en kort serie vibrasjoner som simulerer at nettsiden "rister" i
	   hendene allerede fra første sekund. Respekterer reduced-motion. */
	useEffect(() => {
		if (reduceMotion) return;
		// Kort forsinkelse slik at siden rekker å rendres før shaken starter
		const timer = setTimeout(() => {
			// Visuell shake
			setShake(true);
			setTimeout(() => setShake(false), 600);
			// Haptisk vibrasjon (kun mobil)
			if (isMobile) {
				vibrateIfSupported([60, 40, 80, 30, 50, 25, 70]);
			}
		}, 400);
		return () => clearTimeout(timer);
	}, [reduceMotion, isMobile]);

	useEffect(() => {
		setShowFaultToast(reduceMotion ? false : Math.random() > 0.35);
	}, [reduceMotion]);

	useEffect(() => {
		setBrokenProducts(bakeryProducts);
	}, [bakeryProducts]);

	useEffect(() => {
		setErrorPositions((prev) => {
			let changed = false;
			const next = { ...prev };
			for (let i = 0; i < errorMessages.length; i++) {
				const id = errorMessages[i].id;
				if (!(id in next)) {
					next[id] = { x: 8, y: 8 + i * 56 };
					changed = true;
				}
			}
			return changed ? next : prev;
		});
	}, [errorMessages]);

	useEffect(() => {
		if (reduceMotion) {
			setShake(false);
			return;
		}

		const shakeInterval = setInterval(
			() => {
				setShake(true);
				if (isMobile) {
					vibrateIfSupported([38, 28, 42]);
				}
				setTimeout(() => setShake(false), 500);
			},
			Math.random() * 5000 + 3000,
		);

		const errorInterval = setInterval(
			() => {
				setErrorMessages((prev) => {
					if (prev.length >= 8) return prev;
					const text =
						POSSIBLE_ERRORS[
							Math.floor(Math.random() * POSSIBLE_ERRORS.length)
						];
					const id = `err-${errorIdRef.current++}`;
					return [...prev, { id, text }];
				});
			},
			Math.random() * 4000 + 2000,
		);

		const cartInterval = setInterval(() => {
			setCartCount(Math.floor(Math.random() * 10));
		}, 7000);

		const priceInterval = setInterval(() => {
			setTotalPrice(Math.random() > 0.5 ? "84,90 kr" : "ERROR");
		}, 5000);

		return () => {
			clearInterval(shakeInterval);
			clearInterval(errorInterval);
			clearInterval(cartInterval);
			clearInterval(priceInterval);
		};
	}, [reduceMotion, isMobile]);

	// Easter egg trigger
	const handleSecretClick = () => {
		setShowEasterEgg(true);
		setTimeout(() => setShowEasterEgg(false), 3000);
	};

	// Pretend to add to cart
	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		// Random behavior
		const randomAction = Math.random();
		if (randomAction > 0.7) {
			setCartCount((prev) => prev + 1);
		} else if (randomAction > 0.4) {
			setCartCount((prev) => Math.max(0, prev - 1));
		} else {
			setCartCount(99);
			setTimeout(() => setCartCount(0), 2000);
		}
	};

	return (
		<div
			className={`decay-atmosphere min-h-screen bg-purple-50 overflow-hidden relative ${shake ? "animate-shake" : ""}`}
		>
			<div className="decay-scanlines" aria-hidden />
			<div className="decay-grain bg-static" aria-hidden />
			{/* Små «krummer» som faller — forfall i lufta */}
			<div
				className="decay-crumb pointer-events-none fixed left-[8%] top-[12%] h-1.5 w-1.5 rounded-full bg-amber-700/40 animate-crumb"
				aria-hidden
			/>
			<div
				className="decay-crumb pointer-events-none fixed left-[72%] top-[18%] h-1 w-1 rounded-full bg-purple-400/35 animate-crumb-delayed"
				aria-hidden
			/>
			<div
				className="decay-crumb pointer-events-none fixed left-[40%] top-[8%] h-1 w-1.5 rounded-full bg-pink-500/30 animate-crumb"
				style={{ animationDelay: "2s" }}
				aria-hidden
			/>
			<div className="decay-content">
			{/* Broken header — ustabil «strøm» */}
			<header className="bg-yellow-200 p-3 flex justify-between items-center animate-glitch animate-power-flicker border-b-2 border-amber-300/60">
				<div className="flex items-center gap-1">
					<Rabbit className="h-6 w-6 animate-spin-slow text-purple-500" />
					<h1 className="text-lg font-bold glitch-text text-purple-700">
						Bakermester Harepus
					</h1>
				</div>
				<nav className="rotate-3 animate-float">
					<ul className="flex gap-2 text-sm">
						<li className="hover:animate-bounce">
							<Link href="/butikk" className="broken-link text-pink-600">
								B<span className="animate-flicker">u</span>tikk
							</Link>
						</li>
						<li className="hover:animate-bounce">
							<Link href="/om" className="broken-link text-green-600">
								O<span className="text-yellow-500 animate-pulse">m</span>
							</Link>
						</li>
						<li className="hover:animate-bounce">
							<Link href="/kontakt" className="broken-link text-blue-500">
								K<span className="invisible">o</span>ntakt
							</Link>
						</li>
					</ul>
				</nav>
				<div className="relative">
					<ShoppingCart className="h-6 w-6 animate-wiggle text-purple-600" />
					<span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-blink">
						{cartCount}
					</span>
				</div>
			</header>

			{/* Main content area */}
			<main className="container mx-auto p-3 relative">
				{/* Falling elements - Easter themed */}
				<div className="absolute top-0 left-1/4 animate-fall-slow animate-decay-drift">
					<div className="bg-yellow-100 p-3 shadow-md rotate-12 text-sm border-2 border-pink-300 decay-mold-border">
						<h3 className="text-base font-bold text-purple-600">Påsketilbud</h3>
						<ul className="list-disc pl-4 text-pink-700">
							<li>Påskeboller</li>
							<li>Sjokoladeegg</li>
							<li className="text-red-500">Utsolgt</li>
						</ul>
					</div>
				</div>

				<div className="absolute top-20 right-10 animate-fall-medium animate-decay-drift-slow">
					<div className="bg-green-100 p-2 shadow-md -rotate-6 text-xs border-2 border-yellow-300 decay-mold-border">
						<p className="text-purple-600">
							Rabattkode: <span className="line-through">PÅSKE2025</span>
						</p>
						<p className="text-red-500">Ugyldig kode</p>
					</div>
				</div>

				{/* Hero section - broken */}
				<section className="mt-8 bg-pink-50 p-4 shadow-lg relative overflow-hidden skew-x-1 border-2 border-yellow-300 animate-structural-sway decay-mold-border">
					<div className="absolute top-0 right-0 bg-purple-500 text-white px-2 py-1 animate-blink text-xs">
						<span className="flex items-center gap-1">
							<AlertTriangle className="h-3 w-3" />
							Påskeharen Forsvunnet
						</span>
					</div>

					<h2 className="text-2xl font-bold mb-3 glitch-text-severe text-purple-700">
						Velkommen til <span className="line-through">Påskebutikken</span>{" "}
						Katastrofen
					</h2>

					<div className="flex flex-col gap-4 items-center">
						<div className="w-full prose glitchy-text text-sm">
							<p className="animate-text-corrupt text-blue-600">
								Vi opplever noen{" "}
								<span className="text-red-500">tekniske problemer</span> med
								påskebutikken vår. Våre{" "}
								<span className="animate-float inline-block text-purple-600">
									påskeharer
								</span>{" "}
								jobber hardt for å fikse problemene.
							</p>

							<p className="mt-3 animate-text-corrupt-delay text-green-600">
								Vær tålmodig mens vi{" "}
								<span className="text-blue-500">forsøker</span> å få butikken
								opp igjen. I mellomtiden, nyt{" "}
								<span className="text-pink-500">påskekaoset</span>!
							</p>

							<div className="flex flex-col sm:flex-row gap-2 mt-3">
								<button
									type="button"
									className="bg-gradient-to-r from-yellow-400 to-pink-400 text-purple-900 px-4 py-2 rounded hover:animate-wiggle flex-1 font-bold"
									onClick={handleSecretClick}
								>
									Påskens Spesial (Klikk På Eget Ansvar)
								</button>

								{/* <Link
									href="/nettbutikk-fikset"
									className="bg-green-100 text-green-800 px-4 py-2 rounded text-center text-sm flex-1 border border-green-300"
								>
									Prøv den fikset versjonen
								</Link> */}
							</div>
						</div>

						<div className="w-full relative h-48 animate-glitch-image">
							<div className="absolute inset-0 bg-static opacity-30 z-10" />
							<Image
								src="/hint.png"
								alt="Mystisk Påskeegg"
								width={400}
								height={300}
								className="object-contain w-full h-full broken-image hover:animate-glitch-hover transform hover:scale-110 transition-transform duration-300"
								style={{
									filter: "hue-rotate(45deg) contrast(150%) brightness(110%)",
									mixBlendMode: "multiply",
								}}
							/>
							<div className="absolute bottom-0 left-0 right-0 bg-purple-500 text-white text-center py-1 animate-slide-in-out text-xs">
								Mystisk Påskeegg Oppdaget: Prøv å klikk!
							</div>
						</div>
					</div>
				</section>

				{/* Error messages — dra for å avdekke bildet under (mus / touch) */}
				<section
					className="mt-6"
					aria-label="Feilmeldinger som kan dras — bilde under"
				>
					<p className="mb-2 text-xs text-purple-600/90 sm:text-sm">
						Tips: Dra på de gule boksene for å se hva som skjuler seg bak.
					</p>
					<div
						ref={errorLayerRef}
						className="relative min-h-[min(360px,55vh)] w-full overflow-hidden rounded-lg border-2 border-dashed border-pink-300/50 bg-purple-950/25"
					>
						<div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-md">
							<Image
								src="/hint.png"
								alt=""
								fill
								className="object-cover object-center opacity-[0.97]"
								sizes="(max-width: 768px) 100vw, 896px"
							/>
							<div
								className="absolute inset-0 bg-gradient-to-b from-fuchsia-950/25 via-transparent to-purple-950/45"
								aria-hidden
							/>
						</div>
						{errorMessages.map((entry, i) => {
							const pos = errorPositions[entry.id] ?? {
								x: 8,
								y: 8 + i * 56,
							};
							const rot = (stable01(i, 99) - 0.5) * 6;
							const z =
								draggingErrorId === entry.id ? 100 : 20 + i;
							return (
								<DraggableErrorCard
									key={entry.id}
									entry={entry}
									position={pos}
									rotationDeg={rot}
									zIndex={z}
									containerRef={errorLayerRef}
									animationDelay={`${i * 0.2}s`}
									onPositionChange={(id, nextPos) => {
										setErrorPositions((p) => ({
											...p,
											[id]: nextPos,
										}));
									}}
									onDragStart={setDraggingErrorId}
									onDragEnd={() => setDraggingErrorId(null)}
								/>
							);
						})}
					</div>
				</section>

				{/* Product section header */}
				<div className="mt-8 flex justify-between items-center">
					<h2 className="text-xl font-bold glitch-text text-purple-700">
						Våre Påskeprodukter
					</h2>
					<div className="flex items-center gap-2 animate-float">
						<span className="text-sm text-green-600">Sorter etter:</span>
						<select className="text-sm border-2 border-yellow-300 rounded p-1 animate-input-glitch bg-pink-50 text-purple-600">
							<option>Popularitet</option>
							<option>Pris: Lav til Høy</option>
							<option>Pris: Høy til Lav</option>
							<option>404 Påskeegg Ikke Funnet</option>
						</select>
					</div>
				</div>

				{/* Broken products section */}
				<section className="mt-4 grid grid-cols-1 gap-4">
					{brokenProducts.map((product) => (
						<div
							key={product.id || `product-${product.name}`}
							className="bg-green-50 p-3 shadow-md relative overflow-hidden hover:animate-glitch-hover border-2 border-yellow-300 decay-mold-border"
							style={{
								transform: `rotate(${productDecay[product.id]?.rot ?? 0}deg)`,
							}}
						>
							<div className="flex flex-col sm:flex-row gap-3">
								<div className="h-32 w-32 bg-pink-100 flex items-center justify-center relative mx-auto sm:mx-0 border-2 border-purple-200">
									<div className="absolute inset-0 bg-static opacity-20" />
									<div className="text-purple-400 flex flex-col items-center">
										{React.createElement(product.icon, {
											className: "h-8 w-8 mb-1",
										})}
										<span className="text-xs">Bilde Ikke Tilgjengelig</span>
									</div>
								</div>

								<div className="flex-1">
									<div className="flex justify-between">
										<h3 className="text-lg font-bold mb-1 glitch-text text-purple-700">
											{product.name}
										</h3>
										<span className="text-lg font-bold corrupt-text animate-text-corrupt text-pink-600">
											{product.price}
										</span>
									</div>
									<p className="text-blue-600 corrupt-text text-sm mb-3">
										{product.description}
									</p>

									<div className="flex justify-between items-center">
										<div className="flex items-center gap-1">
											<span className="text-xs bg-yellow-100 px-2 py-1 rounded animate-blink text-purple-700 border border-pink-300">
												{productDecay[product.id]?.inStock
													? "På lager"
													: "Utsolgt"}
											</span>
											{productDecay[product.id]?.showAllergen && (
												<span className="text-xs bg-purple-100 px-2 py-1 rounded text-pink-600 border border-yellow-300">
													Påskeallergen
												</span>
											)}
										</div>

										<button
											type="button"
											className="bg-yellow-400 text-purple-800 px-3 py-1 rounded text-sm hover:bg-yellow-500 animate-button-glitch flex items-center gap-1 font-bold"
											onClick={handleAddToCart}
										>
											<ShoppingCart className="h-3 w-3" />
											Legg i Påskekurv
										</button>
									</div>
								</div>
							</div>

							{productDecay[product.id]?.showCorner && (
								<div className="absolute bottom-0 right-0 bg-pink-300 text-purple-800 text-xs px-2 py-1 animate-blink">
									{productDecay[product.id]?.cornerLabel}
								</div>
							)}
						</div>
					))}
				</section>

				{/* Broken checkout section */}
				<section className="mt-8 bg-blue-50 p-4 shadow-lg relative overflow-hidden border-2 border-pink-300 decay-mold-border animate-structural-sway">
					<h2 className="text-xl font-bold mb-3 animate-text-corrupt text-purple-700">
						Påskekurv <span className="text-red-500">(Ødelagt)</span>
					</h2>

					<div className="border-t border-b border-yellow-300 py-3 mb-3">
						<div className="flex justify-between items-center mb-2">
							<div className="flex items-center gap-2">
								<div className="h-8 w-8 bg-yellow-200 rounded-full flex items-center justify-center">
									<Egg className="h-4 w-4 text-purple-500" />
								</div>
								<span className="text-sm corrupt-text text-green-600">
									Påskebolle Deluxe
								</span>
							</div>
							<span className="text-sm animate-text-corrupt text-pink-600">
								39,90 kr
							</span>
						</div>

						<div className="flex justify-between items-center mb-2">
							<div className="flex items-center gap-2">
								<div className="h-8 w-8 bg-pink-200 rounded-full flex items-center justify-center">
									<Cookie className="h-4 w-4 text-purple-500" />
								</div>
								<span className="text-sm corrupt-text text-green-600">
									Sjokoladeegg
								</span>
							</div>
							<span className="text-sm animate-text-corrupt text-pink-600">
								45,00 kr
							</span>
						</div>

						<div className="flex justify-between items-center text-red-500">
							<div className="flex items-center gap-2">
								<div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
									<Bug className="h-4 w-4 text-red-400" />
								</div>
								<span className="text-sm corrupt-text">FEIL#404</span>
							</div>
							<span className="text-sm animate-text-corrupt">???</span>
						</div>
					</div>

					<div className="flex justify-between mb-4">
						<span className="font-bold text-purple-700">Total:</span>
						<span className="font-bold animate-text-corrupt text-pink-600">
							{totalPrice}
						</span>
					</div>

					<button
						type="button"
						className="bg-yellow-400 text-purple-800 px-4 py-2 rounded hover:bg-yellow-500 animate-button-glitch w-full text-sm flex items-center justify-center gap-2 font-bold"
						onClick={(e) => {
							e.preventDefault();
							alert("Påskebetalingssystem utilgjengelig");
						}}
					>
						<CreditCard className="h-4 w-4" />
						Gå til Påskebetaling (Virker Ikke)
					</button>

					<div className="mt-3 bg-pink-100 border-l-4 border-purple-400 text-purple-700 p-3 animate-slide-in text-sm">
						<p className="font-bold flex items-center gap-1">
							<AlertTriangle className="h-4 w-4" />
							Påskeadvarsel
						</p>
						<p>
							Betalingssystemet er for øyeblikket utilgjengelig på grunn av
							påskeferie.
						</p>
					</div>
				</section>
			</main>

			{/* Broken footer */}
			<footer className="bg-purple-800 text-white p-4 mt-8 relative overflow-hidden">
				<div className="container mx-auto">
					<div className="flex flex-col space-y-4">
						<div className="animate-float">
							<h3 className="text-lg font-bold mb-2 glitch-text text-yellow-200">
								Om Bakermester Harepus
							</h3>
							<p className="corrupt-text text-sm text-pink-200">
								Vi har bakt de beste påskeverkene i byen siden 1995, men nå er
								påskebutikken vår ødelagt.
							</p>
						</div>

						<div className="animate-float-delay">
							<h3 className="text-lg font-bold mb-2 glitch-text text-yellow-200">
								Påskeåpningstider
							</h3>
							<ul className="space-y-1 text-sm text-pink-200">
								<li>
									Påskeaften: <span className="line-through">09:00-16:00</span>{" "}
									<span className="text-red-400">STENGT</span>
								</li>
								<li>
									1. Påskedag: <span className="line-through">10:00-14:00</span>{" "}
									<span className="text-red-400">STENGT</span>
								</li>
								<li>
									2. Påskedag: <span className="line-through">10:00-14:00</span>{" "}
									<span className="text-red-400">STENGT</span>
								</li>
							</ul>
						</div>

						<div className="animate-float-more-delay">
							<h3 className="text-lg font-bold mb-2 glitch-text text-yellow-200">
								Påskenyhetsbrev
							</h3>
							<p className="mb-2 corrupt-text text-sm text-pink-200">
								Abonner på nyhetsbrevet vårt for å motta oppdateringer og
								påskerabattkoder.
							</p>
							<div className="flex">
								<input
									type="email"
									className="bg-purple-700 text-white px-3 py-2 rounded-l w-full animate-input-glitch text-sm border border-yellow-300"
									placeholder="Din e-post..."
								/>
								<button
									type="button"
									className="bg-yellow-400 text-purple-800 px-3 py-2 rounded-r hover:bg-yellow-500 animate-button-glitch text-sm font-bold"
								>
									Abonner
								</button>
							</div>
						</div>
					</div>

					<div className="mt-6 pt-4 border-t border-purple-600 text-center animate-text-corrupt text-sm">
						<p className="text-yellow-200">
							&copy; 2023-2024 Bakermester Harepus AS. Alle påskerettigheter{" "}
							<span className="line-through">reservert</span> ødelagt.
						</p>
					</div>
				</div>

				{/* Construction elements */}
				<div className="absolute bottom-0 left-0 animate-bounce-slow">
					<Egg className="h-8 w-8 text-yellow-300" />
				</div>

				<div className="absolute top-0 right-0 animate-spin-slow">
					<Rabbit className="h-6 w-6 text-pink-300" />
				</div>
			</footer>
			</div>

			{/* Floating error messages - Easter themed (over vignette) */}
			<div className="fixed top-1/4 left-10 bg-pink-500 text-white p-2 rounded animate-float z-[60] opacity-85 text-xs shadow-lg shadow-black/20">
				Påskebetalingssystem nede
			</div>

			<div className="fixed bottom-1/3 right-10 bg-yellow-500 text-purple-800 p-2 rounded animate-float-delay z-[60] opacity-85 text-xs font-bold shadow-lg shadow-black/15">
				Påskeegg overopphetet
			</div>

			{/* Easter egg */}
			{showEasterEgg && (
				<div className="fixed inset-0 flex items-center justify-center z-[70] bg-black bg-opacity-70">
					<div className="bg-yellow-100 p-4 rounded-lg shadow-lg max-w-xs text-center animate-bounce-in mx-4 border-4 border-pink-400">
						<h3 className="text-xl font-bold mb-3 text-purple-700">
							🐰 Påskens Spesial! 🥚
						</h3>
						<p className="mb-3 text-sm text-green-600">
							Gratulerer! Du har funnet påskens spesial: Gigantisk sjokoladeegg
							med 50% rabatt!
						</p>
						<p className="text-xs text-pink-600">
							Dessverre er påskebestillingssystemet nede. 😉
						</p>
					</div>
				</div>
			)}

			{/* Random popup errors - Easter themed */}
			{showFaultToast && (
				<div className="fixed bottom-4 right-4 bg-yellow-100 border-2 border-pink-300 shadow-lg p-3 rounded animate-slide-in z-[60] max-w-[250px] decay-mold-border">
					<div className="flex items-start">
						<div className="flex-shrink-0 text-purple-500">
							<AlertTriangle className="h-4 w-4" />
						</div>
						<div className="ml-2">
							<h3 className="text-xs font-medium text-purple-700">Påskefeil</h3>
							<div className="mt-1 text-xs text-green-600">
								<p>
									En uventet feil har oppstått i påskeeggproduksjonen. Vennligst
									prøv igjen senere.
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
