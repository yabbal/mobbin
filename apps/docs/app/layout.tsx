import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import type { ReactNode } from "react";

export const metadata = {
	title: { default: "Mobbin CLI", template: "%s | Mobbin CLI" },
	description:
		"SDK TypeScript & CLI non officiels pour Mobbin — recherche et telechargement de references de design UI",
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
