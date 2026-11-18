
/* =====================================
   VELORA TAP - QR CODE GENERATOR
   ===================================== */

const VeloraQR = {
  /**
   * Generate a QR code for a business profile.
   * Requires a business slug and a public website URL.
   */
  async generate(slug, websiteUrl) {
    if (!slug || !websiteUrl) {
      throw new Error("Business slug and website URL are required.");
    }

    const profileUrl = new URL("/" + encodeURIComponent(slug), websiteUrl).href;

    const imageUrl =
      "https://api.qrserver.com/v1/create-qr-code/" +
      "?size=500x500&format=png&data=" +
      encodeURIComponent(profileUrl);

    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Unable to generate QR code.");
    }

    return {
      slug,
      profileUrl,
      imageUrl,
      blob: await response.blob()
    };
  },

  /**
   * Download a generated QR code.
   */
  async download(slug, websiteUrl) {
    const result = await this.generate(slug, websiteUrl);

    const objectUrl = URL.createObjectURL(result.blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = "velora-tap-" + slug + "-qr.png";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(objectUrl);

    return result;
  }
};

// Make available to other project files.
window.VeloraQR = VeloraQR;

console.log("VELORA TAP QR Generator loaded.");
