
/* =====================================
   VELORA TAP - SUPABASE CONFIGURATION
   ===================================== */

// Replace these two values with your
// Supabase project details.

const SUPABASE_URL = "https://oxhympbowvttsffrvuwz.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_k2-dpsZmkOdzRy35_BA4lQ_w6rMCk4S";

// Initialize Supabase connection
const { createClient } = window.supabase;

const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Make client available to app.js
window.supabaseClient = supabaseClient;

console.log("VELORA TAP: Supabase configuration loaded.");
