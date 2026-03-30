import * as React from "react";

export function canVibrate(): boolean {
	return (
		typeof navigator !== "undefined" &&
		typeof navigator.vibrate === "function"
	);
}

/** Stopp pågående vibrasjon (0) eller kjør mønster. Ingen effekt uten støtte. */
export function vibrateIfSupported(pattern: number | number[]): void {
	if (!canVibrate()) return;
	navigator.vibrate(pattern);
}

/** Korte, urolige mønstre — total varighet begrenset for ikke å bli plagsomt. */
const RANDOM_PATTERNS: number[][] = [
	[40],
	[55, 30, 45],
	[28, 22, 28, 22, 28],
	[70],
	[35, 40, 35],
	[32, 18, 32, 18, 32],
	[48, 25, 52],
];

type Options = {
	/** Når false, ingen timer og eventuell vibrasjon stoppes. */
	active: boolean;
};

/**
 * Tilfeldige vibrasjoner med ujevne intervaller (ca. 3,5–10 s).
 * Kun når `active` er true og nettleseren støtter Vibration API (typisk Android).
 */
export function useRandomMobileVibration({ active }: Options) {
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	React.useEffect(() => {
		if (!active || !canVibrate()) {
			if (canVibrate()) navigator.vibrate(0);
			return;
		}

		const schedule = () => {
			const delayMs = 3500 + Math.random() * 6500;
			timeoutRef.current = setTimeout(() => {
				const pattern =
					RANDOM_PATTERNS[Math.floor(Math.random() * RANDOM_PATTERNS.length)];
				navigator.vibrate(pattern);
				schedule();
			}, delayMs);
		};

		schedule();

		return () => {
			if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
			if (canVibrate()) navigator.vibrate(0);
		};
	}, [active]);
}
