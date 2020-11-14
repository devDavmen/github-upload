function init() {
  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const backgrounds = [
    `radial-gradient(#565B61, #090c10)`,
    `radial-gradient(#235490, #090c10)`,
    `radial-gradient(#A76626, #090c10)`,
  ];

  let current = 0;
  let scrollNum = 0;

  slides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      changeDots(this);
      nextSlide(index);
      scrollNum(index);
    });
  });

  function changeDots(dot) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  }

  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextLeft = nextPage.querySelector(".pics .image-left");
    const nextRight = nextPage.querySelector(".pics .image-right");
    const currentLeft = currentPage.querySelector(".pics .image-left");
    const currentRight = currentPage.querySelector(".pics .image-right");
    const mainPage = document.querySelector(".main-page");

    const tl = new TimelineMax({
      onStart: function () {
        slides.forEach((slides) => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function () {
        slides.forEach((slides) => {
          slide.style.pointerEvents = "none";
        });
      },
    });

    tl.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
      .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.2")

      .to(mainPage, 0.3, { backgroundImage: backgrounds[pageNumber] })
      .fromTo(
        currentPage,
        0.3,
        { opacity: 1, pointerEvents: "All" },
        { opacity: 0, pointerEvents: "none" }
      )

      .fromTo(
        nextPage,
        0.3,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "All" },
        "-=0.2"
      )

      .fromTo(nextLeft, 0.3, { y: "-100" }, { y: "-10%" }, "-=0.6")
      .fromTo(nextRight, 0.3, { y: "-100" }, { y: "10%" }, "-=0.8")
      .set(nextLeft, { clearProps: "all" })
      .set(nextRight, { clearProps: "all" });

    current = pageNumber;
  }
  document.addEventListener("wheel", throttle(scrollChange, 1500));
  document.addEventListener("touchMove", throttle(scrollChange, 1500));

  function switchDots(dotNumber) {
    const activeDot = document.querySelectorAll(".slide")[dotNumber];
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    activeDot.classList.add("active");
  }

  function scrollChange(e) {
    if (e.deltaY > 0) {
      scrollNum += 1;
    } else {
      scrollNum -= 1;
    }

    if (scrollNum > 2) {
      scrollNum = 0;
    }

    if (scrollNum < 0) {
      scrollNum = 2;
    }
    switchDots(scrollNum);
    nextSlide(scrollNum);
  }

  const hamburger = document.querySelector(".menu");
  const hamburgerLines = document.querySelectorAll(".menu line");
  const menuDrop = document.querySelector(".menu-drop");
  const contacts = document.querySelector(".contacts");
  const social = document.querySelector(".social");

  const tl = new TimelineMax({ paused: true, reversed: true });

  tl.to(menuDrop, 0.5, { y: 0 })
    .fromTo(contacts, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.1")
    .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
    .fromTo(
      hamburgerLines,
      0.8,
      { stroke: "white" },
      { stroke: "black" },
      "-=0.7"
    );

  hamburger.addEventListener("click", () => {
    tl.reversed() ? tl.play() : tl.reverse();
  });
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

init();
