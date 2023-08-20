import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getUserFromServerComponent } from "@/utils/supabaseServer";

export const metadata = {
  title: "Codenames",
  description:
    "Codenames board game App created with the intention of showcasing a range of software skills",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromServerComponent();

  return (
    <html lang="en">
      <body>
        <div
          className="flex flex-col items-center w-full h-screen"
          style={{ backgroundImage: `url('/images/main-bg.jpg')` }}
        >
          <Navbar user={user} />
          <div className="flex items-center justify-center flex-1 w-full px-6 pt-3 overflow-y-auto text-foreground bg-base-200 bg-opacity-95">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
