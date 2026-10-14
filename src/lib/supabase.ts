// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Faltan las credenciales de Supabase en el archivo .env.local");
}

// Cliente con privilegios de servidor (Service Role)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);