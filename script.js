/* =========================================================
   ZIN LABAN — script.js

   FEATURES

   1. Loader
   2. Navigation
   3. Mobile menu
   4. Hero animation
   5. Scroll reveals
   6. Client marquee
   7. Story mascot
   8. Video
   9. OUR COLLECTION
   10. OUR LOCATION
   11. Browser location
   12. Mascot floating

   COLLECTIONS

   01. Cheese Bomb
   02. Fazea
   03. HebaCake
   04. Kaushri
   05. Qashtuta
   06. Ruh Hayati
   07. Salankatia

   TOTAL PRODUCTS: 22
   ========================================================= */

(function () {

  "use strict";


  /* =========================================================
     INITIAL SETUP
     ========================================================= */

  document.documentElement.classList.add("js");


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const gsapReady =
    !!(
      window.gsap &&
      window.ScrollTrigger
    );


  if (gsapReady) {

    gsap.registerPlugin(
      ScrollTrigger
    );

  }


  function safe(name, fn) {

    try {

      fn();

    } catch (error) {

      console.error(
        `[zinlaban] ${name} failed:`,
        error
      );

    }

  }


  /* =========================================================
     DOM READY
     ========================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    function () {

      safe(
        "year",
        initYear
      );

      safe(
        "loader",
        initLoader
      );

      safe(
        "navigation",
        initNavigation
      );

      safe(
        "mobileMenu",
        initMobileMenu
      );

      safe(
        "hero",
        initHeroAnimation
      );

      safe(
        "reveal",
        initRevealAnimations
      );

      safe(
        "clientMarquee",
        initClientMarquee
      );

      safe(
        "storyMascot",
        initStoryStripMascot
      );

      safe(
        "video",
        initVideoSection
      );

      safe(
        "collection",
        initCollection
      );

      safe(
        "location",
        initLocation
      );

      safe(
        "mascotFloat",
        initMascotFloat
      );

    }
  );


  /* =========================================================
     YEAR
     ========================================================= */

  function initYear() {

    const year =
      document.getElementById("year");

    if (!year) return;

    year.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     1. LOADER
     ========================================================= */

  let heroStarted = false;


  function initLoader() {

    const splash =
      document.getElementById("splash");

    if (!splash) return;


    const logo =
      splash.querySelector(
        ".splash__logo"
      );

    const title =
      splash.querySelector(
        ".splash__title"
      );

    const tagline =
      splash.querySelector(
        ".splash__tagline"
      );

    const mascot =
      splash.querySelector(
        ".splash__mascot"
      );

    const bar =
      splash.querySelector(
        ".splash__bar"
      );

    const fill =
      splash.querySelector(
        ".splash__bar-fill"
      );


    function finish() {

      splash.classList.add(
        "is-done"
      );

      document.body.classList.remove(
        "is-loading"
      );


      if (gsapReady) {

        gsap.to(
          splash,
          {

            opacity: 0,

            duration:
              reducedMotion
                ? .15
                : .65,

            ease:
              "power2.inOut",

            onComplete: function () {

              splash.style.display =
                "none";

            }

          }
        );

      } else {

        splash.style.display =
          "none";

      }


      startHeroReveal();

    }


    if (
      reducedMotion ||
      !gsapReady
    ) {

      setTimeout(
        finish,
        reducedMotion
          ? 150
          : 1200
      );

      return;

    }


    document.body.classList.add(
      "is-loading"
    );


    const timeline =
      gsap.timeline({
        onComplete: finish
      });


    timeline

      .to(
        logo,
        {
          opacity: 1,
          scale: 1,
          duration: .5,
          ease: "back.out(1.7)"
        }
      )

      .to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: .45,
          ease: "power3.out"
        },
        "-=.2"
      )

      .to(
        tagline,
        {
          opacity: 1,
          duration: .35
        },
        "-=.15"
      )

      .to(
        mascot,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: .5,
          ease: "back.out(1.5)"
        },
        "-=.1"
      )

      .to(
        bar,
        {
          opacity: 1,
          duration: .15
        },
        "-=.15"
      )

      .to(
        fill,
        {
          width: "100%",
          duration: .7,
          ease: "power1.inOut"
        }
      );

  }


  /* =========================================================
     2. NAVIGATION
     ========================================================= */

  function initNavigation() {

    const header =
      document.getElementById(
        "siteHeader"
      );

    if (!header) return;


    function update() {

      if (
        window.scrollY > 40
      ) {

        header.classList.add(
          "is-scrolled"
        );

      } else {

        header.classList.remove(
          "is-scrolled"
        );

      }

    }


    update();


    window.addEventListener(
      "scroll",
      update,
      {
        passive: true
      }
    );

  }


  /* =========================================================
     3. MOBILE MENU
     ========================================================= */

  function initMobileMenu() {

    const toggle =
      document.getElementById(
        "navToggle"
      );

    const menu =
      document.getElementById(
        "mobileNav"
      );

    if (
      !toggle ||
      !menu
    ) return;


    const links =
      menu.querySelectorAll(
        "nav a"
      );


    function open() {

      menu.classList.add(
        "is-open"
      );

      menu.setAttribute(
        "aria-hidden",
        "false"
      );

      toggle.setAttribute(
        "aria-expanded",
        "true"
      );

      toggle.setAttribute(
        "aria-label",
        "Close menu"
      );

      document.body.style.overflow =
        "hidden";


      if (
        gsapReady &&
        !reducedMotion
      ) {

        gsap.fromTo(
          links,

          {
            opacity: 0,
            y: 14
          },

          {
            opacity: 1,
            y: 0,
            duration: .4,
            stagger: .06,
            delay: .15,
            ease: "power2.out"
          }
        );

      } else {

        links.forEach(
          function (link) {

            link.style.opacity = "1";

          }
        );

      }

    }


    function close() {

      menu.classList.remove(
        "is-open"
      );

      menu.setAttribute(
        "aria-hidden",
        "true"
      );

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      toggle.setAttribute(
        "aria-label",
        "Open menu"
      );

      document.body.style.overflow =
        "";

    }


    toggle.addEventListener(
      "click",
      function () {

        if (
          menu.classList.contains(
            "is-open"
          )
        ) {

          close();

        } else {

          open();

        }

      }
    );


    links.forEach(
      function (link) {

        link.addEventListener(
          "click",
          close
        );

      }
    );

  }


  /* =========================================================
     4. HERO
     ========================================================= */

  function initHeroAnimation() {

    if (!gsapReady) {

      startHeroReveal();

      return;

    }


    setTimeout(
      function () {

        startHeroReveal();

      },
      1800
    );

  }


  function startHeroReveal() {

    if (heroStarted) return;

    heroStarted = true;


    const hero =
      document.getElementById(
        "home"
      );

    if (!hero) return;


    const title =
      hero.querySelector(
        "[data-chars]"
      );

    const eyebrow =
      hero.querySelector(
        ".hero__eyebrow"
      );

    const subtitle =
      hero.querySelector(
        ".hero__subtitle"
      );

    const tagline =
      hero.querySelector(
        ".hero__tagline"
      );

    const actions =
      hero.querySelector(
        ".hero__actions"
      );

    const mascot =
      hero.querySelector(
        "[data-reveal-mascot]"
      );


    if (
      !gsapReady ||
      reducedMotion
    ) {

      [
        title,
        eyebrow,
        subtitle,
        tagline,
        actions,
        mascot
      ].forEach(
        function (el) {

          if (!el) return;

          el.style.opacity = "1";

          el.style.transform =
            "none";

        }
      );

      return;

    }


    const timeline =
      gsap.timeline();


    if (title) {

      timeline.to(
        title,
        {
          yPercent: 0,
          duration: .9,
          ease: "power4.out"
        }
      );

    }


    if (eyebrow) {

      timeline.to(
        eyebrow,
        {
          opacity: 1,
          y: 0,
          duration: .45
        },
        "-=.7"
      );

    }


    if (subtitle) {

      timeline.to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: .5
        },
        "-=.45"
      );

    }


    if (tagline) {

      timeline.to(
        tagline,
        {
          opacity: 1,
          y: 0,
          duration: .45
        },
        "-=.35"
      );

    }


    if (actions) {

      timeline.to(
        actions,
        {
          opacity: 1,
          y: 0,
          duration: .45
        },
        "-=.3"
      );

    }


    if (mascot) {

      timeline.to(
        mascot,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: .8,
          ease: "power3.out"
        },
        "-=.4"
      );


      gsap.to(
        mascot,
        {
          y: "+=14",
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: timeline.duration()
        }
      );

    }

  }


  /* =========================================================
     5. REVEAL ANIMATIONS
     ========================================================= */

  function initRevealAnimations() {

    const elements =
      document.querySelectorAll(
        "[data-reveal]"
      );

    if (!elements.length) return;


    if (
      !gsapReady ||
      reducedMotion
    ) {

      elements.forEach(
        function (el) {

          el.style.opacity = "1";

          el.style.transform =
            "none";

        }
      );

      return;

    }


    elements.forEach(
      function (el) {

        gsap.to(
          el,
          {

            opacity: 1,

            y: 0,

            duration: .85,

            ease: "power3.out",

            scrollTrigger: {

              trigger: el,

              start: "top 88%",

              once: true

            }

          }
        );

      }
    );


    document
      .querySelectorAll(
        ".story-strip__frame"
      )
      .forEach(
        function (el) {

          gsap.fromTo(
            el,

            {
              opacity: 0,
              y: 25,
              scale: .94
            },

            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: .7,
              ease: "power3.out",

              scrollTrigger: {

                trigger: el,

                start: "top 90%",

                once: true

              }

            }
          );

        }
      );

  }


  /* =========================================================
     6. CLIENT MARQUEE
     ========================================================= */

  function initClientMarquee() {

    const track =
      document.getElementById(
        "clientMarqueeTrack"
      );

    if (!track) return;


    if (reducedMotion) return;


    const originals =
      Array.from(
        track.children
      );

    if (!originals.length) return;


    originals.forEach(
      function (item) {

        const clone =
          item.cloneNode(true);

        clone.setAttribute(
          "aria-hidden",
          "true"
        );

        track.appendChild(
          clone
        );

      }
    );


    let width = 0;

    let position = 0;

    let lastTime =
      performance.now();

    let paused = false;


    function measure() {

      width = 0;

      originals.forEach(
        function (item) {

          const style =
            window.getComputedStyle(
              item
            );

          const margin =
            parseFloat(
              style.marginRight
            ) || 0;

          width +=
            item.getBoundingClientRect()
              .width +
            margin;

        }
      );


      if (width > 0) {

        position =
          position % width;

      }

    }


    function speed() {

      return window.innerWidth < 700
        ? 42
        : 52;

    }


    function animate(now) {

      if (
        !paused &&
        width > 0
      ) {

        const delta =
          Math.min(
            now - lastTime,
            50
          );


        position +=
          speed() *
          (delta / 1000);


        if (
          position >= width
        ) {

          position -= width;

        }


        track.style.transform =
          `translate3d(${-position}px,0,0)`;

      }


      lastTime = now;

      requestAnimationFrame(
        animate
      );

    }


    const viewport =
      track.closest(
        ".client-marquee__viewport"
      );


    if (viewport) {

      viewport.addEventListener(
        "mouseenter",
        function () {

          paused = true;

        }
      );


      viewport.addEventListener(
        "mouseleave",
        function () {

          paused = false;

          lastTime =
            performance.now();

        }
      );

    }


    track
      .querySelectorAll("img")
      .forEach(
        function (img) {

          if (!img.complete) {

            img.addEventListener(
              "load",
              measure
            );

          }

        }
      );


    measure();

    window.addEventListener(
      "resize",
      measure,
      {
        passive: true
      }
    );


    requestAnimationFrame(
      animate
    );

  }


  /* =========================================================
     7. STORY STRIP MASCOT
     ========================================================= */

  function initStoryStripMascot() {

    const track =
      document.getElementById(
        "storyStripTrack"
      );

    const mascot =
      document.getElementById(
        "stripMascot"
      );

    if (
      !track ||
      !mascot
    ) return;


    function update() {

      const max =
        track.scrollWidth -
        track.clientWidth;

      if (max <= 0) {

        mascot.style.transform =
          "translateX(0)";

        return;

      }


      const progress =
        track.scrollLeft /
        max;


      const travel =
        Math.max(
          0,
          track.clientWidth - 74
        );


      mascot.style.transform =
        `translateX(${progress * travel}px)`;

    }


    track.addEventListener(
      "scroll",
      update,
      {
        passive: true
      }
    );


    window.addEventListener(
      "resize",
      update,
      {
        passive: true
      }
    );


    update();

  }


  /* =========================================================
     8. VIDEO
     ========================================================= */

  function initVideoSection() {

    const section =
      document.getElementById(
        "video"
      );

    const video =
      document.getElementById(
        "brandVideo"
      );

    const button =
      document.getElementById(
        "videoToggle"
      );

    const placeholder =
      document.getElementById(
        "videoPlaceholder"
      );


    if (
      !section ||
      !video
    ) return;


    video.addEventListener(
      "loadeddata",
      function () {

        if (placeholder) {

          placeholder.style.display =
            "none";

        }

      },
      {
        once: true
      }
    );


    video.addEventListener(
      "error",
      function () {

        if (placeholder) {

          placeholder.style.display =
            "flex";

        }

      }
    );


    let userPaused = false;


    function play() {

      if (userPaused) return;

      video
        .play()
        .catch(
          function () {}
        );

    }


    if (
      "IntersectionObserver"
      in window
    ) {

      const observer =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(
              function (entry) {

                if (
                  entry.isIntersecting
                ) {

                  video.preload =
                    "auto";

                  play();

                } else {

                  video.pause();

                }

              }
            );

          },
          {
            threshold: .4
          }
        );


      observer.observe(
        section
      );

    }


    if (button) {

      button.addEventListener(
        "click",
        function () {

          if (
            video.paused
          ) {

            userPaused = false;

            video
              .play()
              .catch(
                function () {}
              );

            button.classList.remove(
              "is-playing"
            );

            button.setAttribute(
              "aria-label",
              "Pause video"
            );

          } else {

            userPaused = true;

            video.pause();

            button.classList.add(
              "is-playing"
            );

            button.setAttribute(
              "aria-label",
              "Play video"
            );

          }

        }
      );

    }

  }


  /* =========================================================
     9. OUR COLLECTION
     ========================================================= */

  /*
     =========================================================
     REAL ZIN LABAN PRODUCTS
     =========================================================

     7 COLLECTIONS
     22 PRODUCTS

     01 — CHEESE BOMB
     02 — FAZEA
     03 — HEBACAKE
     04 — KAUSHRI
     05 — QASHTUTA
     06 — RUH HAYATI
     07 — SALANKATIA

     All product images are loaded from:

     assets/products/
  */


  const collectionData = [

    /* =====================================================
       01 — CHEESE BOMB
       ===================================================== */

    {
      category: "cheese-bomb",
      categoryName: "Cheese Bomb",
      name: "Cheese Bomb",
      description:
        "A rich and creamy signature creation made for pure indulgence.",
      image: "assets/products/Cheese Bomb.jpg.jpeg",
      price: "Signature"
    },


    /* =====================================================
       02 — FAZEA
       ===================================================== */

    {
      category: "fazea",
      categoryName: "Fazea",
      name: "Fazea Chocolate",
      description:
        "A luxurious chocolate creation with a smooth and indulgent finish.",
      image: "assets/products/Fazea Chocolate.jpg.jpeg",
      price: "Signature"
    },


    /* =====================================================
       03 — HEBACAKE
       ===================================================== */

    {
      category: "hebacake",
      categoryName: "HebaCake",
      name: "HebaCake Pistachio Kinder",
      description:
        "A delicious combination of pistachio richness and Kinder-inspired sweetness.",
      image: "assets/products/HebaCake Pistachio  Kinder.jpg.jpeg",
      price: "Premium"
    },

    {
      category: "hebacake",
      categoryName: "HebaCake",
      name: "HebaCake Pistachio Belgium",
      description:
        "Premium pistachio paired with rich Belgian chocolate flavours.",
      image: "assets/products/HebaCake Pistachio Belgium.jpg.jpeg",
      price: "Premium"
    },


    /* =====================================================
       04 — KAUSHRI
       ===================================================== */

    {
      category: "kaushri",
      categoryName: "Kaushri",
      name: "Kaushri Lotus",
      description:
        "Creamy indulgence combined with the irresistible flavour of Lotus.",
      image: "assets/products/Kaushri Lotus.jpg.jpeg",
      price: "Signature"
    },

    {
      category: "kaushri",
      categoryName: "Kaushri",
      name: "Kaushri Nutella Hazelnut",
      description:
        "A smooth and indulgent blend of Nutella and roasted hazelnut.",
      image: "assets/products/Kaushri Nutella Hazelnut.jpg.jpeg",
      price: "Premium"
    },

    {
      category: "kaushri",
      categoryName: "Kaushri",
      name: "Kaushri Pistachio",
      description:
        "A rich pistachio creation crafted for true pistachio lovers.",
      image: "assets/products/Kaushri Pistachio.jpg.jpeg",
      price: "Premium"
    },


    /* =====================================================
       05 — QASHTUTA
       ===================================================== */

    {
      category: "qashtuta",
      categoryName: "Qashtuta",
      name: "Qashtuta Anar Tender",
      description:
        "A delicate creation bringing together creamy indulgence and pomegranate-inspired flavour.",
      image: "assets/products/Qashtuta Anar Tender.jpg.jpeg",
      price: "Signature"
    },

    {
      category: "qashtuta",
      categoryName: "Qashtuta",
      name: "Qashtuta Lotus",
      description:
        "A creamy Qashtuta creation with the caramelised biscuit taste of Lotus.",
      image: "assets/products/Qashtuta Lotus.jpg.jpeg",
      price: "Signature"
    },

    {
      category: "qashtuta",
      categoryName: "Qashtuta",
      name: "Qashtuta Mango & Strawberry",
      description:
        "A vibrant combination of sweet mango and fresh strawberry flavours.",
      image: "assets/products/Qashtuta Mango & Strawberry.jpg.jpeg",
      price: "Signature"
    },

    {
      category: "qashtuta",
      categoryName: "Qashtuta",
      name: "Qashtuta Mango Banana",
      description:
        "A smooth tropical combination of ripe mango and creamy banana.",
      image: "assets/products/Qashtuta Mango Banana.jpg.jpeg",
      price: "Signature"
    },

    {
      category: "qashtuta",
      categoryName: "Qashtuta",
      name: "Qashtuta Mango",
      description:
        "A rich tropical mango creation with a smooth creamy finish.",
      image: "assets/products/Qashtuta Mango.jpg.jpeg",
      price: "Signature"
    },

    {
      category: "qashtuta",
      categoryName: "Qashtuta",
      name: "Qashtuta Nutella Hazelnut",
      description:
        "Creamy Qashtuta combined with the rich flavour of Nutella and hazelnut.",
      image: "assets/products/Qashtuta Nutella Hazelnut.jpg.jpeg",
      price: "Premium"
    },

    {
      category: "qashtuta",
      categoryName: "Qashtuta",
      name: "Qashtuta Pistachio",
      description:
        "A luxurious pistachio-forward Qashtuta with a rich creamy texture.",
      image: "assets/products/Qashtuta Pistachio.jpg.jpeg",
      price: "Premium"
    },

    {
      category: "qashtuta",
      categoryName: "Qashtuta",
      name: "Qashtuta Strawberry Banana",
      description:
        "A sweet and creamy blend of strawberry and banana.",
      image: "assets/products/Qashtuta Strawberry Banana.jpg.jpeg",
      price: "Signature"
    },


    /* =====================================================
       06 — RUH HAYATI
       ===================================================== */

    {
      category: "ruh-hayati",
      categoryName: "Ruh Hayati",
      name: "Ruh Hayati",
      description:
        "A distinctive signature creation made to capture the spirit of ZIN LABAN.",
      image: "assets/products/Ruh Hayati.jpg.jpeg",
      price: "Signature"
    },


    /* =====================================================
       07 — SALANKATIA
       ===================================================== */

    {
      category: "salankatia",
      categoryName: "Salankatia",
      name: "Salankatia Lotus",
      description:
        "A creamy Salankatia creation infused with the irresistible taste of Lotus.",
      image: "assets/products/Salankatia Lotus.jpg.jpeg",
      price: "Signature"
    },

    {
      category: "salankatia",
      categoryName: "Salankatia",
      name: "Salankatia Lotus & Nutella",
      description:
        "A decadent combination of Lotus and Nutella in one indulgent creation.",
      image: "assets/products/Salankatia Lotus&Nutella.jpg.jpeg",
      price: "Premium"
    },

    {
      category: "salankatia",
      categoryName: "Salankatia",
      name: "Salankatia Nutella",
      description:
        "A rich and creamy Nutella creation with a luxurious finish.",
      image: "assets/products/Salankatia Nutella.jpg.jpeg",
      price: "Signature"
    },

    {
      category: "salankatia",
      categoryName: "Salankatia",
      name: "Salankatia Nutella & Pistachio",
      description:
        "Rich Nutella meets premium pistachio in a decadent combination.",
      image: "assets/products/Salankatia Nutella & Pistachio.jpg.jpeg",
      price: "Premium"
    },

    {
      category: "salankatia",
      categoryName: "Salankatia",
      name: "Salankatia Pistachio & Lotus",
      description:
        "A luxurious pairing of creamy pistachio and caramelised Lotus flavour.",
      image: "assets/products/Salankatia Pistachio & Lotus.jpg.jpeg",
      price: "Premium"
    },

    {
      category: "salankatia",
      categoryName: "Salankatia",
      name: "Salankatia Pistachio",
      description:
        "A rich and elegant pistachio creation for a premium experience.",
      image: "assets/products/Salankatia Pistachio.jpg.jpeg",
      price: "Premium"
    }

  ];


  /* =========================================================
     COLLECTION INITIALIZATION
     ========================================================= */

  function initCollection() {

    const grid =
      document.getElementById(
        "collectionGrid"
      );

    const tabsContainer =
      document.querySelector(
        ".collection-tabs"
      );

    const counter =
      document.getElementById(
        "collectionCount"
      );


    if (!grid) return;


    /* =====================================================
       CREATE COLLECTION TABS AUTOMATICALLY
       ===================================================== */

    if (tabsContainer) {

      const categories = [];


      collectionData.forEach(
        function (product) {

          const exists =
            categories.some(
              function (item) {

                return (
                  item.category ===
                  product.category
                );

              }
            );


          if (!exists) {

            categories.push({

              category:
                product.category,

              name:
                product.categoryName

            });

          }

        }
      );


      tabsContainer.innerHTML = `

        <button
          type="button"
          class="collection-tab is-active"
          data-category="all"
        >
          All
        </button>

        ${
          categories
            .map(
              function (category) {

                return `

                  <button
                    type="button"
                    class="collection-tab"
                    data-category="${category.category}"
                  >
                    ${escapeHTML(category.name)}
                  </button>

                `;

              }
            )
            .join("")
        }

      `;

    }


    let tabs =
      document.querySelectorAll(
        ".collection-tab"
      );


    /* =====================================================
       RENDER PRODUCTS
       ===================================================== */

    function render(
      category = "all"
    ) {

      let products =
        collectionData;


      if (
        category !== "all"
      ) {

        products =
          collectionData.filter(
            function (product) {

              return (
                product.category ===
                category
              );

            }
          );

      }


      grid.innerHTML =
        products
          .map(
            function (
              product,
              index
            ) {

              return `

                <article
                  class="collection-card"
                  style="animation-delay:${index * 70}ms"
                >

                  <div
                    class="collection-card__image"
                  >

                    <img
                      src="${product.image}"
                      alt="${escapeHTML(product.name)}"
                      loading="lazy"
                    >

                    <span
                      class="collection-card__category"
                    >
                      ${escapeHTML(product.categoryName)}
                    </span>

                  </div>


                  <div
                    class="collection-card__content"
                  >

                    <span
                      class="collection-card__number"
                    >
                      ${String(index + 1).padStart(2, "0")}
                    </span>


                    <h3
                      class="collection-card__name"
                    >
                      ${escapeHTML(product.name)}
                    </h3>


                    <p
                      class="collection-card__description"
                    >
                      ${escapeHTML(product.description)}
                    </p>


                    <div
                      class="collection-card__footer"
                    >

                      <span
                        class="collection-card__price"
                      >
                        ${escapeHTML(product.price)}
                      </span>


                      <span
                        class="collection-card__arrow"
                      >
                        →
                      </span>

                    </div>

                  </div>

                </article>

              `;

            }
          )
          .join("");


      if (counter) {

        counter.textContent =
          products.length;

      }


      /*
         Refresh GSAP after products
         are changed.
      */

      if (gsapReady) {

        setTimeout(
          function () {

            ScrollTrigger.refresh();

          },
          100
        );

      }

    }


    /* =====================================================
       TAB CLICK EVENTS
       ===================================================== */

    tabs.forEach(
      function (tab) {

        tab.addEventListener(
          "click",
          function () {

            tabs.forEach(
              function (item) {

                item.classList.remove(
                  "is-active"
                );

              }
            );


            tab.classList.add(
              "is-active"
            );


            render(
              tab.dataset.category
            );


            /*
               Smoothly scroll slightly toward
               the collection products on mobile.
            */

            if (
              window.innerWidth < 700
            ) {

              const collectionSection =
                document.getElementById(
                  "collection"
                );


              if (
                collectionSection
              ) {

                collectionSection.scrollIntoView({
                  behavior:
                    reducedMotion
                      ? "auto"
                      : "smooth",

                  block:
                    "start"

                });

              }

            }

          }
        );

      }
    );


    /* =====================================================
       INITIAL RENDER
       ===================================================== */

    render("all");

  }


  /* =========================================================
     HTML ESCAPE
     ========================================================= */

  function escapeHTML(value) {

    const div =
      document.createElement(
        "div"
      );

    div.textContent =
      value;

    return div.innerHTML;

  }


  /* =========================================================
     10. OUR LOCATION
     ========================================================= */

  /*
     STORE DATA

     Replace these with the actual
     ZIN LABAN store locations later.
  */


  const stores = [

    {
      id: 1,

      name:
        "ZIN LABAN",

      city:
        "Kochi",

      state:
        "Kerala",

      address:
        "City Centre, Kochi, Kerala",

      phone:
        "+91 90000 00001",

      hours:
        "10:00 AM — 10:00 PM",

      lat:
        9.9312,

      lng:
        76.2673

    },


    {
      id: 2,

      name:
        "ZIN LABAN — Downtown",

      city:
        "Kozhikode",

      state:
        "Kerala",

      address:
        "Downtown, Kozhikode, Kerala",

      phone:
        "+91 90000 00002",

      hours:
        "10:00 AM — 10:00 PM",

      lat:
        11.2588,

      lng:
        75.7804

    },


    {
      id: 3,

      name:
        "ZIN LABAN — Central",

      city:
        "Thrissur",

      state:
        "Kerala",

      address:
        "Central District, Thrissur, Kerala",

      phone:
        "+91 90000 00003",

      hours:
        "10:00 AM — 10:00 PM",

      lat:
        10.5276,

      lng:
        76.2144

    },


    {
      id: 4,

      name:
        "ZIN LABAN — Riverside",

      city:
        "Malappuram",

      state:
        "Kerala",

      address:
        "Riverside Road, Malappuram, Kerala",

      phone:
        "+91 90000 00004",

      hours:
        "10:00 AM — 10:00 PM",

      lat:
        11.0510,

      lng:
        76.0711

    },


    {
      id: 5,

      name:
        "ZIN LABAN — Downtown",

      city:
        "Kannur",

      state:
        "Kerala",

      address:
        "Downtown, Kannur, Kerala",

      phone:
        "+91 90000 00005",

      hours:
        "10:00 AM — 10:00 PM",

      lat:
        11.8745,

      lng:
        75.3704

    },


    {
      id: 6,

      name:
        "ZIN LABAN — Marina",

      city:
        "Trivandrum",

      state:
        "Kerala",

      address:
        "Marina District, Trivandrum, Kerala",

      phone:
        "+91 90000 00006",

      hours:
        "10:00 AM — 10:00 PM",

      lat:
        8.5241,

      lng:
        76.9366

    }

  ];


  /* =========================================================
     LOCATION INITIALIZATION
     ========================================================= */

  function initLocation() {

    const search =
      document.getElementById(
        "storeSearch"
      );

    const list =
      document.getElementById(
        "storeList"
      );

    const locationButton =
      document.getElementById(
        "locationButton"
      );

    const status =
      document.getElementById(
        "locationStatus"
      );

    const mapText =
      document.getElementById(
        "mapInfoText"
      );


    if (!list) return;


    let currentStores =
      stores.slice();


    let selectedStore =
      null;


    /* =====================================================
       RENDER STORES
       ===================================================== */

    function render(
      data
    ) {

      currentStores =
        data;


      if (!data.length) {

        list.innerHTML = `

          <div class="store-empty">

            <strong>
              No stores found
            </strong>

            <span>
              Try another city or search term.
            </span>

          </div>

        `;

        return;

      }


      list.innerHTML =
        data
          .map(
            function (
              store
            ) {

              const distance =
                store.distance != null
                  ? `${store.distance.toFixed(1)} km`
                  : "";


              return `

                <article
                  class="
                    store-card
                    ${
                      selectedStore === store.id
                        ? "is-selected"
                        : ""
                    }
                  "
                  data-store-id="${store.id}"
                >

                  <div
                    class="store-card__top"
                  >

                    <h3
                      class="store-card__name"
                    >
                      ${escapeHTML(store.name)}
                    </h3>


                    ${
                      distance
                        ? `
                          <span
                            class="store-card__distance"
                          >
                            ${distance}
                          </span>
                        `
                        : ""
                    }

                  </div>


                  <p
                    class="store-card__address"
                  >
                    ${escapeHTML(store.address)}
                  </p>


                  <div
                    class="store-card__meta"
                  >

                    <span
                      class="store-card__tag"
                    >
                      ${escapeHTML(store.hours)}
                    </span>

                    <span
                      class="store-card__tag"
                    >
                      ${escapeHTML(store.city)}
                    </span>

                  </div>


                  <div
                    class="store-card__actions"
                  >

                    <a
                      class="store-card__action"
                      href="tel:${escapeHTML(store.phone)}"
                      onclick="event.stopPropagation()"
                    >
                      Call Store
                    </a>


                    <a
                      class="store-card__action"
                      href="https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}"
                      target="_blank"
                      rel="noopener noreferrer"
                      onclick="event.stopPropagation()"
                    >
                      Directions
                    </a>

                  </div>

                </article>

              `;

            }
          )
          .join("");


      list
        .querySelectorAll(
          ".store-card"
        )
        .forEach(
          function (card) {

            card.addEventListener(
              "click",
              function () {

                const id =
                  Number(
                    card.dataset.storeId
                  );

                selectStore(id);

              }
            );

          }
        );

    }


    /* =====================================================
       SELECT STORE
       ===================================================== */

    function selectStore(
      id
    ) {

      const store =
        stores.find(
          function (item) {

            return item.id === id;

          }
        );


      if (!store) return;


      selectedStore =
        store.id;


      render(
        currentStores
      );


      if (mapText) {

        mapText.textContent =
          `${store.name} • ${store.city}`;

      }


      updateMap(
        store
      );

    }


    /* =====================================================
       UPDATE MAP
       ===================================================== */

    function updateMap(
      store
    ) {

      const map =
        document.querySelector(
          ".store-map"
        );

      if (!map) return;


      const pin =
        document.getElementById(
          "mapCenter"
        );

      if (!pin) return;


      const index =
        stores.indexOf(store);


      const positions = [

        {
          x: 50,
          y: 50
        },

        {
          x: 62,
          y: 37
        },

        {
          x: 38,
          y: 63
        },

        {
          x: 32,
          y: 38
        },

        {
          x: 67,
          y: 62
        },

        {
          x: 48,
          y: 29
        }

      ];


      const position =
        positions[index] ||
        positions[0];


      pin.style.left =
        `${position.x}%`;


      pin.style.top =
        `${position.y}%`;


      pin.style.transform =
        "translate(-50%,-50%)";


      if (
        gsapReady &&
        !reducedMotion
      ) {

        gsap.fromTo(
          pin,

          {
            scale: .7,
            opacity: .6
          },

          {
            scale: 1,
            opacity: 1,
            duration: .5,
            ease: "back.out(1.5)"
          }
        );

      }

    }


    /* =====================================================
       STORE SEARCH
       ===================================================== */

    function filter(
      value
    ) {

      const query =
        value
          .trim()
          .toLowerCase();


      if (!query) {

        render(
          stores.slice()
        );

        return;

      }


      const results =
        stores.filter(
          function (store) {

            return (

              store.name
                .toLowerCase()
                .includes(query)

              ||

              store.city
                .toLowerCase()
                .includes(query)

              ||

              store.state
                .toLowerCase()
                .includes(query)

              ||

              store.address
                .toLowerCase()
                .includes(query)

            );

          }
        );


      render(
        results
      );

    }


    if (search) {

      search.addEventListener(
        "input",
        function () {

          filter(
            search.value
          );

        }
      );

    }


    /* =====================================================
       BROWSER LOCATION
       ===================================================== */

    if (locationButton) {

      locationButton.addEventListener(
        "click",
        function () {

          getUserLocation();

        }
      );

    }


    function getUserLocation() {

      if (
        !navigator.geolocation
      ) {

        if (status) {

          status.textContent =
            "Location is not supported by this browser.";

        }

        return;

      }


      if (status) {

        status.textContent =
          "Finding stores near you...";

      }


      locationButton.disabled =
        true;


      navigator.geolocation.getCurrentPosition(

        function (
          position
        ) {

          const userLat =
            position.coords.latitude;

          const userLng =
            position.coords.longitude;


          const nearby =
            stores
              .map(
                function (store) {

                  return {

                    ...store,

                    distance:
                      calculateDistance(
                        userLat,
                        userLng,
                        store.lat,
                        store.lng
                      )

                  };

                }
              )
              .sort(
                function (a, b) {

                  return (
                    a.distance -
                    b.distance
                  );

                }
              );


          render(
            nearby
          );


          if (nearby.length) {

            selectStore(
              nearby[0].id
            );

          }


          if (status) {

            status.textContent =
              "Stores sorted by distance from your location.";

          }


          locationButton.disabled =
            false;

        },


        function () {

          if (status) {

            status.textContent =
              "Unable to access your location. Please search for a city.";

          }


          locationButton.disabled =
            false;

        },


        {
          enableHighAccuracy: true,

          timeout: 10000,

          maximumAge: 300000

        }

      );

    }


    /* =====================================================
       HAVERSINE DISTANCE
       ===================================================== */

    function calculateDistance(
      lat1,
      lon1,
      lat2,
      lon2
    ) {

      const earthRadius =
        6371;


      const dLat =
        degreesToRadians(
          lat2 - lat1
        );

      const dLon =
        degreesToRadians(
          lon2 - lon1
        );


      const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2)

        +

        Math.cos(
          degreesToRadians(lat1)
        )

        *

        Math.cos(
          degreesToRadians(lat2)
        )

        *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);


      const c =
        2 *
        Math.atan2(
          Math.sqrt(a),
          Math.sqrt(1 - a)
        );


      return earthRadius * c;

    }


    function degreesToRadians(
      degrees
    ) {

      return (
        degrees *
        Math.PI /
        180
      );

    }


    /* =====================================================
       INITIAL STORE STATE
       ===================================================== */

    render(
      stores
    );


    if (stores.length) {

      selectStore(
        stores[0].id
      );

    }

  }


  /* =========================================================
     11. MASCOT FLOAT
     ========================================================= */

  function initMascotFloat() {

    if (
      !gsapReady ||
      reducedMotion
    ) return;


    const elements =
      document.querySelectorAll(
        "[data-float]"
      );


    elements.forEach(
      function (
        element,
        index
      ) {

        gsap.to(
          element,
          {

            y: "+=14",

            rotate:
              index % 2 === 0
                ? 1.2
                : -1.2,

            duration:
              3.2 +
              index * .3,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

          }
        );

      }
    );

  }


  /* =========================================================
     FALLBACK
     ========================================================= */

  window.addEventListener(
    "load",
    function () {

      setTimeout(
        function () {

          document
            .querySelectorAll(
              "[data-reveal], [data-reveal-mascot]"
            )
            .forEach(
              function (element) {

                const opacity =
                  parseFloat(
                    getComputedStyle(
                      element
                    ).opacity
                  );


                if (
                  opacity < 1
                ) {

                  element.style.opacity =
                    "1";

                  element.style.transform =
                    "none";

                }

              }
            );


          const chars =
            document.querySelector(
              "[data-chars]"
            );


          if (chars) {

            const transform =
              getComputedStyle(
                chars
              ).transform;


            if (
              transform &&
              transform !== "none"
            ) {

              chars.style.transform =
                "none";

            }

          }

        },
        2500
      );

    }
  );


})();