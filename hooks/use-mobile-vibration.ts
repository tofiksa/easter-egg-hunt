import * as React from "react";

/* ═══════════════════════════════════════════════════════════════════════
   Vibrasjon-verktøy med AudioContext-fallback for iOS.
   
   Android:  Bruker navigator.vibrate() direkte.
   iOS:      Vibration API finnes ikke. Vi bruker i stedet en
             lavfrekvent oscillator (sub-bass «rumble» ~30-50 Hz) via
             AudioContext som kan kjennes fysisk gjennom telefonens
             høyttaler/Taptic Engine når volumet er på.
   ═══════════════════════════════════════════════════════════════════════ */

// ── Native Vibration API ────────────────────────────────────────────────

export function canVibrate(): boolean {
	return (
		typeof navigator !== "undefined" &&
		typeof navigator.vibrate === "function"
	);
}

// ── iOS-deteksjon ───────────────────────────────────────────────────────

function isIOS(): boolean {
	if (typeof navigator === "undefined") return false;
	return (
		/iPad|iPhone|iPod/.test(navigator.userAgent) ||
		(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
	);
}

// ── AudioContext fallback (iOS) ─────────────────────────────────────────

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
	if (typeof window === "undefined") return null;
	if (audioCtx && audioCtx.state !== "closed") return audioCtx;
	try {
		const Ctor =
			window.AudioContext ||
			(window as unknown as { webkitAudioContext: typeof AudioContext })
				.webkitAudioContext;
		if (!Ctor) return null;
		audioCtx = new Ctor();
		return audioCtx;
	} catch {
		return null;
	}
}

/**
 * Spill en kort lavfrekvent «rumble» via AudioContext.
 * På iOS med volum på kan dette kjennes fysisk gjennom høyttaleren.
 * @param durationMs  Varighet i ms (standard 60).
 * @param freq        Frekvens i Hz (standard 35 — sub-bass rumble).
 */
function audioRumble(durationMs = 60, freq = 35): void {
	const ctx = getAudioContext();
	if (!ctx) return;

	// Sørg for at konteksten kjører (iOS krever resume etter user-gesture)
	if (ctx.state === "suspended") {
		ctx.resume().catch(() => {});
	}

	const osc = ctx.createOscillator();
	const gain = ctx.createGain();

	osc.type = "sine";
	osc.frequency.value = freq;

	// Fade in/ut for å unngå klikk
	const now = ctx.currentTime;
	const dur = durationMs / 1000;
	gain.gain.setValueAtTime(0, now);
	gain.gain.linearRampToValueAtTime(0.8, now + Math.min(dur * 0.15, 0.01));
	gain.gain.linearRampToValueAtTime(0, now + dur);

	osc.connect(gain);
	gain.connect(ctx.destination);

	osc.start(now);
	osc.stop(now + dur);
}

/**
 * Spill et mønster av audio-rumbles som etterligner vibrasjonsmønsteret.
 * Mønsteret [vibrate, pause, vibrate, pause, …] tolkes likt som
 * navigator.vibrate().
 */
function audioRumblePattern(pattern: number[]): void {
	let offset = 0;
	for (let i = 0; i < pattern.length; i++) {
		const ms = pattern[i];
		if (i % 2 === 0) {
			// Partall-indeks = vibrasjon/lyd
			const capturedOffset = offset;
			const capturedMs = ms;
			setTimeout(() => audioRumble(capturedMs, 30 + Math.random() * 20), capturedOffset);
		}
		// Oddetall-indeks = pause (bare hopp over tiden)
		offset += ms;
	}
}

// ── Offentlig API ───────────────────────────────────────────────────────

/**
 * Forsøk å aktivere AudioContext (krever user-gesture på iOS).
 * Kall denne i en click/touch-handler tidlig i brukerreisen.
 */
export function unlockAudioContext(): void {
	const ctx = getAudioContext();
	if (ctx && ctx.state === "suspended") {
		ctx.resume().catch(() => {});
	}
}

/** Stopp pågående vibrasjon (0) eller kjør mønster. Faller tilbake til audio på iOS. */
export function vibrateIfSupported(pattern: number | number[]): void {
	const arr = typeof pattern === "number" ? [pattern] : pattern;

	if (canVibrate()) {
		navigator.vibrate(arr);
		return;
	}

	// Fallback: lavfrekvent audio-rumble (iOS)
	if (isIOS()) {
		audioRumblePattern(arr);
	}
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
	/** Når false, ingen timer og eventuell vibrasjon/audio stoppes. */
	active: boolean;
};

/**
 * Tilfeldige vibrasjoner med ujevne intervaller (ca. 3,5–10 s).
 * Bruker Vibration API på Android, AudioContext-rumble på iOS.
 */
export function useRandomMobileVibration({ active }: Options) {
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	React.useEffect(() => {
		if (!active) {
			if (canVibrate()) navigator.vibrate(0);
			return;
		}

		// Sjekk om vi har noe å jobbe med
		const hasVibration = canVibrate();
		const hasAudioFallback = isIOS();
		if (!hasVibration && !hasAudioFallback) return;

		const schedule = () => {
			const delayMs = 3500 + Math.random() * 6500;
			timeoutRef.current = setTimeout(() => {
				const pattern =
					RANDOM_PATTERNS[Math.floor(Math.random() * RANDOM_PATTERNS.length)];
				vibrateIfSupported(pattern);
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
