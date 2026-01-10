import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

// Disclaimer link
const disclaimerLink = document.querySelector(".disclaimer a");
disclaimerLink.href = parkData.url;
disclaimerLink.textContent = parkData.fullName;

// Page title
document.title = parkData.fullName;

// Hero image
const heroImage = document.querySelector(".hero-banner img");
heroImage.src = parkData.images[0].url;
heroImage.alt = parkData.images[0].altText;

// Hero text (name, designation, states)
function parkInfoTemplate(info) {
  return `
    <a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

const heroContent = document.querySelector(".hero-banner__content");

heroContent.innerHTML = parkInfoTemplate({
  name: parkData.name,
  designation: parkData.designation,
  states: parkData.states,
});
