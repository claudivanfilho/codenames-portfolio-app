"use client";

import useUser from "@/app/_hooks/useUser";
import { Player, Room } from "@/types";
import { supabase } from "@/app/_utils/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { FC, createContext, useEffect, useState } from "react";
import useToast from "../_hooks/useToast";

type RoomContextType = {
  room: Room;
  setRoom: (newRoom: Room) => void;
  isHelper: boolean;
  helperName: string;
  guesserName?: string;
  selectedWords: string[];
  setSelectedWords: (words: string[]) => void;
};

export const RoomContext = createContext<RoomContextType>({} as RoomContextType);

export const RoomProvider: FC<React.HtmlHTMLAttributes<Element> & { remoteRoom: Room }> = ({
  children,
  remoteRoom,
}) => {
  const [room, setRoom] = useState(remoteRoom);
  const { show } = useToast();
  const { user } = useUser();
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const isHelper = user.id === room.created_by;
  const helperName = room.created_by_name;
  const guesserName = room.players!.find((player) => player.role === "GUESSER")?.username;

  useEffect(() => {
    const channel = supabase
      .channel("realtime rooms")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${room.id}`,
        },
        (payload: RealtimePostgresChangesPayload<Room>) => {
          const newRoom = payload.new as Room;
          setRoom((oldRoom) => ({
            ...newRoom,
            correct_words: oldRoom.correct_words,
            players: oldRoom.players,
          }));
          if (newRoom.game_state === "FINISHED") {
            const hasLost = newRoom.wrong_guesses.length;
            show(hasLost ? "LOSS" : "WIN");
          }
          if (newRoom.game_state !== room.game_state) {
            if (isHelper && newRoom.game_state === "WAITING_TIP") {
              show("TURN");
            }
            if (!isHelper && newRoom.game_state === "WAITING_GUESSES") {
              show("TURN");
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime players")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "players",
          filter: `room_id=eq.${room.id}`,
        },
        (payload: RealtimePostgresChangesPayload<Player>) => {
          const player = payload.new as Player;
          setRoom((oldRoom) => ({
            ...oldRoom,
            players: [...(oldRoom.players || []), player],
          }));
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "players",
          filter: `room_id=eq.${room.id}`,
        },
        (payload: RealtimePostgresChangesPayload<Player>) => {
          const player = payload.old as Player;
          setRoom((oldRoom) => ({
            ...oldRoom,
            players: oldRoom.players?.filter((p) => p.id !== player.id),
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <RoomContext.Provider
      value={{ room, setRoom, isHelper, selectedWords, helperName, guesserName, setSelectedWords }}
    >
      {children}
    </RoomContext.Provider>
  );
};
