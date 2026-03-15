import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import type { ReactNode } from "react";

export const metadata = {
	title: { default: "Mobbin CLI & SDK", template: "%s | Mobbin CLI" },
	description:
		"CLI et SDK TypeScript non officiels pour Mobbin — recherchez, explorez et telechargez des references de design UI depuis votre terminal.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
