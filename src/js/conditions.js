import "../css/style.css";
import "../css/conditions.css";

import { getParkData, getParkAlerts, getVisitorCenterData } from "./parkService.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

function setAlerts(alerts) {
  const alertsContainer = document.querySelector(".alerts > ul");
  if (!alertsContainer) return;
  alertsContainer.innerHTML = "";
  const html = alerts.map(alertTemplate);
  alertsContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setVisitorCenters(centers) {
  const centersContainer = document.querySelector(".visitor details ul");
  if (!centersContainer) return;
  centersContainer.innerHTML = "";
  const html = centers.map(visitorCenterTemplate);
  centersContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setActivities(activities) {
  const activitiesContainer = document.querySelector(".activities details ul");
  if (!activitiesContainer) return;
  activitiesContainer.innerHTML = "";
  const html = activities.map(activityTemplate);
  activitiesContainer.insertAdjacentHTML("beforeend", html.join(""));
}

async function init() {
  try {
    const parkData = await getParkData();

    setHeaderFooter(parkData);

    const alerts = await getParkAlerts(parkData.parkCode);
    setAlerts(alerts);

    const centers = await getVisitorCenterData(parkData.parkCode);
    setVisitorCenters(centers);

    setActivities(parkData.activities);

  } catch (error) {
    console.error("Error loading Current Conditions page:", error);
  }
}

init();