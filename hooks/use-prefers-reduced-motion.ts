import * as React from "react";

/**
 * True when the user prefers reduced motion (OS/browser setting).
 * Safe for SSR: false until mounted.
 */
export function usePrefersReducedMotion() {
	const [reduced, setReduced] = React.useState(false);

	React.useEffect(() => {
		const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onChange = () => setReduced(mql.matches);
		setReduced(mql.matches);
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	return reduced;
}
