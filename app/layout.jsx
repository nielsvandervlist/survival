import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "../contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SurvivalReady - Expert Survival Gear Reviews & Preparedness Guides",
  description:
    "Unbiased reviews of survival gear and emergency preparedness equipment. Expert-tested recommendations to help you make informed decisions for your family's safety.",
}

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
