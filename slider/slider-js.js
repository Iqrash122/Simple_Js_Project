// const navButton = (onNextClick, onPrevClick) => {
//   const navWrapper = document.createElement("div");
//   const nextButton = document.createElement("button");
//   const prevButton = document.createElement("button");

//   navWrapper.setAttribute("class", "slider-nav");
//   nextButton.innerText = "Next";
//   prevButton.innerText = "Previous";

//   nextButton.addEventListener("click", onNextClick);
//   prevButton.addEventListener("click", onPrevClick);

//   navWrapper.appendChild(nextButton);
//   navWrapper.appendChild(prevButton);

//   return navWrapper;
// };

// const dotsButton = (numOfSliders, sliderCont) => {
//   const dotsWrapper = document.createElement("div");
//   dotsWrapper.setAttribute("class", "slider-dots");
//   let sliderTotalItems = sliderCont.children.length;
//   let numberOfDots = Math.ceil(sliderTotalItems / numOfSliders);
//   for (let i = 0; i < numberOfDots; i++) {
//     const dotSpan = document.createElement("span");
//     dotSpan.classList.add("dot");
//     dotsWrapper.appendChild(dotSpan);
//  }
//   const ShowDots = document.getElementsByClassName('dots');

  




//   return dotsWrapper;
// };

// const showSliderItems = (numOfSliders, sliderCont, currentItem) => {
//   const imageWrapper = document.createElement("div");
//   imageWrapper.setAttribute("class", "slider-items");
//   let totalImage = sliderCont.children.length;

//   for (let i = 0; i < totalImage; i++) {
//     const image = document.createElement("h1");
//     imageWrapper.appendChild(image);
//   }
//   return imageWrapper;
// };

// const SliderIntro = (args) => {
//   const sliderWrapper = document.querySelector(".slider-wrapper");
//   const sliderCont = document.querySelector(".slider-cont");

//   let currentItem = 0;

//   const sliderObject = {
//     numOfSlides: Number(args.numberOfSlides),
//     navigation: Boolean(args.navButtons),
//     sliderGap: String(args.sliderGap),
//     dots: Boolean(args.showDots),
//     image: String(args.showImages),
//   };

//   sliderCont.style.gap = sliderObject.sliderGap;

//   const handleNextClick = () => {
//     currentItem = (currentItem + 1) % sliderCont.children.length;
//     updateSlider();
//   };

//   const handlePrevClick = () => {
//     currentItem =
//       (currentItem - 1 + sliderCont.children.length) %
//       sliderCont.children.length;
//     updateSlider();
//   };

//   const updateSlider = () => {
//     const items = sliderCont.children;
//     for (let i = 0; i < items.length; i++) {
//       items[i].style.display =
//         i >= currentItem && i <= currentItem + sliderObject.numOfSlides
//           ? "none"
//           : "block";
//     }
//   };

//   if (sliderObject.navigation) {
//     sliderWrapper.append(navButton(handleNextClick, handlePrevClick));
//   }

//   if (sliderObject.dots) {
//     sliderWrapper.append(dotsButton(sliderObject.numOfSlides, sliderCont));
//   }

//   if (sliderObject.image) {
//     sliderWrapper.append(
//       showSliderItems(sliderObject.numOfSlides, sliderCont, currentItem)
//     );
//   }

//   updateSlider(); // Initial display setup

//   console.log(typeof sliderObject.navigation);
// };

// SliderIntro({
//   numberOfSlides: 2,
//   navButtons: true,
//   sliderGap: "20px",
//   showDots: true,
//   showImages: true,
// });









const navButton = (onNextClick, onPrevClick) => {
    const navWrapper = document.createElement("div");
    const nextButton = document.createElement("button");
    const prevButton = document.createElement("button");
  
    navWrapper.setAttribute("class", "slider-nav");
    nextButton.innerText = "Next";
    prevButton.innerText = "Previous";
  
    nextButton.addEventListener("click", onNextClick);
    prevButton.addEventListener("click", onPrevClick);
  
    navWrapper.appendChild(nextButton);
    navWrapper.appendChild(prevButton);
  
    return navWrapper;
  };
  
  const dotsButton = (numOfSliders, sliderCont) => {
    const dotsWrapper = document.createElement("div");
    dotsWrapper.setAttribute("class", "slider-dots");
    let sliderTotalItems = sliderCont.children.length;
    let numberOfDots = Math.ceil(sliderTotalItems / numOfSliders);
    
    for (let i = 0; i < numberOfDots; i++) {
      const dotSpan = document.createElement("span");
      dotSpan.classList.add("dot");
      dotSpan.dataset.index = i; // Set an identifier for each dot
      dotsWrapper.appendChild(dotSpan);
    }
  
    return dotsWrapper;
  };
  
  const showSliderItems = (numOfSliders, sliderCont, currentItem) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.setAttribute("class", "slider-items");
    let totalImage = sliderCont.children.length;
  
    for (let i = 0; i < totalImage; i++) {
      const image = document.createElement("h1"); 
      imageWrapper.appendChild(image);
    }
    return imageWrapper;
  };
  
  const SliderIntro = (args) => {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const sliderCont = document.querySelector(".slider-cont");
  
    let currentItem = 0;
  
    const sliderObject = {
      numOfSlides: Number(args.numberOfSlides),
      navigation: Boolean(args.navButtons),
      sliderGap: String(args.sliderGap),
      dots: Boolean(args.showDots),
      image: String(args.showImages),
    };
  
    sliderCont.style.gap = sliderObject.sliderGap;
  
    const handleNextClick = () => {
      currentItem = (currentItem + 1) % sliderCont.children.length;
      updateSlider();
    };
  
    const handlePrevClick = () => {
      currentItem =
        (currentItem - 1 + sliderCont.children.length) %
        sliderCont.children.length;
      updateSlider();
    };
  
    const updateDots = () => {
      const dots = document.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
       dot.style.backgroundColor = index== Math.floor(currentItem / sliderObject.numOfSlides) ? "black": "grey";
      });
    };
  
    const updateSlider = () => {
      const items = sliderCont.children;
      for (let i = 0; i < items.length; i++) {
        items[i].style.display =
          i >= currentItem && i < currentItem + sliderObject.numOfSlides
            ? "block"
            : "none";
      }
      updateDots(); // Update the dots' color
    };
  
    if (sliderObject.navigation) {
      sliderWrapper.append(navButton(handleNextClick, handlePrevClick));
    }
  
    if (sliderObject.dots) {
      sliderWrapper.append(dotsButton(sliderObject.numOfSlides, sliderCont));
    }
  
    if (sliderObject.image) {
      sliderWrapper.append(
        showSliderItems(sliderObject.numOfSlides, sliderCont, currentItem)
      );
    }
  
    updateSlider(); // Initial display setup
  };
  
  SliderIntro({
    numberOfSlides: 2,
    navButtons: true,
    sliderGap: "20px",
    showDots: true,
    showImages: true,
  });
  