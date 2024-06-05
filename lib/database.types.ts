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
      game_user: {
        Row: {
          created_at: string
          game_id: string
          n_actions: number
          user_id: string
        }
        Insert: {
          created_at?: string
          game_id: string
          n_actions?: number
          user_id: string
        }
        Update: {
          created_at?: string
          game_id?: string
          n_actions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_user_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_user_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "user_related_games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      games: {
        Row: {
          created_at: string
          created_by: string
          grid: string[]
          id: string
          password: string
          puzzle_id: string
          updated_at: string
          game_ended_at: string | null
          status: Database["public"]["Enums"]["game_status"]
        }
        Insert: {
          created_at?: string
          created_by?: string
          grid?: string[]
          id?: string
          password?: string
          puzzle_id: string
          updated_at?: string
          game_ended_at?: string | null
          status?: Database["public"]["Enums"]["game_status"]


        }
        Update: {
          created_at?: string
          created_by?: string
          grid?: string[]
          id?: string
          password?: string
          puzzle_id?: string
          updated_at?: string
          game_ended_at?: string | null
          status?: Database["public"]["Enums"]["game_status"]


        }
        Relationships: [
          {
            foreignKeyName: "games_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_puzzle_id_fkey"
            columns: ["puzzle_id"]
            isOneToOne: false
            referencedRelation: "puzzles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          raw_user_meta_data: {
            name: string | null
            picture: string | null
          }
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      puzzles: {
        Row: {
          answers: Json
          circles: boolean[] | null
          clues: Json
          cols: number
          created_at: string
          created_by: string | null
          grid: string[]
          gridnums: number[]
          id: string
          name: string | null
          rows: number
        }
        Insert: {
          answers?: Json
          circles?: boolean[] | null
          clues?: Json
          cols: number
          created_at?: string
          created_by?: string | null
          grid: string[]
          gridnums: number[]
          id?: string
          name?: string | null
          rows: number
        }
        Update: {
          answers?: Json
          circles?: boolean[] | null
          clues?: Json
          cols?: number
          created_at?: string
          created_by?: string | null
          grid?: string[]
          gridnums?: number[]
          id?: string
          name?: string | null
          rows?: number
        }
        Relationships: [
          {
            foreignKeyName: "puzzles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      status_of_game: {
        Row: {
          game_ended_at: string | null
          id: string
          status: Database["public"]["Enums"]["game_status"]
        }
        Insert: {
          game_ended_at?: string | null
          id: string
          status?: Database["public"]["Enums"]["game_status"]
        }
        Update: {
          game_ended_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["game_status"]
        }
        Relationships: [
          {
            foreignKeyName: "status_of_game_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "status_of_game_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_related_games"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      user_related_games: {
        Row: {
          created_at: string | null
          created_by: string | null
          grid: string[] | null
          id: string | null
          password: string | null
          puzzle_id: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_puzzle_id_fkey"
            columns: ["puzzle_id"]
            isOneToOne: false
            referencedRelation: "puzzles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      update_grid_element: {
        Args: {
          game_id: string
          grid_index: number
          new_value: string
        }
        Returns: undefined
      }
      user_has_game_access: {
        Args: {
          game_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      game_status: "ongoing" | "completed" | "abandoned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
