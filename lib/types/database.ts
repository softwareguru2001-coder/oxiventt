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
      products: {
        Row: {
          id: string
          name: string
          slug: string
          sku: string | null
          category: string
          description: string | null
          specs: Json
          sizes: Json
          price: number | null
          is_price_visible: boolean
          featured: boolean
          images: string[]
          brochure_path: string | null
          video_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sku?: string | null
          category?: string
          description?: string | null
          specs?: Json
          sizes?: Json
          price?: number | null
          is_price_visible?: boolean
          featured?: boolean
          images?: string[]
          brochure_path?: string | null
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sku?: string | null
          category?: string
          description?: string | null
          specs?: Json
          sizes?: Json
          price?: number | null
          is_price_visible?: boolean
          featured?: boolean
          images?: string[]
          brochure_path?: string | null
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          type: 'brochure' | 'quote' | 'whatsapp'
          product_id: string | null
          name: string | null
          company: string | null
          mobile: string
          email: string | null
          city: string | null
          message: string | null
          utm: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          type: 'brochure' | 'quote' | 'whatsapp'
          product_id?: string | null
          name?: string | null
          company?: string | null
          mobile: string
          email?: string | null
          city?: string | null
          message?: string | null
          utm?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'brochure' | 'quote' | 'whatsapp'
          product_id?: string | null
          name?: string | null
          company?: string | null
          mobile?: string
          email?: string | null
          city?: string | null
          message?: string | null
          utm?: Json | null
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          role: string
          created_at: string
        }
        Insert: {
          id: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          role?: string
          created_at?: string
        }
      }
    }
  }
}
