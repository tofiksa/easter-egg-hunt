import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Bakermester Harepus - Påskebutikk Under Konstruksjon",
	description:
		"Påskebutikken for Bakermester Harepus er under konstruksjon. Vennligst kom tilbake senere.",
	generator: "v0.dev",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="no">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
