function mainMenuHandler(ev) {
  // toggle the show class on the global nav
  document.querySelector(".global-nav").classList.toggle("show");

  const menuButton = ev.currentTarget;
  const expanded = document.querySelector(".global-nav").classList.contains("show");
  menuButton.setAttribute("aria-expanded", expanded);
}

function subMenuHandler(ev) {
  const toggle = ev.currentTarget;
  const subMenu = toggle.closest("li").querySelector(".global-nav__submenu");
  if (!subMenu) return;

  const open = subMenu.classList.toggle("show");
  toggle.setAttribute("aria-expanded", open);
  toggle.querySelector(".icon").classList.toggle("rotate", open);
}

function resetNavigationState() {
  const menu = document.querySelector(".global-nav");
  const menuButton = document.querySelector("#global-nav-toggle");
  if (!menu || !menuButton) return;

  menu.classList.remove("show");
  menuButton.setAttribute("aria-expanded", "false");

  document.querySelectorAll(".global-nav__split-button__toggle").forEach((toggle) => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".icon")?.classList.remove("rotate");
    toggle.closest("li")?.querySelector(".global-nav__submenu")?.classList.remove("show");
  });
}

export default function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const subMenuToggles = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );

  if (menuButton) {
    menuButton.addEventListener("click", mainMenuHandler);
  }

  subMenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", subMenuHandler);
  });

  // Ensure menu starts closed on load & when transitioning back to mobile widths
  resetNavigationState();

  const mq = window.matchMedia("(min-width: 768px)");
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", (event) => {
      if (!event.matches) {
        resetNavigationState();
      }
    });
  }
}
