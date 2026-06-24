// Hand-written types mirroring the LCM schema (see scripts/seed.mjs / README for the SQL).
// These tables are isolated from this Supabase project's other pre-existing tables.

export type BookingStatus = "new" | "confirmed" | "in_progress" | "completed" | "cancelled";

export interface VehicleSpecs {
  gvw?: string;
  engine?: string;
  power?: string;
  torque?: string;
  payload?: string;
  fuel_type?: string;
  transmission?: string;
  wheelbase?: string;
  fuel_tank?: string;
  [key: string]: string | undefined;
}

export interface Database {
  public: {
    Tables: {
      vehicle_categories: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_si: string;
          name_ta: string;
          icon: string | null;
          image: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["vehicle_categories"]["Row"]> & {
          slug: string;
          name_en: string;
          name_si: string;
          name_ta: string;
        };
        Update: Partial<Database["public"]["Tables"]["vehicle_categories"]["Row"]>;
        Relationships: [];
      };
      vehicles: {
        Row: {
          id: string;
          category_id: string;
          slug: string;
          name: string;
          tagline: string | null;
          hero_image: string | null;
          gallery: string[];
          price_from: number | null;
          specs: VehicleSpecs;
          brochure_url: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["vehicles"]["Row"]> & {
          category_id: string;
          slug: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["vehicles"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "vehicles_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "vehicle_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      vehicle_variants: {
        Row: {
          id: string;
          vehicle_id: string;
          name: string;
          price: number | null;
          specs: VehicleSpecs;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["vehicle_variants"]["Row"]> & {
          vehicle_id: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["vehicle_variants"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "vehicle_variants_vehicle_id_fkey";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          },
        ];
      };
      branches: {
        Row: {
          id: string;
          name: string;
          address: string;
          district: string | null;
          phone: string | null;
          email: string | null;
          lat: number | null;
          lng: number | null;
          hours: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["branches"]["Row"]> & {
          name: string;
          address: string;
        };
        Update: Partial<Database["public"]["Tables"]["branches"]["Row"]>;
        Relationships: [];
      };
      service_bookings: {
        Row: {
          id: string;
          reference: string;
          vehicle_model: string;
          registration_no: string;
          mileage: number | null;
          reg_year: number | null;
          service_type: string;
          service_option: string;
          branch_id: string | null;
          booking_date: string;
          time_slot: string | null;
          title: string | null;
          first_name: string;
          last_name: string;
          company: string | null;
          fleet_size: string | null;
          email: string;
          phone: string;
          message: string | null;
          status: BookingStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["service_bookings"]["Row"]> & {
          reference: string;
          vehicle_model: string;
          registration_no: string;
          service_type: string;
          service_option: string;
          booking_date: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
        };
        Update: Partial<Database["public"]["Tables"]["service_bookings"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "service_bookings_branch_id_fkey";
            columns: ["branch_id"];
            isOneToOne: false;
            referencedRelation: "branches";
            referencedColumns: ["id"];
          },
        ];
      };
      test_drive_bookings: {
        Row: {
          id: string;
          reference: string;
          vehicle_id: string | null;
          first_name: string;
          last_name: string;
          company: string | null;
          email: string;
          phone: string;
          preferred_date: string | null;
          branch_id: string | null;
          message: string | null;
          status: BookingStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["test_drive_bookings"]["Row"]> & {
          reference: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
        };
        Update: Partial<Database["public"]["Tables"]["test_drive_bookings"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "test_drive_bookings_vehicle_id_fkey";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "test_drive_bookings_branch_id_fkey";
            columns: ["branch_id"];
            isOneToOne: false;
            referencedRelation: "branches";
            referencedColumns: ["id"];
          },
        ];
      };
      parts_enquiries: {
        Row: {
          id: string;
          reference: string;
          vehicle_model: string | null;
          part_name: string | null;
          part_number: string | null;
          quantity: number | null;
          company: string | null;
          name: string;
          email: string;
          phone: string;
          message: string | null;
          status: BookingStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["parts_enquiries"]["Row"]> & {
          reference: string;
          name: string;
          email: string;
          phone: string;
        };
        Update: Partial<Database["public"]["Tables"]["parts_enquiries"]["Row"]>;
        Relationships: [];
      };
      general_enquiries: {
        Row: {
          id: string;
          source_page: string | null;
          vehicle_id: string | null;
          name: string;
          company: string | null;
          email: string;
          phone: string | null;
          message: string | null;
          status: BookingStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["general_enquiries"]["Row"]> & {
          name: string;
          email: string;
        };
        Update: Partial<Database["public"]["Tables"]["general_enquiries"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "general_enquiries_vehicle_id_fkey";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type VehicleCategory = Database["public"]["Tables"]["vehicle_categories"]["Row"];
export type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];
export type VehicleVariant = Database["public"]["Tables"]["vehicle_variants"]["Row"];
export type Branch = Database["public"]["Tables"]["branches"]["Row"];
export type ServiceBooking = Database["public"]["Tables"]["service_bookings"]["Row"];
export type TestDriveBooking = Database["public"]["Tables"]["test_drive_bookings"]["Row"];
export type PartsEnquiry = Database["public"]["Tables"]["parts_enquiries"]["Row"];
export type GeneralEnquiry = Database["public"]["Tables"]["general_enquiries"]["Row"];
