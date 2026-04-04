import type { LucideIcon } from "lucide-react";
import { Egg } from "lucide-react";

/** Skjult søkekode — viser ikke vanlig katalog, kun admin-kortet. */
export const ADMIN_UNLOCK_CODE = "3210";

export const ADMIN_UNLOCK_PRODUCT_ID = 9001;

export const ADMIN_UNLOCK_NAME =
	"SYSTEM UNLOCKED: ADMIN ACCESS GRANTED";

export const ADMIN_UNLOCK_DESCRIPTION =
	"Gratulerer agenter! Dere har overstyrt ShadowBunny. For å finne de fysiske eggene, må dere gå til فاطمة og"  
	"si det man pleier å si etter maten. Da vil dere få nøkkelen til gjemmestedet som er merket med en påskekylling.";

export const ADMIN_UNLOCK_PRICE = "0 kr";

export function isAdminUnlockQuery(query: string): boolean {
	return query.trim() === ADMIN_UNLOCK_CODE;
}

export const adminUnlockProductBroken = {
	id: ADMIN_UNLOCK_PRODUCT_ID,
	name: ADMIN_UNLOCK_NAME,
	price: ADMIN_UNLOCK_PRICE,
	description: ADMIN_UNLOCK_DESCRIPTION,
	image: "",
	icon: Egg,
} satisfies {
	id: number;
	name: string;
	price: string;
	description: string;
	image: string;
	icon: LucideIcon;
};

export const adminUnlockProductFikset = {
	id: ADMIN_UNLOCK_PRODUCT_ID,
	name: ADMIN_UNLOCK_NAME,
	price: ADMIN_UNLOCK_PRICE,
	description: ADMIN_UNLOCK_DESCRIPTION,
	image: "/placeholder.svg?height=200&width=200",
	icon: Egg,
	/** Brukes ikke i katalog-filter; kun for typing. */
	category: "admin",
} satisfies {
	id: number;
	name: string;
	price: string;
	description: string;
	image: string;
	icon: LucideIcon;
	category: string;
};
