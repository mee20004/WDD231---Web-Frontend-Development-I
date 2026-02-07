export default function setHeaderFooter(parkData) {
  //Header
  const heroBanner = document.querySelector(".hero-banner img");
  const heroContent = document.querySelector(".hero-banner__content");

  if (heroBanner) {
    heroBanner.src = parkData.images?.[0]?.url || "";
    heroBanner.alt = parkData.fullName || "Park Image";
  }

  if (heroContent) {
    heroContent.textContent = parkData.fullName || "";
  }

  // Footer
  const footer = document.getElementById("park-footer");
  if (footer) {
    const address = parkData.addresses?.[0] || {};
    footer.innerHTML = `
      <p>${parkData.fullName || ""}</p>
      <p>
        ${address.line1 || ""} ${address.line2 || ""} ${address.line3 || ""}<br>
        ${address.city || ""}, ${address.stateCode || ""} ${address.postalCode || ""}
      </p>
      <p><a href="${parkData.url || "#"}" target="_blank" rel="noopener">Official Park Website</a></p>
    `;
  }
}