// ========================================
// BUBBLE ANIMATION SYSTEM
// ========================================
class BubbleSystem {
    constructor() {
        this.container = document.getElementById('bubbleContainer');
        this.colors = ['#FFD700', '#1E90FF', '#FFA500', '#FF6B6B'];
        this.init();
    }

    init() {
        // Bulles au clic
        document.addEventListener('click', (e) => this.createBubbles(e.clientX, e.clientY, 10));
        
        // Bulles au scroll
        let scrollTimeout;
        document.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const x = window.innerWidth / 2;
                const y = window.scrollY + window.innerHeight / 2;
                this.createBubbles(x, y, 12);
            }, 50);
        });

        // Bulles au hover sur les éléments interactifs
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const rect = el.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                this.createBubbles(x, y, 8);
            });
        });
    }

    createBubbles(x, y, count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createBubble(x, y);
            }, i * 30);
        }
    }

    createBubble(x, y) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 40 + 20;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 100;
        
        bubble.style.left = x + 'px';
        bubble.style.top = y + 'px';
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.background = color;
        bubble.style.setProperty('--tx', tx + 'px');
        bubble.style.setProperty('--ty', ty + 'px');
        
        this.container.appendChild(bubble);
        
        setTimeout(() => {
            bubble.remove();
        }, 3000);
    }
}

// ========================================
// SCROLL REVEAL SYSTEM
// ========================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// ========================================
// IMAGE LAZY LOADING WITH DELAY
// ========================================
class ImageReveal {
    constructor() {
        this.images = document.querySelectorAll('img');
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 1s ease-in-out';
                    
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 3000); // 3 secondes de délai
                    
                    this.observer.unobserve(img);
                }
            });
        }, {
            threshold: 0.1
        });

        this.images.forEach(img => {
            this.observer.observe(img);
        });
    }
}

// ========================================
// NAVIGATION
// ========================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.hamburger.classList.toggle('active');
            });
        }

        // Close menu on link click
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
            });
        });

        // Active link on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// PARALLAX EFFECT
// ========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image, .why-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// ========================================
// FORM VALIDATION (for contact page)
// ========================================
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        Object.keys(data).forEach(key => {
            if (!data[key] && key !== 'message') {
                isValid = false;
            }
        });

        if (isValid) {
            // Submit to Formspree
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Message envoyé avec succès! Nous vous contacterons bientôt.');
                    form.reset();
                } else {
                    alert('Erreur lors de l\'envoi. Veuillez réessayer.');
                }
            }).catch(error => {
                alert('Erreur lors de l\'envoi. Veuillez réessayer.');
            });
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });
}

// ========================================
// LOADING ANIMATION
// ========================================
function initPageLoader() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero .reveal-left, .hero .reveal-right');
            heroElements.forEach(el => el.classList.add('revealed'));
        }, 300);
    });
}

// ========================================
// MOUSE FOLLOWER (optional enhancement)
// ========================================
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.3);
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        follower.style.display = 'block';
        follower.style.left = e.clientX - 10 + 'px';
        follower.style.top = e.clientY - 10 + 'px';
    });

    const interactiveEls = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = 'scale(1)';
        });
    });
}

// ========================================
// INITIALIZE ALL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core systems
    new BubbleSystem();
    new ScrollReveal();
    new ImageReveal();
    new Navigation();
    
    // Initialize features
    initSmoothScroll();
    initParallax();
    animateCounters();
    initFormValidation();
    initPageLoader();
    initMouseFollower();
    
    console.log('🎨 Beverly Fleurisma Portfolio Loaded');
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Any scroll-based updates
}, 100);

window.addEventListener('scroll', optimizedScroll);
