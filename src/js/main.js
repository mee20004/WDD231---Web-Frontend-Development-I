import { getParkData, getInfoLinks, getJson } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

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

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  if (introEl) {
    introEl.innerHTML = `
      <h1>${data.fullName}</h1>
      <p>${data.description}</p>
    `;
  }
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
  if (infoEl) {
    infoEl.innerHTML = data.map(mediaCardTemplate).join("");
  }
}

async function init() {
  const parkData = await getParkData("yell");
  const updatedLinks = getInfoLinks(parkData.images, parkInfoLinks);
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(updatedLinks);
}

init();

async function renderClimbingList() {
  const listEl = document.getElementById("outputList");
  if (!listEl) return;
  const data = await getJson("activities/parks?q=climbing");
  const parks = data.data[0].parks;
  listEl.innerHTML = parks
    .map((park) => `<li><a href="${park.url}" target="_blank">${park.fullName}</a> (${park.states})</li>`)
    .join("");
}

renderClimbingList();
