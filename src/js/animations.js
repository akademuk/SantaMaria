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

// Bento Grid Stagger
gsap.from('.bento-item', {
    scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 80%',
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power3.out'
});

// Rooms Slider (Simple fade up for now, Swiper handles the rest)
gsap.from('.room-card', {
    scrollTrigger: {
        trigger: '.rooms-slider',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

// Medical Reveal Features
gsap.utils.toArray('.feature-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: i * 0.1
    });
});

// Infrastructure Horizontal Scroll
// Note: We are using native CSS scroll snap, but we can add a parallax effect to images
gsap.utils.toArray('.infra-card img').forEach(img => {
    gsap.to(img, {
        scrollTrigger: {
            trigger: img.closest('.infra-card'),
            containerAnimation: null, // If we were using a GSAP horizontal scroll, we'd need this
            start: 'left right',
            end: 'right left',
            scrub: true,
            horizontal: true // This only works if the scroller is horizontal, which it isn't (the container is)
        },
        // Since we are using native scroll, GSAP ScrollTrigger horizontal is tricky without a proxy.
        // Let's keep it simple: just a fade in when they come into view vertically if possible, 
        // or just let CSS handle the layout.
        // Actually, let's animate the section title.
    });
});

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

