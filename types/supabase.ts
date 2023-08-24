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
      rooms: {
        Row: {
          correct_guesses: string[]
          created_at: string
          current_tip: string | null
          current_tip_number: number | null
          game_state: string
          guesser_id: string | null
          guesser_name: string | null
          helper_id: string
          helper_name: string
          id: number
          name: string
          rounds_left: number
          words: string[]
          wrong_guesses: string[]
        }
        Insert: {
          correct_guesses: string[]
          created_at?: string
          current_tip?: string | null
          current_tip_number?: number | null
          game_state?: string
          guesser_id?: string | null
          guesser_name?: string | null
          helper_id: string
          helper_name: string
          id?: number
          name: string
          rounds_left: number
          words: string[]
          wrong_guesses: string[]
        }
        Update: {
          correct_guesses?: string[]
          created_at?: string
          current_tip?: string | null
          current_tip_number?: number | null
          game_state?: string
          guesser_id?: string | null
          guesser_name?: string | null
          helper_id?: string
          helper_name?: string
          id?: number
          name?: string
          rounds_left?: number
          words?: string[]
          wrong_guesses?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "rooms_guesser_id_fkey"
            columns: ["guesser_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_helper_id_fkey"
            columns: ["helper_id"]
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
