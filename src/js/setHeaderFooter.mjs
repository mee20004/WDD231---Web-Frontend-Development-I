import enableNavigation from "./navigation.mjs";

export default function setHeaderFooter(parkData) {
  // Header
  const disclaimerLink = document.querySelector(".disclaimer a");
  if (disclaimerLink) {
    disclaimerLink.href = parkData.url || "#";
    disclaimerLink.textContent = parkData.fullName || "";
  }

  const titleEl = document.querySelector("head > title");
  if (titleEl) {
    titleEl.textContent = parkData.fullName || titleEl.textContent;
  }

  const heroBanner = document.querySelector(".hero-banner img");
  const heroContent = document.querySelector(".hero-banner__content");

  if (heroBanner) {
    heroBanner.src = parkData.images?.[0]?.url || "";
    heroBanner.alt = parkData.fullName || "Park Image";
  }

  if (heroContent) {
    heroContent.innerHTML = `
      <a href="/" class="hero-banner__title">${parkData.name}</a>
      <p class="hero-banner__subtitle">
        <span>${parkData.designation}</span>
        <span>${parkData.states}</span>
      </p>
    `;
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
  // Navigation behavior
  enableNavigation();

}