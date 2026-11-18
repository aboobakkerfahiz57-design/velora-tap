
/* =====================================
   VELORA TAP - BUSINESS ANALYTICS
   ===================================== */

const VeloraAnalytics = {

  async track(businessId, eventType, actionKey = null) {
    const db = window.supabaseClient;

    if (!db || !businessId || !eventType) {
      console.warn("Analytics information is incomplete.");
      return;
    }

    const allowedEvents = [
      "profile_view",
      "link_click"
    ];

    const allowedActions = [
      "google_reviews",
      "website",
      "whatsapp",
      "instagram"
    ];

    if (!allowedEvents.includes(eventType)) {
      console.warn("Unsupported analytics event.");
      return;
    }

    if (actionKey && !allowedActions.includes(actionKey)) {
      console.warn("Unsupported action key.");
      return;
    }

    try {
      const { error } = await db
        .from("business_events")
        .insert({
          business_id: businessId,
          event_type: eventType,
          action_key: actionKey
        });

      if (error) {
        console.error("Analytics error:", error.message);
        return;
      }

      console.log("VELORA TAP event recorded:", eventType, actionKey);

    } catch (error) {
      console.error("Unable to record analytics:", error);
    }
  }
};

window.VeloraAnalytics = VeloraAnalytics;

console.log("VELORA TAP Analytics loaded.");
