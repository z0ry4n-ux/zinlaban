/* =========================================================
   SALANKATIA — script.js
   Sections:
   1. Loader
   2. Navigation
   3. Hero animation
   4. Story animation
   5. Video
   6. Product catalogue
   7. Scroll effects
   8. Mascot animation
   9. Mobile behavior
   ========================================================= */

(function () {
  "use strict";

  // Mark that JS is active. CSS only hides [data-reveal] / hero title
  // content when this class is present — so if a script below throws,
  // or a CDN (GSAP) is blocked, real copy is never left invisible.
  document.documentElement.classList.add("js");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gsapReady = !!(window.gsap && window.ScrollTrigger);

  if (gsapReady) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Run each section's init independently — one throwing never blocks
  // the rest of the page from working.
  function safe(name, fn) {
    try {
      fn();
    } catch (err) {
      console.error(`[salankatia] ${name} failed:`, err);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    safe("year", initYear);
    safe("loader", initLoader);
    safe("navigation", initNavigation);
    safe("mobileMenu", initMobileMenu);
    safe("heroAnimation", initHeroAnimation);
    safe("revealAnimations", initRevealAnimations);
    safe("storyStripMascot", initStoryStripMascot);
    safe("videoSection", initVideoSection);
    safe("productCatalogue", initProductCatalogue);
    safe("mascotFloat", initMascotFloat);
  });

  // Absolute fallback: if anything above still leaves reveal content
  // hidden (e.g. GSAP CDN blocked mid-script), force it visible once
  // the page has had a couple of seconds to animate on its own.
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelectorAll("[data-reveal], [data-reveal-mascot]").forEach((el) => {
        const opacity = window.getComputedStyle(el).opacity;
        if (parseFloat(opacity) < 1) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      const chars = document.querySelector("[data-chars]");
      if (chars) {
        const t = window.getComputedStyle(chars).transform;
        if (t && t !== "none") chars.style.transform = "none";
      }
    }, 2500);
  });

  /* ---------------------------------------------------------
     Utility
  --------------------------------------------------------- */
  function initYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     1. LOADER / SPLASH SCREEN
  --------------------------------------------------------- */
  function initLoader() {
    const splash = document.getElementById("splash");
    if (!splash) return;

    const logo = splash.querySelector(".splash__logo");
    const title = splash.querySelector(".splash__title");
    const tagline = splash.querySelector(".splash__tagline");
    const mascot = splash.querySelector(".splash__mascot");
    const bar = splash.querySelector(".splash__bar");
    const barFill = splash.querySelector(".splash__bar-fill");

    const finishLoader = () => {
      splash.classList.add("is-done");
      document.body.classList.remove("is-loading");
      if (gsapReady) {
        gsap.to(splash, {
          opacity: 0,
          duration: reducedMotion ? 0.2 : 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            splash.style.display = "none";
          },
        });
      } else {
        splash.style.display = "none";
      }
      // Kick the hero reveal off as soon as the splash starts clearing,
      // rather than stacking another long delay on top.
      startHeroReveal();
    };

    if (reducedMotion || !gsapReady) {
      setTimeout(finishLoader, reducedMotion ? 150 : 1400);
      return;
    }

    document.body.classList.add("is-loading");

    const tl = gsap.timeline({ onComplete: finishLoader });
    tl.to(logo, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" })
      .to(title, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, "-=0.2")
      .to(tagline, { opacity: 1, duration: 0.35 }, "-=0.15")
      .to(mascot, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.5)" }, "-=0.15")
      .to(bar, { opacity: 1, duration: 0.15 }, "-=0.15")
      .to(barFill, { width: "100%", duration: 0.6, ease: "power1.inOut" }, "-=0.05");
  }

  /* ---------------------------------------------------------
     2. NAVIGATION (scroll state)
  --------------------------------------------------------- */
  function initNavigation() {
    const header = document.getElementById("siteHeader");
    if (!header) return;

    const setState = () => {
      if (window.scrollY > 40) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    setState();
    window.addEventListener("scroll", setState, { passive: true });
  }

  /* ---------------------------------------------------------
     9. MOBILE BEHAVIOR (fullscreen menu)
  --------------------------------------------------------- */
  function initMobileMenu() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("mobileNav");
    if (!toggle || !menu) return;

    const links = menu.querySelectorAll("a");

    const open = () => {
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      if (window.gsap && !reducedMotion) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.15, ease: "power2.out" }
        );
      } else {
        links.forEach((l) => (l.style.opacity = 1));
      }
    };

    const close = () => {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.contains("is-open");
      isOpen ? close() : open();
    });

    links.forEach((link) => link.addEventListener("click", close));
  }

  /* ---------------------------------------------------------
     3. HERO ANIMATION
  --------------------------------------------------------- */
  let heroRevealed = false;

  function initHeroAnimation() {
    // No-op if GSAP never loaded — the window "load" fallback further
    // up will force everything visible after a couple of seconds either way.
    if (!gsapReady) return;
    // Belt-and-braces: if the loader never calls startHeroReveal for any
    // reason (e.g. #splash missing from the DOM), start it directly.
    setTimeout(() => {
      if (!heroRevealed) startHeroReveal();
    }, 2000);
  }

  function startHeroReveal() {
    if (heroRevealed) return;
    heroRevealed = true;

    const hero = document.getElementById("hero");
    if (!hero || !gsapReady) return;

    const eyebrow = hero.querySelector(".hero__eyebrow");
    const titleChars = hero.querySelector("[data-chars]");
    const subtitle = hero.querySelector(".hero__subtitle");
    const tagline = hero.querySelector(".hero__tagline");
    const mascot = hero.querySelector("[data-reveal-mascot]");
    const bg = hero.querySelector(".hero__bg");

    const tl = gsap.timeline({ delay: reducedMotion ? 0 : 0.1 });
    if (titleChars) {
      tl.fromTo(titleChars, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power4.out" });
    }
    if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, "-=0.7");
    if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");
    if (tagline) tl.to(tagline, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    if (mascot) tl.to(mascot, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" }, "-=0.5");

    // gentle idle float after entrance
    if (!reducedMotion && mascot) {
      gsap.to(mascot, {
        y: "+=14",
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: tl.duration() + 0.2,
      });
    }
    if (!reducedMotion && bg) {
      gsap.to(bg, {
        xPercent: 3,
        yPercent: 2,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }

  /* ---------------------------------------------------------
     7. SCROLL EFFECTS — generic [data-reveal] fade/translate
  --------------------------------------------------------- */
  function initRevealAnimations() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!gsapReady || reducedMotion) {
      items.forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
      return;
    }

    items.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    // six-image story strip frames: scale + reveal on scroll
    const frames = document.querySelectorAll(".story-strip__frame");
    frames.forEach((frame, i) => {
      gsap.fromTo(
        frame,
        { opacity: 0, scale: 0.92, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: frame,
            start: "left 90%",
            containerAnimation: null,
            once: true,
          },
        }
      );
    });

    // ingredient gallery tiles: subtle stagger
    gsap.utils.toArray(".img-frame--tall").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });
  }

  /* ---------------------------------------------------------
     8. MASCOT ANIMATION — idle float used in several sections
  --------------------------------------------------------- */
  function initMascotFloat() {
    const floaters = document.querySelectorAll("[data-float]");
    if (!floaters.length || !gsapReady || reducedMotion) return;

    floaters.forEach((el, i) => {
      gsap.to(el, {
        y: "+=16",
        rotate: i % 2 === 0 ? 1.2 : -1.2,
        duration: 3.4 + i * 0.3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  }

  /* Mascot travelling along the story-strip "current" on scroll */
  function initStoryStripMascot() {
    const track = document.getElementById("storyStripTrack");
    const mascot = document.getElementById("stripMascot");
    if (!track || !mascot) return;

    const update = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;
      const progress = track.scrollLeft / maxScroll;
      const travel = track.clientWidth - 74; // mascot width
      mascot.style.transform = `translateX(${progress * travel}px)`;
    };

    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------------------------------------------------------
     5. VIDEO SECTION — autoplay when in view, pause offscreen
  --------------------------------------------------------- */
  function initVideoSection() {
    const section = document.getElementById("video");
    const video = document.getElementById("brandVideo");
    const toggleBtn = document.getElementById("videoToggle");
    const placeholder = document.getElementById("videoPlaceholder");
    if (!section || !video) return;

    // If no real video source resolves, keep the placeholder visible.
    video.addEventListener(
      "loadeddata",
      () => {
        if (placeholder) placeholder.style.display = "none";
      },
      { once: true }
    );
    video.addEventListener("error", () => {
      if (placeholder) placeholder.style.display = "flex";
    });

    let userPaused = false;

    const tryPlay = () => {
      if (userPaused) return;
      video.play().catch(() => {
        /* Autoplay may be blocked until user interaction; that's fine. */
      });
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.preload = "auto";
              tryPlay();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(section);
    } else {
      tryPlay();
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (video.paused) {
          userPaused = false;
          video.play();
          toggleBtn.classList.remove("is-playing");
          toggleBtn.setAttribute("aria-label", "Pause video");
        } else {
          userPaused = true;
          video.pause();
          toggleBtn.classList.add("is-playing");
          toggleBtn.setAttribute("aria-label", "Play video");
        }
      });
    }
  }

  /* ---------------------------------------------------------
     6. PRODUCT CATALOGUE
  --------------------------------------------------------- */
  // Editable product data — replace name/description/image per real catalogue.
  const products = [
    {
      name: "Pistachio & Lotus",
      description: "An indulgent combination of creamy pistachio and rich Lotus flavour.",
      image: "assets/products/product-01.jpg",
    },
    {
      name: "[ PRODUCT NAME ]",
      description: "[ Insert product description here. ]",
      image: "assets/products/product-02.jpg",
    },
    {
      name: "[ PRODUCT NAME ]",
      description: "[ Insert product description here. ]",
      image: "assets/products/product-03.jpg",
    },
    {
      name: "[ PRODUCT NAME ]",
      description: "[ Insert product description here. ]",
      image: "assets/products/product-04.jpg",
    },
    {
      name: "[ PRODUCT NAME ]",
      description: "[ Insert product description here. ]",
      image: "assets/products/product-05.jpg",
    },
    {
      name: "[ PRODUCT NAME ]",
      description: "[ Insert product description here. ]",
      image: "assets/products/product-06.jpg",
    },
  ];  

  function initProductCatalogue() {
    const viewport = document.getElementById("productViewport");
    const counter = document.getElementById("productCounter");
    const prevBtn = document.getElementById("prevProduct");
    const nextBtn = document.getElementById("nextProduct");
    const slider = document.getElementById("productSlider");
    if (!viewport) return;

    viewport.innerHTML = products
      .map(
        (p, i) => `
      <div class="product-slide${i === 0 ? " is-active" : ""}" data-index="${i}">
        <div class="product-slide__image">
  <!-- Product image -->
  <div class="img-frame">
    <img 
      src="${p.image}" 
      alt="${escapeHtml(p.name)}"
      loading="lazy"
    >
  </div>
</div>
        <div class="product-slide__meta">
          <p class="product-slide__name">${escapeHtml(p.name)}</p>
          <p class="product-slide__desc">${escapeHtml(p.description)}</p>
        </div>
      </div>`
      )
      .join("");

    const slides = viewport.querySelectorAll(".product-slide");
    let current = 0;
    let autoplayTimer = null;
    const AUTOPLAY_MS = 4200;

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function render() {
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
      if (counter) counter.textContent = `${pad(current + 1)} / ${pad(products.length)}`;
    }

    function goTo(index) {
      current = (index + products.length) % products.length;
      render();
    }

    function next() {
      goTo(current + 1);
    }
    function prev() {
      goTo(current - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      if (reducedMotion) return;
      autoplayTimer = setInterval(next, AUTOPLAY_MS);
    }
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        next();
        startAutoplay();
      });
    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        prev();
        startAutoplay();
      });

    if (slider) {
      slider.addEventListener("mouseenter", stopAutoplay);
      slider.addEventListener("mouseleave", startAutoplay);
    }

    // touch / drag swipe support
    let startX = 0;
    let deltaX = 0;
    let dragging = false;

    viewport.addEventListener(
      "touchstart",
      (e) => {
        dragging = true;
        startX = e.touches[0].clientX;
        stopAutoplay();
      },
      { passive: true }
    );
    viewport.addEventListener(
      "touchmove",
      (e) => {
        if (!dragging) return;
        deltaX = e.touches[0].clientX - startX;
      },
      { passive: true }
    );
    viewport.addEventListener("touchend", () => {
      if (!dragging) return;
      dragging = false;
      if (deltaX > 40) prev();
      else if (deltaX < -40) next();
      deltaX = 0;
      startAutoplay();
    });

    render();
    startAutoplay();
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
})();
