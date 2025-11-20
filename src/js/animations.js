/* 
   GSAP ANIMATIONS
   Scroll-triggered effects for Santa Maria Resort
*/

gsap.registerPlugin(ScrollTrigger);

// Hero Animation
const heroTl = gsap.timeline();
heroTl.from('.hero__title', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'power4.out',
    delay: 0.5
})
.from('.hero__subtitle', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
}, '-=1')
.from('.hero__btns', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
}, '-=0.8');

// Header Scroll Effect
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: {className: 'scrolled', targets: '.header'}
});

// Bento Grid Stagger - REMOVED per request
// gsap.from('.bento-item', {
//     scrollTrigger: {
//         trigger: '.bento-grid',
//         start: 'top 80%',
//     },
//     y: 100,
//     opacity: 0,
//     duration: 1,
//     stagger: 0.1,
//     ease: 'power3.out'
// });

// Rooms Slider - REMOVED per request
// gsap.from('.room-card', {
//     scrollTrigger: {
//         trigger: '.rooms-grid',
//         start: 'top 80%',
//     },
//     y: 50,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.2,
//     ease: 'power2.out'
// });

// Medical Reveal Features - REMOVED per request
// gsap.utils.toArray('.feature-item').forEach((item, i) => {
//     gsap.from(item, {
//         scrollTrigger: {
//             trigger: item,
//             start: 'top 85%',
//         },
//         x: -50,
//         opacity: 0,
//         duration: 0.8,
//         ease: 'power2.out',
//         delay: i * 0.1
//     });
// });

// Infrastructure Horizontal Scroll
// Note: We are using native CSS scroll snap, but we can add a parallax effect to images
// REMOVED scale effect to improve scroll performance on mobile
// gsap.utils.toArray('.infra-card img').forEach(img => {
//     gsap.fromTo(img,
//         { scale: 1.1 },
//         {
//             scale: 1,
//             scrollTrigger: {
//                 trigger: img.closest('.infra-card'),
//                 start: 'top 90%',
//                 end: 'bottom top',
//                 scrub: true,
//             },
//             ease: 'none'
//         }
//     );
// });

gsap.from('.infra-text', {
    scrollTrigger: {
        trigger: '.infrastructure-scroll',
        start: 'top 70%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

