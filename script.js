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
   11. Mascot floating

   COLLECTIONS

   01. Cheese Bomb
   02. Fazea
   03. HebaCake
   04. Kaushri
   05. Qashtuta
   06. Ruh Hayati
   07. Salankatia

   TOTAL PRODUCTS: 22

   NOTE:
   OUR LOCATION lists the two real ZIN LABAN shops
   (Karuvarakundu and Kalikavu). Clicking a shop in
   the list highlights it and swaps the embedded
   Google Map on the right to that shop's location,
   updating the "Open in Google Maps" link to its
   real Maps URL. A separate franchise-enquiry phone
   number is shown below the shop list (no map, since
   no location was provided for it).
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
     REAL ZIN LABAN SHOP DATA — exactly two shops.

     mapQuery is only used to render the embedded
     Google Maps iframe on the right (a plain
     place-name search — no API key, no invented
     coordinates or address, since Google does not
     allow embedding maps.app.goo.gl / share.google
     short links directly as an iframe src).

     mapsUrl is the exact Google Maps link supplied
     for that shop and is what "Open in Google Maps"
     actually points to.
  */

  const stores = [

    {
      id: 1,

      name: "Karuvarakundu",

      phone: "+91 88482 44939",

      phoneHref: "tel:+918848244939",

      mapsUrl:
        "https://maps.app.goo.gl/ewZpfHeiiTRuP5F47?g_st=ic",

      mapQuery:
        "ZIN LABAN, Karuvarakundu, Kerala"

    },

    {
      id: 2,

      name: "Kalikavu",

      phone: "+91 62352 44939",

      phoneHref: "tel:+916235244939",

      mapsUrl:
        "https://share.google/UygjaB3tIm0Raf58n",

      mapQuery:
        "ZIN LABAN, Kalikavu, Kerala"

    }

  ];


  function initLocation() {

    const list =
      document.getElementById(
        "storeList"
      );

    const frame =
      document.getElementById(
        "storeMapFrame"
      );

    const infoLink =
      document.getElementById(
        "mapInfoLink"
      );

    const infoText =
      document.getElementById(
        "mapInfoText"
      );

    if (
      !list ||
      !frame
    ) return;


    let selected =
      stores[0].id;


    function render() {

      list.innerHTML =
        stores
          .map(
            function (store) {

              return `

                <article
                  class="
                    store-card
                    ${
                      selected === store.id
                        ? "is-selected"
                        : ""
                    }
                  "
                  data-store-id="${store.id}"
                >

                  <h3
                    class="store-card__name"
                  >
                    ${escapeHTML(store.name)}
                  </h3>

                  <a
                    class="store-card__phone"
                    href="${store.phoneHref}"
                    onclick="event.stopPropagation()"
                  >
                    ${escapeHTML(store.phone)}
                  </a>

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

                selectStore(
                  Number(
                    card.dataset.storeId
                  )
                );

              }
            );

          }
        );

    }


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


      selected =
        store.id;


      render();

      updateMap(
        store
      );

    }


    function updateMap(
      store
    ) {

      frame.src =
        "https://www.google.com/maps?q=" +
        encodeURIComponent(
          store.mapQuery
        ) +
        "&output=embed";


      if (infoLink) {

        infoLink.href =
          store.mapsUrl;

      }


      if (infoText) {

        infoText.textContent =
          `Open in Google Maps — ${store.name}`;

      }

    }


    render();

    selectStore(
      stores[0].id
    );

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
