// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
        });
    }
    
    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#00d9ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00d9ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Initialize VanillaTilt for 3D card effect
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-element"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (preloader) {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: function() {
                        if (preloader) {
                            preloader.style.display = 'none';
                        }
                    }
                });
            }
        }, 2000);
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.querySelector('.bar:nth-child(1)').style.transform = 'rotate(45deg) translate(6px, 6px)';
                this.querySelector('.bar:nth-child(2)').style.opacity = '0';
                this.querySelector('.bar:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                this.querySelector('.bar:nth-child(1)').style.transform = 'none';
                this.querySelector('.bar:nth-child(2)').style.opacity = '1';
                this.querySelector('.bar:nth-child(3)').style.transform = 'none';
            }
        });
    }
    
    // Transparent Header on Scroll
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    if (hero && header) {
        header.classList.add('transparent');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.remove('transparent');
            } else {
                header.classList.add('transparent');
            }
        });
    }
    
    // Parallax effect
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    if (parallaxSections.length > 0) {
        parallaxSections.forEach(section => {
            const speed = parseFloat(section.getAttribute('data-speed')) || 0.2;
            
            gsap.to(section, {
                backgroundPositionY: `${speed * 100}%`,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
    
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    function revealOnScroll() {
        revealElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once to reveal elements in viewport on page load
    
    // Typewriter effect for hero subtitle
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        typewriter.style.width = "0";
        setTimeout(() => {
            typewriter.style.width = "100%";
        }, 1000);
    }
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    function runCounter() {
        counters.forEach(counter => {
            if (!counter) return;
            
            const targetAttr = counter.getAttribute('data-target');
            if (!targetAttr) return;
            
            const target = parseInt(targetAttr);
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(runCounter, 50);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Initialize counter animation when counters section is in view
    if (counters.length > 0) {
        const counterSection = document.querySelector('.counter-section');
        if (counterSection) {
            ScrollTrigger.create({
                trigger: '.counter-section',
                start: 'top 80%',
                onEnter: runCounter
            });
        }
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't already active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Initialize Swiper Slider if exists and Swiper is defined
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider && typeof Swiper !== 'undefined') {
        try {
            new Swiper('.testimonial-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }
            });
        } catch (error) {
            console.warn('Error initializing Swiper:', error);
        }
    }
    
    // GSAP animations for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.from('.hero-content h1', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5
        });
        
        gsap.from('.hero-content p', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 2.5
        });
        
        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 3
        });
    }
    
    // GSAP animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesSection = document.querySelector('.services');
    
    if (serviceCards.length > 0 && servicesSection) {
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services',
                start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        });
    }
    
    // Newsletter form animation
    const newsletterForm = document.querySelector('.newsletter-form');
    const footerNewsletter = document.querySelector('.footer-newsletter');
    
    if (newsletterForm && footerNewsletter) {
        gsap.from('.newsletter-form', {
            scrollTrigger: {
                trigger: '.footer-newsletter',
                start: 'top 90%'
            },
            x: -50,
            opacity: 0,
            duration: 0.8
        });
    }
    
    // Pulse animation for primary button
    const pulseButtons = document.querySelectorAll('.pulse');
    pulseButtons.forEach(button => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    });
    
    // Glow animation for secondary button
    const glowButtons = document.querySelectorAll('.glow');
    glowButtons.forEach(button => {
        gsap.to(button, {
            boxShadow: '0 0 15px 5px rgba(0, 217, 255, 0.7)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (menu && menu.classList.contains('active')) {
                        menu.classList.remove('active');
                        if (menuToggle) {
                            menuToggle.classList.remove('active');
                            menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
                            menuToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
                            menuToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
                        }
                    }
                }
            }
        });
    });
});
