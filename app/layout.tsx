import type { Metadata } from "next";
import "./globals.css";
import { LoaderProvider } from "./contexts/LoaderContext";
import dynamic from "next/dynamic";

const LoaderOverlay = dynamic(() => import("./components/LoaderOverlay"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Next.js Dashboard with Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <LoaderProvider>
          {children}
          <LoaderOverlay />
        </LoaderProvider>
      </body>
    </html>
  );
}

