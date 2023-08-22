import "./globals.css";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { IntlProviderLocal } from "./_context/IntlContext";
import { cookies } from "next/headers";
import { DEFAULT_LANG } from "./_config/constants";

export const metadata = {
  title: "Codenames",
  description:
    "Codenames board game App created with the intention of showcasing a range of software skills",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = cookies().get("lang")?.value || DEFAULT_LANG;

  return (
    <html lang={locale}>
      <body>
        <div
          className="flex flex-col items-center w-full h-screen"
          style={{ backgroundImage: `url('/images/main-bg.jpg')` }}
        >
          <IntlProviderLocal remoteLocale={locale}>
            <Navbar />
            <div className="flex items-center justify-center flex-1 w-full px-6 pt-3 overflow-y-auto text-foreground bg-base-200 bg-opacity-95">
              {children}
            </div>
            <Footer />
          </IntlProviderLocal>
        </div>
      </body>
    </html>
  );
}
