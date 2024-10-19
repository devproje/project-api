import "./globals.scss";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import "bootstrap-icons/font/bootstrap-icons.scss";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "Project_IO's Website",
    description: "Project_IO's Personal Hosted Website"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
