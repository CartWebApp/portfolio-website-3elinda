const thumbs = document.querySelectorAll(".project-border");
const mainImage = document.getElementById("main-image");
const container = document.querySelector(".section2");
const main = document.querySelector("main");

// for hamburger menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  localStorage.style.display = navMenu.classList.contains("open")
    ? "block"
    : "none";
});

// Function for when user scrolls/page loads
function updateActiveImageAndScale() {
  const containerRect = container.getBoundingClientRect();
  // Gets the position & size of element relative to viewport
  // to figure out where .section2 is on the screen
  const containerCenter = containerRect.top + containerRect.height / 2;
  // which thhumbnail is most centered

  let closetThumb = null;
  let closestDistance = Infinity;

  // gives each thumbnail's center position
  thumbs.forEach((thumb) => {
    const thumbRec = thumb.getBoundingClientRect();
    // gets position/size of each .project-border to check one is in the center
    const thumbCenter = thumbRec.top + thumbRec.height / 2;
    // use to compute vertical center of thumbnail

    // compare distance from center
    // returns absolute value
    // how far thumb is from center of the container
    const distance = Math.abs(containerCenter - thumbCenter);

    // sacle and fade based on distance
    const maxDistance = containerRect.height / 2;
    const normalized = Math.min(distance / maxDistance, 1);
    // returns smallest of given values
    // distance / max distance to get scale between 0 & 1
    // ..., 1 = never goes above 1
    const scale = 1 - normalized * 0.5;
    // when centered: 1 and when far away:0.5
    const opacity = 1 - normalized;
    // when centered: 1 and when far away:0
    // thumbnail in the center is big and the others shrink/fade

    thumb.style.transform = `scale(${scale})`;
    thumb.style.opacity = opacity;

    // closest thumbnail
    if (distance < closestDistance) {
      closestDistance = distance;
      closetThumb = thumb;
    }
  });

  if (closetThumb) {
    // update the main-image, the project title, and the project link based on the centered thumbnail
    const shape = closetThumb.querySelector(".shape");
    if (!shape) return;

    const img = shape.getAttribute("data-image");
    const projectTitle = shape.getAttribute("data-title");

    // update the main image and fade out the old one
    // setTimeout() delays ftn for certain amount of time
    // wait 300 milliseconds to let opacity = 0/fade out, chnages images source, then fades it back in
    if (img && mainImage.src !== img) {
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = img;
        mainImage.style.opacity = 1;
      }, 300);
    }

    // the project title
    const h1 = document.querySelector(".shape-filler h1");
    if (h1 && projectTitle && h1.textContent !== projectTitle) {
      h1.textContent = projectTitle;
    }

    // the project link
    const projectLink = shape.getAttribute("data-link");
    const link = document.getElementById("project-link");

    if (link && projectLink) {
      link.setAttribute("href", projectLink);
    }
  }
}

container.addEventListener("scroll", updateActiveImageAndScale);
window.addEventListener("DOMContentLoaded", updateActiveImageAndScale);
// when scroll or when the page first loads the image/title/link updates
