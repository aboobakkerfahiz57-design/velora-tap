
/* =====================================
   VELORA TAP - APPLICATION
   Admin Authentication
   ===================================== */

const supabase = window.supabaseClient;

// Login form
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

// Display messages
function showMessage(message, isError = false) {
  if (!loginMessage) return;

  loginMessage.textContent = message;
  loginMessage.style.color = isError ? "#ff7777" : "#e7ca88";
}

// Admin login
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!supabase) {
      showMessage("Supabase connection is not configured.", true);
      return;
    }

    showMessage("Signing in...");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      const user = data.user;

      // Verify admin permission in database
      const { data: profile, error: profileError } = await supabase
        .from("admin_profiles")
        .select("is_admin")
        .eq("user_id", user.id)
        .single();

      if (profileError || !profile || profile.is_admin !== true) {
        await supabase.auth.signOut();
        throw new Error("You are not authorised as a VELORA TAP admin.");
      }

      showMessage("Admin login successful!");

      // Redirect to dashboard (to be built next)
      window.location.href = "dashboard.html";

    } catch (error) {
      showMessage(error.message || "Login failed. Please try again.", true);
    }
  });
}

console.log("VELORA TAP application loaded.");
