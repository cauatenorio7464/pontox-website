import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders } from "next/font/google";
import { company } from "@/data/company";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Fonte de letreiro (letras caixa de fachada): usada só no H1 e H2 do início.
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-sign-face",
  display: "swap",
  adjustFontFallback: false,
});

const title = "Ponto X Comunicação Visual | Fachadas, Letreiros e Plotagens em Maceió";
const description =
  "Fachadas, letreiros, lonas, wind banners, plotagem de veículos, adesivos, acrílicos, displays e material gráfico em Maceió desde 2007. Solicite seu orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: company.name,
    title,
    description,
    images: [{ url: "/brand/og-image.jpg", width: 1200, height: 630, alt: "Loja com a identidade visual completa da Ponto X: fachada, letreiro, totem, wind banner e carro plotado." }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/brand/og-image.jpg"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#12141c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  description,
  url: company.siteUrl,
  image: `${company.siteUrl}/brand/og-image.jpg`,
  logo: `${company.siteUrl}/brand/logo-pontox.png`,
  telephone: "+55 82 3231-3587",
  email: company.email,
  foundingDate: String(company.foundedYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.address.street}, ${company.address.complement}`,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: [company.instagram.url],
  hasMap: company.mapsUrl,
  areaServed: "Maceió – AL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${bigShoulders.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only-focusable fixed left-4 top-4 z-[100] bg-red px-4 py-3 font-bold text-white"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
