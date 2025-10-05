var elem = document.querySelector(".carousel");
var flkty = new Flickity(elem, {
  // options
  cellAlign: "center",
  imagesLoaded: true,
  lazyLoad: 1,
  freeScroll: false,
  wrapAround: true,
  autoPlay: 3000,
  pauseAutoPlayOnHover: true,
  prevNextButtons: true,
  contain: true,
  adaptiveHeight: true,
  dragThreshold: 10,
  percentPosition: true,
  pageDots: true,
  rightToLeft: false,
  draggable: true,
  selectedAttraction: 0.1,
  parallax: 0,
  friction: 0.9,
});

