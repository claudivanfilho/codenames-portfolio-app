"use client";

import { useParams, usePathname } from "next/navigation";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";
import LeaveRoomBtn from "./LeaveRoomBtn";

export default function Navbar() {
  const params = useParams();
  const pathname = usePathname();
  const isLogged = pathname !== "/login";

  return (
    <nav className="flex items-center justify-between w-full h-16 px-6 border-b bg-opacity-90 bg-base-200 border-b-foreground/10">
      <Logo size={30} className="text-lg" />
      <div className="flex gap-2 sm:gap-4">
        {params.id && <LeaveRoomBtn roomId={+params.id} className="btn-outline" />}
        {isLogged && <LogoutButton />}
      </div>
    </nav>
  );
}
