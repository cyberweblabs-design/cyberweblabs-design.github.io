// ===== Navbar Toggle (Mobile Menu) =====
const navLinks = document.querySelector(".nav-links");
const navToggle = document.createElement("div");

navToggle.classList.add("nav-toggle");
navToggle.innerHTML = "☰";
document.querySelector(".navbar").appendChild(navToggle);

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ===== Smooth Scroll Animation =====
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===== Fade In on Scroll =====
const faders = document.querySelectorAll("section, .service-card, .team-member");

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("fade-in");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
