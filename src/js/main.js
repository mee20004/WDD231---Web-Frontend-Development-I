import { getParkData, getInfoLinks } from "./parkService.mjs";

const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: "",
    description: "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: "", 
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: "",
    description: "Learn about the visitor centers in the park."
  }
];

function parkInfoTemplate(info) {
  return `
    <a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

function setHeaderInfo(data) {
  const disclaimerLink = document.querySelector(".disclaimer a");
  disclaimerLink.href = data.url;
  disclaimerLink.textContent = data.fullName;

  document.querySelector("head > title").textContent = data.fullName;

  const heroImage = document.querySelector(".hero-banner img");
  heroImage.src = data.images[0].url;
  heroImage.alt = data.images[0].altText || data.fullName;

  const heroContent = document.querySelector(".hero-banner__content");
  heroContent.innerHTML = parkInfoTemplate(data);
}

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  `;
}

function mediaCardTemplate(info) {
  return `
    <div class="media-card">
      <a href="${info.link}">
        <img src="${info.image}" alt="${info.name}" class="media-card__img">
        <h3 class="media-card__title">${info.name}</h3>
      </a>
      <p>${info.description}</p>
    </div>
  `;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);
  infoEl.innerHTML = html.join("");
}

function footerTemplate(info) {
  const mailing = info.addresses.find((address) => address.type === "Mailing");
  const voice = info.contacts.phoneNumbers.find((n) => n.type === "Voice").phoneNumber;

  return `
    <section class="contact">
      <h3>Contact Info</h3>
      <h4>Mailing Address:</h4>
      <div>
        <p>${mailing.line1}</p>
        <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
      </div>
      <h4>Phone:</h4>
      <p>${voice}</p>
    </section>
  `;
}

function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  footerEl.innerHTML = footerTemplate(data);
}

async function init() {
  const parkData = await getParkData("yell"); 
  
  const updatedLinks = getInfoLinks(parkData.images, parkInfoLinks);
  
  setHeaderInfo(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(updatedLinks);
  setFooter(parkData);
}

init();