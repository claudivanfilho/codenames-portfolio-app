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
          guesser: string | null
          helper: string
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
          guesser?: string | null
          helper: string
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
          guesser?: string | null
          helper?: string
          id?: number
          name?: string
          rounds_left?: number
          words?: string[]
          wrong_guesses?: string[]
        }
        Relationships: []
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
