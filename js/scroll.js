/**
 * scroll.js - Simple Scroll Animations with GSAP
 * Native scrolling with GSAP ScrollTrigger for animations
 */

// ============================================
// Initialize GSAP ScrollTrigger
// ============================================
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero parallax
  gsap.to(".hero-bg-text", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    y: 300,
    opacity: 0,
  });

  gsap.to(".hero-content", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "center top",
      scrub: 1,
    },
    y: -100,
    opacity: 0,
  });

  gsap.to(".scroll-indicator", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "30% top",
      scrub: 1,
    },
    opacity: 0,
    y: 50,
  });

  // Month sections animations
  document.querySelectorAll(".month-section").forEach((section, index) => {
    // Animate month content on enter
    gsap.from(section.querySelector(".month-content"), {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: index % 2 === 0 ? -100 : 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Animate photo cards with stagger
    gsap.from(section.querySelectorAll(".photo-card"), {
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      rotation: 10,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    // Background glow animation
    const bgCircle = section.querySelector(".month-bg-circle");
    if (bgCircle) {
      gsap.to(bgCircle, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.5,
        opacity: 0.2,
      });
    }
  });

  // Footer animation
  gsap.from(".footer-content", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
}

// ============================================
// Progress Bar Update
// ============================================
function initProgressBar() {
  const progressFill = document.querySelector(".progress-fill");
  if (!progressFill) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressFill.style.width = `${progress}%`;

    // Expose scroll progress for Three.js
    window.scrollProgress = scrollTop / docHeight;
  });
}

// ============================================
// Navigation Dots Update
// ============================================
function initNavigation() {
  const navDots = document.querySelectorAll(".nav-dot");
  const sections = document.querySelectorAll(".month-section");

  // Click handler
  navDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      const section = sections[index];
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  // Active state update on scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowCenter = scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (windowCenter >= sectionTop && windowCenter < sectionBottom) {
        navDots.forEach((dot) => dot.classList.remove("active"));
        if (navDots[index]) {
          navDots[index].classList.add("active");
        }
      }
    });
  });
}

// ============================================
// Restart Button
// ============================================
function initRestartButton() {
  const btn = document.querySelector(".restart-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// ============================================
// Magnetic Hover Effect
// ============================================
function initMagneticEffect() {
  document.querySelectorAll(".nav-dot, .restart-btn").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    });
  });
}

// ============================================
// Photo Card Hover Effect
// ============================================
function initPhotoHoverEffect() {
  document.querySelectorAll(".photo-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationY: x * 20,
        rotationX: -y * 20,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Wait for content to be generated
  setTimeout(() => {
    initScrollAnimations();
    initProgressBar();
    initNavigation();
    initRestartButton();
    initMagneticEffect();
    initPhotoHoverEffect();

    console.log("Scroll animations initialized");
  }, 300);
});
