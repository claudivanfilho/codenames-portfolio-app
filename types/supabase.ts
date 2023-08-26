export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      matches: {
        Row: {
          correct_words: string[]
          created_at: string
          id: number
          room_id: number
        }
        Insert: {
          correct_words: string[]
          created_at?: string
          id?: number
          room_id: number
        }
        Update: {
          correct_words?: string[]
          created_at?: string
          id?: number
          room_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "matches_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          }
        ]
      }
      players: {
        Row: {
          created_at: string
          id: number
          role: string
          room_id: number | null
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: number
          role: string
          room_id?: number | null
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          id?: number
          role?: string
          room_id?: number | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rooms: {
        Row: {
          correct_guesses: string[]
          created_at: string
          created_by: string
          current_tip: string | null
          current_tip_number: number | null
          game_state: string
          id: number
          name: string
          rounds_left: number
          words: string[]
          wrong_guesses: string[]
        }
        Insert: {
          correct_guesses: string[]
          created_at?: string
          created_by: string
          current_tip?: string | null
          current_tip_number?: number | null
          game_state?: string
          id?: number
          name: string
          rounds_left: number
          words: string[]
          wrong_guesses: string[]
        }
        Update: {
          correct_guesses?: string[]
          created_at?: string
          created_by?: string
          current_tip?: string | null
          current_tip_number?: number | null
          game_state?: string
          id?: number
          name?: string
          rounds_left?: number
          words?: string[]
          wrong_guesses?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "rooms_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
