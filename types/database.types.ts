export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      weekly_schedule: {
        Row: {
          id: string
          class_id: string
          day_of_week: string
          start_time: string
          end_time: string
          created_at: string
        }
        Insert: {
          id?: string
          class_id: string
          day_of_week: string
          start_time: string
          end_time: string
          created_at?: string
        }
        Update: {
          id?: string
          class_id?: string
          day_of_week?: string
          start_time?: string
          end_time?: string
          created_at?: string
        }
      }
      classes: {
        Row: {
          id: string
          name: string
          description: string | null
          capacity: number
        }
      }
      // Add other tables similarly...
    }
  }
}