import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import type { ReactNode } from "react";

export const metadata = {
	title: { default: "Mobbin CLI & SDK", template: "%s | Mobbin CLI" },
	description:
		"Unofficial TypeScript CLI and SDK for Mobbin — search, explore and download UI design references from your terminal.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
