"use client";

import { useParams, usePathname } from "next/navigation";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const params = useParams();
  const pathname = usePathname();

  const isLogged = pathname !== "/login";

  return (
    <nav className="flex items-center justify-between w-full h-16 px-6 border-b bg-opacity-90 bg-base-200 border-b-foreground/10">
      <Logo size={30} className="text-lg" />
      <div className="flex gap-2 sm:gap-4">
        {params.id && (
          <form action={`/api/room/${params.id}/leave`} method="POST">
            <button className="flex mr-2 btn btn-sm btn-outline">
              <span className="hidden sm:flex">Leave Room</span>
              <span className="block sm:hidden">Leave</span>
            </button>
          </form>
        )}
        {isLogged && <LogoutButton />}
      </div>
    </nav>
  );
}
