/* 
   MAIN APPLICATION SCRIPT
   Initialization of libraries and core logic
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('Santa Maria Resort - Premium Experience Loaded');

    // Initialize Swiper for Rooms
    // Note: Ensure Swiper CSS and JS are included in HTML
    if (typeof Swiper !== 'undefined') {
        const roomSwiper = new Swiper('.rooms-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Grand Gallery Loop (Double Marquee)
        const gallerySwiper1 = new Swiper('.marquee-row-1', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            loop: true,
            speed: 5000, // Slow continuous scroll
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            allowTouchMove: true,
            freeMode: true,
            freeModeMomentum: false,
        });

        const gallerySwiper2 = new Swiper('.marquee-row-2', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            loop: true,
            speed: 5000, // Slow continuous scroll
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true,
                pauseOnMouseEnter: true,
            },
            allowTouchMove: true,
            freeMode: true,
            freeModeMomentum: false,
        });

        // Infrastructure Scroll (Flow like water)
        const infraSwiper = new Swiper('.infra-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            loop: true,
            speed: 6000, // Even slower flow
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            allowTouchMove: true,
            freeMode: true,
            freeModeMomentum: false,
            centeredSlides: true,
        });

        // Testimonials Slider
        const testimonialSwiper = new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 40,
            loop: true,
            autoplay: {
                delay: 6000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                }
            }
        });
    }

    // Initialize Fancybox
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]", {
            // Your custom options
        });
    }

    // Mobile Menu Toggle
    const burgerBtn = document.querySelector('.burger-btn');
    const nav = document.querySelector('.nav'); // You might need to add a mobile nav container in HTML or CSS
    
    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            // Simple toggle for now, ideally we'd have a full screen menu overlay
            alert('Mobile menu would open here. (Implementation pending HTML update for mobile menu container)');
        });
    }
});
