import Logo from "./Logo";
import LogoutButton from "./LogoutButton";
import { User } from "@/app/_models/server";

export default function Navbar({ user }: { user?: User | null }) {
  return (
    <nav className="flex items-center justify-between w-full h-16 px-6 border-b bg-opacity-90 bg-base-200 border-b-foreground/10">
      <Logo size={30} className="text-lg" />
      <div className="flex gap-2 sm:gap-4">
        {user?.user_metadata.room_id && (
          <form action={`/api/room/${user?.user_metadata.room_id}/leave`} method="POST">
            <button className="flex mr-2 btn btn-sm btn-outline">
              <span className="hidden sm:flex">Leave Room</span>
              <span className="block sm:hidden">Leave</span>
            </button>
          </form>
        )}
        {user && <LogoutButton />}
      </div>
    </nav>
  );
}
