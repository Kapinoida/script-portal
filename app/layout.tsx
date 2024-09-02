import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header";
import Navigation from "@/components/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

export const metadata: Metadata = {
  title: "Script Portal",
  description: "A place for scripts to run.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Navigation />
                {children}
              </div>
            </div>
            
          </ThemeProvider>
        </body>
    </html>
  );
}
