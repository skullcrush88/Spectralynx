import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initTopologyCanvas } from './topology-canvas.js';

gsap.registerPlugin(ScrollTrigger);

// 1. Preloader Logic with Word Cycling & Organic SVG Bezier Curve Transition
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const wordEl = document.getElementById('preloader-word');
  const pathEl = document.getElementById('preloader-path');

  if (!preloader) return;

  const words = [
    "Telecom",
    "Voice Solutions",
    "Data Networks",
    "AV Systems",
    "Security",
    "Surveillance",
    "Turnkey Systems",
    "SpectraLynx"
  ];

  let wordIndex = 0;
  const width = window.innerWidth || 1920;
  const height = window.innerHeight || 1080;

  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;
  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

  if (pathEl) {
    pathEl.setAttribute('d', initialPath);
  }

  // Safety fallback: dismiss after max 2.2 seconds no matter what
  const fallbackTimer = setTimeout(() => {
    preloader.classList.add('slide-up');
  }, 2200);

  const wordInterval = setInterval(() => {
    wordIndex++;
    if (wordIndex < words.length) {
      if (wordEl) wordEl.innerText = words[wordIndex];
    } else {
      clearInterval(wordInterval);
      clearTimeout(fallbackTimer);

      if (pathEl) {
        gsap.to(pathEl, {
          attr: { d: targetPath },
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => {
            preloader.classList.add('slide-up');
          }
        });
      } else {
        preloader.classList.add('slide-up');
      }
    }
  }, 160);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPreloader);
} else {
  initPreloader();
}

// 2. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
});

lenis.on('scroll', (e) => {
  ScrollTrigger.update();
  const header = document.getElementById('minimal-header');
  if (header) {
    if (e.scroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Smooth anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        lenis.scrollTo(targetEl, { offset: -60 });
      }
    }
  });
});

// 3. Initialize Topology Canvas
initTopologyCanvas('topology-canvas');

// 4. Editorial Industry Navigator Hover Reveal
const indRows = document.querySelectorAll('.ind-row-item');
const indReveal = document.getElementById('ind-reveal');
const indRevealImg = document.getElementById('ind-reveal-img');

indRows.forEach((row) => {
  row.addEventListener('mouseenter', () => {
    const imgSrc = row.getAttribute('data-img');
    if (indRevealImg && imgSrc) indRevealImg.src = imgSrc;
    if (indReveal) indReveal.classList.add('active');
  });

  row.addEventListener('mouseleave', () => {
    if (indReveal) indReveal.classList.remove('active');
  });
});

// 5. GSAP ScrollTrigger Animations
window.addEventListener('load', () => {
  // Pinned Full-Screen Services Section
  const serviceSlides = gsap.utils.toArray('.service-slide');
  const pinnedWrap = document.querySelector('.pinned-services-wrap');
  if (serviceSlides.length > 0 && pinnedWrap && window.innerWidth > 768) {
    const serviceTl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedWrap,
        start: 'top top',
        end: () => '+=' + (serviceSlides.length - 1) * 100 + '%',
        pin: true,
        scrub: 1,
      }
    });

    serviceSlides.forEach((slide, i) => {
      slide.style.zIndex = i + 1;
      if (i > 0) {
        serviceTl.fromTo(slide, { yPercent: 100 }, { yPercent: 0, ease: 'none' });
      }
    });
  }

  // Horizontal Scroll Projects Showcase
  if (window.innerWidth > 900) {
    const projectsTrack = document.querySelector('.projects-track');
    const projectSlides = document.querySelectorAll('.project-viewport-slide');
    if (projectsTrack && projectSlides.length > 0) {
      gsap.to(projectSlides, {
        xPercent: -100 * (projectSlides.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects-horizontal-wrap',
          pin: true,
          scrub: 1,
          snap: 1 / (projectSlides.length - 1),
          end: () => '+=' + projectsTrack.offsetWidth,
        }
      });
    }
  }
});

// 6. Modal Controls
const modal = document.getElementById('contact-modal');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modalClose = document.getElementById('modal-close');

modalTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    if (modal) modal.classList.add('active');
  });
});

if (modalClose && modal) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
