// Minimal fast preloader (never stuck)
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".preloader");
  function hideLoader() {
    if (loader) {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 600);
    }
  }
  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 5000); // fail-safe
});

// Mobile nav
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });
}

// Theme: auto (prefers-color-scheme) + toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
function applyAutoTheme() {
  if (localStorage.getItem('cw_theme')) {
    const saved = localStorage.getItem('cw_theme');
    root.classList.toggle('dark', saved === 'dark');
  } else {
    root.classList.toggle('dark', prefersDark.matches);
  }
}
applyAutoTheme();
prefersDark.addEventListener('change', applyAutoTheme);
function updateThemeIcon() {
  const icon = themeToggle?.querySelector('i');
  if (!icon) return;
  icon.className = root.classList.contains('dark') ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}
updateThemeIcon();
themeToggle?.addEventListener('click', () => {
  const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
  root.classList.toggle('dark', newTheme === 'dark');
  localStorage.setItem('cw_theme', newTheme);
  updateThemeIcon();
});

// Lenis smooth scroll
let lenis;
function initLenis(){
  try {
    lenis = new Lenis({ smoothWheel: true, lerp: 0.12, duration: 1.1 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch(e){
    console.warn('Lenis not available, fallback to native scroll.');
  }
}

// GSAP + ScrollTrigger animations (reversible)
function initGSAP(){
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  // generic fade-up for cards/sections
  document.querySelectorAll('.section, .card').forEach(el => {
    gsap.fromTo(el, {autoAlpha:0, y:24}, {
      autoAlpha:1, y:0, duration:0.8, ease:'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play reverse play reverse',
        scrub: false
      }
    });
  });
  // hero subtle parallax
  const hero = document.querySelector('.hero');
  if (hero) {
    gsap.to(hero, {
      backgroundPosition: '0% 20%',
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

window.addEventListener('load', () => {
  initLenis();
  initGSAP();
});

// Dynamic year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();