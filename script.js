const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = themeToggle.querySelector(".theme-label");
const themeIcon = themeToggle.querySelector(".theme-icon");
const videoFallback = document.querySelector(".video-fallback");
const videoWrapper = document.querySelector(".video-wrapper");
const themeStorageKey = "commtech-portfolio-theme";

if (videoFallback && window.location.protocol === "file:") {
  videoFallback.hidden = false;
  videoWrapper.hidden = true;
}

function setTheme(isDark) {
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeIcon.textContent = isDark ? "☀" : "◐";
}

const savedTheme = localStorage.getItem(themeStorageKey);
setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme !== "dark";
  setTheme(isDark);
  localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
});

document.body.addEventListener("click", (event) => {
  const splatter = document.createElement("div");
  splatter.className = "ink-splatter";
  splatter.setAttribute("aria-hidden", "true");
  splatter.style.left = `${event.pageX}px`;
  splatter.style.top = `${event.pageY}px`;
  document.body.append(splatter);
  window.setTimeout(() => splatter.remove(), 500);
});

const stampTargets = document.querySelectorAll("section, .project-card");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  stampTargets.forEach((target) => target.classList.add("stamp-visible"));
} else {
  stampTargets.forEach((target) => target.classList.add("stamp-hidden"));
  const stampObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("stamp-hidden");
          entry.target.classList.add("stamp-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  stampTargets.forEach((target) => stampObserver.observe(target));
}
