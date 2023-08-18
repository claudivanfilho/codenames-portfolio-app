import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Room } from "@/models";
import App from "@/components/App";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: rooms } = await supabase
    .from("rooms")
    .select<string, Room>()
    .neq("game_state", "FINISHED")
    .is("guesser", "NULL");

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <nav className="flex items-center justify-between w-full h-16 px-4 border-b border-b-foreground/10">
        <div className="flex items-center justify-between w-full max-w-4xl p-3 font-bold text-white stat-title">
          CODENAMES
        </div>
      </nav>

      <div className="flex items-center justify-center flex-1 w-full p-6 text-foreground bg-background">
        <App rooms={rooms || []} />
      </div>
      <footer className="w-full py-6 text-gray-300 bg-gray-900">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Created By Claudivan Filho.</p>
        </div>
      </footer>
    </div>
  );
}
