import { Header, Providers } from "@/modules/shell";
import { Steps } from "@/shared/components/steps";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minhas Dívidas",
  description: "Escolha uma oferta, a forma de pagamento e confirme o acordo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
      <body
        className="min-h-full bg-[#f4f6f8] font-sans text-slate-900"
        suppressHydrationWarning
      >
        <Providers>
          <Suspense
            fallback={
              <div className="h-[4.25rem] border-b border-[#e6ebf2] bg-white" />
            }
          >
            <Header />
          </Suspense>
          <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6">
            <Suspense fallback={<div className="h-14" />}>
              <Steps />
            </Suspense>
            <div className="mt-8">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
