import { Egg, Terminal } from "lucide-react";

/**
 * Gyldent påskeegg + «hacker»-terminal — brukes når admin-koden er aktiv.
 */
export function AdminUnlockProductMedia({
	className,
	size = "default",
}: {
	className?: string;
	/** default: butikk-grid; sm: kompakt kort på forsiden */
	size?: "default" | "sm";
}) {
	const eggClass =
		size === "sm"
			? "h-14 w-14 sm:h-16 sm:w-16"
			: "h-24 w-24 sm:h-28 sm:w-28 max-h-[7rem] max-w-[7rem]";
	const termClass = size === "sm" ? "h-7 w-7 sm:h-8 sm:w-8" : "h-12 w-12";

	return (
		<div
			className={`relative flex items-center justify-center ${className ?? ""}`}
			aria-hidden
		>
			<Egg
				className={`${eggClass} text-amber-400 drop-shadow-[0_0_14px_rgba(251,191,36,0.85)]`}
				strokeWidth={1.35}
			/>
			<Terminal
				className={`${termClass} absolute text-purple-950 opacity-95 drop-shadow`}
			/>
		</div>
	);
}
