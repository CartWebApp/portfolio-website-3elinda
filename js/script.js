const thumbs = document.querySelectorAll(".project-border");
const mainImage = document.getElementById("main-image");
const container = document.querySelector(".section2");
const main = document.querySelector("main");

function updateActiveImageAndScale() {
  const containerRect = container.getBoundingClientRect();
  const containerCenter = containerRect.top + containerRect.height / 2;

  let closetThumb = null;
  let closestDistance = Infinity;

  thumbs.forEach((thumb) => {
    const thumbRec = thumb.getBoundingClientRect();
    const thumbCenter = thumbRec.top + thumbRec.height / 2;

    const distance = Math.abs(containerCenter - thumbCenter);

    // sacle and opacity
    const maxDistance = containerRect.height / 2;
    const normalized = Math.min(distance / maxDistance, 1);
    const scale = 1 - normalized * 0.5;
    const opacity = 1 - normalized;

    thumb.style.transform = `scale(${scale})`;
    thumb.style.opacity = opacity;

    if (distance < closestDistance) {
      closestDistance = distance;
      closetThumb = thumb;
    }
  });

  if (closetThumb) {
    const shape = closetThumb.querySelector(".shape");
    if (!shape) return;

    const img = shape.getAttribute("data-image");
    const projectTitle = shape.getAttribute("data-title");

    if (img && mainImage.src !== img) {
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = img;
        mainImage.style.opacity = 1;
      }, 300);
    }

    const h1 = document.querySelector(".shape-filler h1");
    if (h1 && projectTitle && h1.textContent !== projectTitle) {
      h1.textContent = projectTitle;
    }

    const projectLink = shape.getAttribute("data-link");
    const link = document.getElementById("project-link");

    if (link && projectLink) {
      link.setAttribute("href", projectLink);
    }
  }
}

container.addEventListener("wheel", (e) => {
  const atTop = container.scrollTop === 0;
  const atBottom =
    container.scrollTop + container.clientHeight >= container.scrollHeight;

  const scrollDown = e.deltaY > 0;
  const scrollUp = e.deltaY < 0;

  if ((scrollDown && !atBottom) || (scrollUp && !atTop)) {
    e.stopPropagation();
  }

  if (scrollDown && atBottom) {
    container.blur();
  }

  if (atBottom && e.deltaY > 0) {
    e.preventDefault();
    window.scrollBy({ top: e.deltaY, behavior: "smooth" });
  }
});

container.addEventListener("scroll", updateActiveImageAndScale);
window.addEventListener("DOMContentLoaded", updateActiveImageAndScale);
