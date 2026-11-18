
/* =====================================
   VELORA TAP - BUSINESS ANALYTICS
   ===================================== */

const VeloraAnalytics = {

  /**
   * Record a business profile event.
   *
   * Supported event types:
   * profile_view
   * google_review_click
   * website_click
   * whatsapp_click
   * instagram_click
   */

  async track(businessId, eventType) {
    const db = window.supabaseClient;

    if (!db || !businessId || !eventType) {
      console.warn("Analytics information is incomplete.");
      return;
    }

    const allowedEvents = [
      "profile_view",
      "google_review_click",
      "website_click",
      "whatsapp_click",
      "instagram_click"
    ];

    if (!allowedEvents.includes(eventType)) {
      console.warn("Unsupported analytics event.");
      return;
    }

    try {
      const { error } = await db
        .from("business_events")
        .insert({
          business_id: businessId,
          event_type: eventType
        });

      if (error) {
        console.error("Analytics error:", error.message);
        return;
      }

      console.log("VELORA TAP event recorded:", eventType);

    } catch (error) {
      console.error("Unable to record analytics:", error);
    }
  }
};

// Make analytics available to other files.
window.VeloraAnalytics = VeloraAnalytics;

console.log("VELORA TAP Analytics loaded.");
