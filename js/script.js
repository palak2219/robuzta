// ============================================================
// 1. MOBILE NAVBAR
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ============================================================
// 2. HEADER SCROLL SHADOW
// ============================================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ============================================================
// 3. TABS (Homepage)
// ============================================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabBtns.length && tabContents.length) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.dataset.tab;
            tabContents.forEach(content => {
                content.classList.toggle('active', content.id === targetId);
            });
        });
    });
}

// ============================================================
// 4. FAQ ACCORDION
// ============================================================
const faqQuestions = document.querySelectorAll('.faq-question');

if (faqQuestions.length) {
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
}

// ============================================================
// 5. SCROLL ANIMATIONS (Intersection Observer)
// ============================================================
const fadeElements = document.querySelectorAll('.fade-up');

if (fadeElements.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
}

// ============================================================
// 6. COUNTER ANIMATION
// ============================================================
const counters = document.querySelectorAll('.num');

if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 80;
        const stepTime = 1500 / 80;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target > 10 ? '+' : '%');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
}

// ============================================================
// 7. CONTACT FORM (Simple validation + alert)
// ============================================================
const forms = document.querySelectorAll('#contactForm');

forms.forEach(form => {
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = this.querySelector('input[placeholder*="Full name"]') || this.querySelector('input[placeholder*="Name"]');
            const phone = this.querySelector('input[placeholder*="Phone"]') || this.querySelector('input[type="tel"]');
            const device = this.querySelector('select');

            if ((name && !name.value.trim()) || (phone && !phone.value.trim())) {
                alert('⚠️ Please fill in all required fields (Name and Phone).');
                return;
            }

            alert('✅ Thank you! Your repair request has been sent. We\'ll contact you within 30 minutes.');
            this.reset();
        });
    }
});

// ============================================================
// 8. SMOOTH SCROLL FOR NAV LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================================
// 9. NEWSLETTER FORM
// ============================================================
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input[type="email"]');
        if (input && input.value.trim()) {
            alert('✅ Thank you for subscribing! You\'ll receive our latest updates.');
            this.reset();
        } else {
            alert('⚠️ Please enter a valid email address.');
        }
    });
});
// ============================================================
// 10. SCROLL PROGRESS BAR
// ============================================================
const progressBar = document.getElementById('progressBar');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ============================================================
// 11. BACK TO TOP BUTTON
// ============================================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// 12. COOKIE CONSENT BANNER
// ============================================================
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

if (cookieBanner) {
    // Check if user already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    if (declineCookies) {
        declineCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'false');
            cookieBanner.classList.remove('show');
        });
    }
}

// ============================================================
// 13. REPAIR TRACKER (Homepage)
// ============================================================
const trackerForm = document.getElementById('trackerForm');
const trackerStatus = document.getElementById('trackerStatus');

if (trackerForm && trackerStatus) {
    trackerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        const id = input.value.trim();

        if (!id) {
            alert('⚠️ Please enter a valid Repair ID.');
            return;
        }

        // Simulate status check
        const statuses = ['received', 'in-progress', 'completed'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const statusLabels = {
            'received': '📥 Received — We\'re reviewing your device',
            'in-progress': '🔧 In Progress — Our technicians are working on it',
            'completed': '✅ Completed — Your device is ready for pickup/delivery'
        };

        trackerStatus.className = 'tracker-status show';
        trackerStatus.innerHTML = `
            <span class="status-badge ${randomStatus}">
                ${randomStatus === 'received' ? '📥 Received' : randomStatus === 'in-progress' ? '🔧 In Progress' : '✅ Completed'}
            </span>
            <div class="tracker-details">
                <p><strong>Repair ID:</strong> ${id}</p>
                <p>${statusLabels[randomStatus]}</p>
                <p style="font-size:0.85rem; color:#94a3b8; margin-top:8px;">
                    <i class="far fa-clock"></i> Last updated: ${new Date().toLocaleString()}
                </p>
            </div>
        `;
    });
}

// ============================================================
// 14. TESTIMONIAL SLIDER
// ============================================================
const testimonialTrack = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dots = document.querySelectorAll('.slider-dot');

if (testimonialTrack && prevBtn && nextBtn) {
    let currentIndex = 0;
    const slides = testimonialTrack.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    let slidesPerView = 3;

    // Update slides per view based on screen width
    function updateSlidesPerView() {
        if (window.innerWidth <= 640) slidesPerView = 1;
        else if (window.innerWidth <= 1024) slidesPerView = 2;
        else slidesPerView = 3;
    }

    function updateSlider() {
        updateSlidesPerView();
        const maxIndex = totalSlides - slidesPerView;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const slideWidth = slides[0].offsetWidth + 30; // + gap
        testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = totalSlides - slidesPerView;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
}

// ============================================================
// 15. FLOATING BUTTON PULSE ANIMATION (Add dynamically)
// ============================================================
document.querySelectorAll('.whatsapp-float, .call-float').forEach(btn => {
    const pulse = document.createElement('span');
    pulse.className = 'pulse';
    btn.appendChild(pulse);
});

console.log('🚀 Advanced features loaded successfully!');
console.log('📱 WhatsApp + Call buttons, Progress bar, Back to top, Cookie consent, Repair tracker, Testimonial slider');
console.log('🚀 Robuzta Techlabs — All Pages Loaded Successfully!');
console.log('💡 Built with ❤️ using HTML, CSS & Vanilla JS.');