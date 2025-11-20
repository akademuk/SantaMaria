/* 
   MAIN APPLICATION SCRIPT
   Initialization of libraries and core logic
*/

document.addEventListener('DOMContentLoaded', () => {

    // Loader Logic
    const loader = document.getElementById('loader');
    if (loader) {
        // Ensure loader stays for at least a moment to show branding
        // But also hide it when window is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 800); // Slight delay for smooth experience
        });
        
        // Fallback in case load event doesn't fire or takes too long
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 5000);
    }

    // Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        // Integrate with GSAP ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        } else {
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
        
        console.log('Lenis Smooth Scroll Initialized');
    }

    // Initialize Swiper for Rooms
    // Note: Ensure Swiper CSS and JS are included in HTML
    if (typeof Swiper !== 'undefined') {
        const initSwiperInstance = (selector, options) => {
            const element = document.querySelector(selector);
            if (!element) {
                return null;
            }
            return new Swiper(element, options);
        };

        initSwiperInstance('.rooms-slider', {
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
        initSwiperInstance('.marquee-row-1', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            loop: true,
            speed: 8000, // Slower, smoother speed
            allowTouchMove: false, // Disable dragging to prevent stopping
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false, 
            },
        });

        initSwiperInstance('.marquee-row-2', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            loop: true,
            speed: 8000, // Slower, smoother speed
            allowTouchMove: false, // Disable dragging to prevent stopping
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true,
                pauseOnMouseEnter: false,
            },
        });

        // Infrastructure Scroll (Flow like water)
        initSwiperInstance('.infra-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            loop: true,
            speed: 5000, // Adjusted speed for better flow
            allowTouchMove: false, // Disable dragging to prevent stopping
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            },
            // centeredSlides: true, // Removed to prevent stopping at center
        });

        // Testimonials Slider
        initSwiperInstance('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 40,
            loop: true,
            autoplay: {
                delay: 6000,
            },
            // Pagination removed as requested
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

    optimizeMediaLoading();

    // Initialize Custom Selects
    initCustomSelects();

    // Mobile Menu Toggle
    initMobileNav();
});

// Custom Select Logic
function initCustomSelects() {
    const selects = document.querySelectorAll('select.form-input');
    
    selects.forEach(select => {
        // Hide original select
        select.style.display = 'none';
        
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
        
        // Create custom select container
        const customSelect = document.createElement('div');
        customSelect.className = 'custom-select';
        wrapper.appendChild(customSelect);
        
        // Create trigger (selected value display)
        const trigger = document.createElement('div');
        trigger.className = 'custom-select__trigger';
        const selectedOption = select.options[select.selectedIndex];
        trigger.innerHTML = `<span>${selectedOption.text}</span>`;
        
        // Arrow icon
        const arrow = document.createElement('div');
        arrow.className = 'custom-select__arrow';
        trigger.appendChild(arrow);
        
        customSelect.appendChild(trigger);
        
        // Create options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'custom-select__options';
        customSelect.appendChild(optionsContainer);
        
        // Populate options
        Array.from(select.options).forEach(option => {
            if (option.disabled) return; // Skip disabled placeholder
            
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.textContent = option.text;
            customOption.dataset.value = option.value;
            
            if (option.selected) {
                customOption.classList.add('selected');
            }
            
            customOption.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Update original select
                select.value = option.value;
                select.dispatchEvent(new Event('change')); // Trigger change event
                
                // Update UI
                trigger.querySelector('span').textContent = option.text;
                customSelect.classList.remove('open');
                
                // Update selected class
                optionsContainer.querySelectorAll('.custom-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                customOption.classList.add('selected');
            });
            
            optionsContainer.appendChild(customOption);
        });
        
        // Toggle dropdown
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other selects
            document.querySelectorAll('.custom-select').forEach(el => {
                if (el !== customSelect) el.classList.remove('open');
            });
            customSelect.classList.toggle('open');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select')) {
            document.querySelectorAll('.custom-select').forEach(el => {
                el.classList.remove('open');
            });
        }
    });
}

function optimizeMediaLoading() {
    const heroSelectors = ['.hero', '.page-hero'];
    const heroImages = heroSelectors
        .map(selector => document.querySelector(`${selector} picture img, ${selector} img`))
        .filter(Boolean);

    heroImages.forEach(img => {
        img.loading = 'eager';
        img.decoding = 'async';
        img.fetchPriority = 'high';
    });

    const deferredImages = Array.from(new Set(document.querySelectorAll('picture img, img')));
    deferredImages.forEach(img => {
        if (heroImages.includes(img)) {
            return;
        }
        img.loading = 'lazy';
        img.decoding = 'async';
        if (!img.fetchPriority) {
            img.fetchPriority = 'low';
        }
    });
}

function initMobileNav() {
    const burgerBtn = document.querySelector('.burger-btn');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    if (!burgerBtn || !nav || !header) {
        return;
    }

    const closeMenu = () => {
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        header.classList.remove('nav-active');
        burgerBtn.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        const willOpen = !nav.classList.contains('is-open');
        nav.classList.toggle('is-open', willOpen);
        document.body.classList.toggle('nav-open', willOpen);
        header.classList.toggle('nav-active', willOpen);
        burgerBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    };

    burgerBtn.addEventListener('click', toggleMenu);

    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}
