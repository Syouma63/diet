// swiper

const mySwiper = new Swiper('.swiper-container', {
  loop: false,
  effect: 'fade',
  centeredSlides: true,
  slidesPerView: 1,
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  }
});
