import { Oswald, Barlow } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { PlanProvider } from "@/components/PlanProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 2500,
              style: {
                background: "#1d2023",
                color: "#fff",
                border: "1px solid #2b2f33",
                fontSize: "0.95rem",
              },
              success: { iconTheme: { primary: "#ccff00", secondary: "#0c0d0e" } },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
