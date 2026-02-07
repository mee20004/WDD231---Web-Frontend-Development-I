import spritePath from '../images/sprite.symbol.svg';

export function alertTemplate(alert) {
  let alertType = "";

  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }

  return `<li class="alert">
    <svg class="icon" focusable="false" aria-hidden="true">
      <use xlink:href="${spritePath}#alert-${alertType}"></use>
    </svg>
    <div>
      <h3 class="alert-${alertType}">${alert.title}</h3>
      <p>${alert.description}</p>
    </div>
  </li>`;
}

export function visitorCenterTemplate(center) {
  let status = "";
  return `<li>
    <h3>${center.name}</h3>
    <p>${center.description}</p>
    <p>${center.directionsInfo || ""}</p>
    ${status ? `<p>${status}</p>` : ""}
  </li>`;
}

export function activityTemplate(activity) {
  return `<li>
    <h3>${activity.name}</h3>
    <p>${activity.description || ""}</p>
  </li>`;
}