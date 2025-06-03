// Anushka Beauty Care - Main JavaScript File

'use strict';

// Global Variables
let heroSlideIndex = 0;
let currentTestimonial = 0;
let currentLightboxImage = 0;
let lightboxImages = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeHeader();
    initializeSlider();
    initializeTestimonials();
    initializeForms();
    initializeGallery();
    initializeFilters();
    initializeFAQ();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeCountdown();
    
    // Load header and footer
    loadHeaderFooter();
    
    console.log('Anushka Beauty Care website initialized successfully!');
});

// Load Header and Footer
async function loadHeaderFooter() {
    try {
        // Load Header
        const headerResponse = await fetch('./header.html');
        if (headerResponse.ok) {
            const headerHTML = await headerResponse.text();
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = headerHTML;
                
                // Reinitialize mobile menu after header loads
                setTimeout(initializeMobileMenu, 200);
            }
        } else {
            console.warn('Could not load header.html:', headerResponse.status);
        }
        
        // Load Footer
        const footerResponse = await fetch('./footer.html');
        if (footerResponse.ok) {
            const footerHTML = await footerResponse.text();
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = footerHTML;
            }
        } else {
            console.warn('Could not load footer.html:', footerResponse.status);
        }
    } catch (error) {
        console.error('Error loading header/footer:', error);
        // Fallback: Show basic navigation if header/footer can't load
        showFallbackNavigation();
    }
}

// Fallback navigation if header/footer files can't be loaded
function showFallbackNavigation() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer && !headerContainer.innerHTML.trim()) {
        headerContainer.innerHTML = `
            <header class="header" id="header">
                <nav class="navbar glass-nav">
                    <div class="nav-container">
                        <div class="nav-logo">
                            <a href="index.html">
                                <i class="fas fa-crown logo-icon"></i>
                                <span class="logo-text">Anushka Beauty Care</span>
                            </a>
                        </div>
                        <ul class="nav-menu">
                            <li class="nav-item"><a href="index.html" class="nav-link"><i class="fas fa-home"></i> Home</a></li>
                            <li class="nav-item"><a href="about.html" class="nav-link"><i class="fas fa-users"></i> About Us</a></li>
                            <li class="nav-item"><a href="services.html" class="nav-link"><i class="fas fa-spa"></i> Services</a></li>
                            <li class="nav-item"><a href="gallery.html" class="nav-link"><i class="fas fa-images"></i> Gallery</a></li>
                            <li class="nav-item"><a href="appointment.html" class="nav-link appointment-link"><i class="fas fa-calendar-plus"></i> Book Appointment</a></li>
                            <li class="nav-item"><a href="testimonials.html" class="nav-link"><i class="fas fa-star"></i> Reviews</a></li>
                            <li class="nav-item"><a href="contact.html" class="nav-link"><i class="fas fa-phone"></i> Contact</a></li>
                        </ul>
                        <div class="nav-toggle" id="mobile-menu">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                    </div>
                </nav>
            </header>
        `;
        setTimeout(initializeMobileMenu, 100);
    }
}

// Header Scroll Effect
function initializeHeader() {
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

// Hero Slider
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Auto slide
    setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Initialize first slide
    showSlide(0);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide
    slides[heroSlideIndex].classList.remove('active');
    if (dots[heroSlideIndex]) {
        dots[heroSlideIndex].classList.remove('active');
    }
    
    // Calculate next slide
    heroSlideIndex += direction;
    
    if (heroSlideIndex >= slides.length) {
        heroSlideIndex = 0;
    } else if (heroSlideIndex < 0) {
        heroSlideIndex = slides.length - 1;
    }
    
    // Show new slide
    showSlide(heroSlideIndex);
}

function currentSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide
    slides[heroSlideIndex].classList.remove('active');
    if (dots[heroSlideIndex]) {
        dots[heroSlideIndex].classList.remove('active');
    }
    
    heroSlideIndex = slideIndex - 1;
    showSlide(heroSlideIndex);
}

function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active');
    }
}

// Testimonials Slider
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (testimonials.length === 0) return;
    
    // Auto slide testimonials
    setInterval(() => {
        changeTestimonial(1);
    }, 7000);
}

function changeTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (testimonials.length === 0) return;
    
    // Remove active class from current testimonial
    testimonials[currentTestimonial].classList.remove('active');
    
    // Calculate next testimonial
    currentTestimonial += direction;
    
    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }
    
    // Show new testimonial
    testimonials[currentTestimonial].classList.add('active');
}

// Gallery and Lightbox
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    lightboxImages = Array.from(galleryItems);
}

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const img = element.querySelector('img');
    const title = element.querySelector('.gallery-info h3')?.textContent || '';
    const description = element.querySelector('.gallery-info p')?.textContent || '';
    
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-img').alt = img.alt;
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-description').textContent = description;
    
    // Find current image index
    currentLightboxImage = lightboxImages.indexOf(element);
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function previousImage() {
    currentLightboxImage--;
    if (currentLightboxImage < 0) {
        currentLightboxImage = lightboxImages.length - 1;
    }
    updateLightboxImage();
}

function nextImage() {
    currentLightboxImage++;
    if (currentLightboxImage >= lightboxImages.length) {
        currentLightboxImage = 0;
    }
    updateLightboxImage();
}

function updateLightboxImage() {
    const currentElement = lightboxImages[currentLightboxImage];
    if (!currentElement) return;
    
    const img = currentElement.querySelector('img');
    const title = currentElement.querySelector('.gallery-info h3')?.textContent || '';
    const description = currentElement.querySelector('.gallery-info p')?.textContent || '';
    
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-img').alt = img.alt;
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-description').textContent = description;
}

// Filters
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterItems(filter);
        });
    });
}

function filterItems(filter) {
    const items = document.querySelectorAll('[data-category]');
    
    items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            item.classList.add('fade-in-up');
        } else {
            item.style.display = 'none';
        }
    });
}

// FAQ Accordion
function initializeFAQ() {
    // FAQ functionality will be called by onclick in HTML
}

function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active');
}

// Mobile Menu
function initializeMobileMenu() {
    setTimeout(() => {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenu && navMenu) {
            mobileMenu.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }, 100);
}

// Form Validation and Handling
function initializeForms() {
    // Appointment Form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Set minimum date for appointment booking
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate form
    if (!validateAppointmentForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success modal
        showAppointmentSuccess(formData);
        
        // Reset form
        form.reset();
    }, 2000);
}

function validateAppointmentForm(formData) {
    let isValid = true;
    const requiredFields = ['fullName', 'phone', 'service', 'date', 'time'];
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    requiredFields.forEach(field => {
        const value = formData.get(field);
        const input = document.getElementById(field);
        const errorElement = input?.parentElement.querySelector('.error-message');
        
        if (!value || value.trim() === '') {
            if (errorElement) {
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
            }
            isValid = false;
        }
    });
    
    // Validate phone number
    const phone = formData.get('phone');
    if (phone && !/^[0-9]{10}$/.test(phone.replace(/[\s\-\+\(\)]/g, ''))) {
        const phoneError = document.getElementById('phone')?.parentElement.querySelector('.error-message');
        if (phoneError) {
            phoneError.textContent = 'Please enter a valid 10-digit phone number';
            phoneError.style.display = 'block';
        }
        isValid = false;
    }
    
    // Validate email if provided
    const email = formData.get('email');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const emailError = document.getElementById('email')?.parentElement.querySelector('.error-message');
        if (emailError) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
        }
        isValid = false;
    }
    
    return isValid;
}

function showAppointmentSuccess(formData) {
    const modal = document.getElementById('successModal');
    const bookingDetails = document.getElementById('bookingDetails');
    
    if (modal && bookingDetails) {
        // Populate booking details
        bookingDetails.innerHTML = `
            <div class="booking-summary">
                <p><strong>Name:</strong> ${formData.get('fullName')}</p>
                <p><strong>Phone:</strong> ${formData.get('phone')}</p>
                <p><strong>Service:</strong> ${formData.get('service')}</p>
                <p><strong>Date:</strong> ${formatDate(formData.get('date'))}</p>
                <p><strong>Time:</strong> ${formData.get('time')}</p>
                ${formData.get('occasion') ? `<p><strong>Occasion:</strong> ${formData.get('occasion')}</p>` : ''}
            </div>
        `;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate form
    if (!validateContactForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success modal
        showContactSuccess();
        
        // Reset form
        form.reset();
    }, 2000);
}

function validateContactForm(formData) {
    let isValid = true;
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    requiredFields.forEach(field => {
        const value = formData.get(field);
        const input = document.getElementById('contact' + field.charAt(0).toUpperCase() + field.slice(1));
        const errorElement = input?.parentElement.querySelector('.error-message');
        
        if (!value || value.trim() === '') {
            if (errorElement) {
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
            }
            isValid = false;
        }
    });
    
    // Validate email
    const email = formData.get('email');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const emailError = document.getElementById('contactEmail')?.parentElement.querySelector('.error-message');
        if (emailError) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
        }
        isValid = false;
    }
    
    return isValid;
}

function showContactSuccess() {
    const modal = document.getElementById('contactSuccessModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.subscribe-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate subscription
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2000);
    }, 1500);
}

// Modal Functions
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

function closeContactModal() {
    closeModal();
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scroll for navigation links
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.glass-card, .service-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// Countdown Timer for Offers
function initializeCountdown() {
    const timerElement = document.getElementById('offerTimer');
    if (!timerElement) return;
    
    // Set end date (30 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        if (distance < 0) {
            timerElement.innerHTML = 'Offer Expired';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
    }
    
    updateTimer();
    setInterval(updateTimer, 60000); // Update every minute
}

// Load More Functions
function loadMoreImages() {
    // Simulate loading more images
    const galleryGrid = document.querySelector('.gallery-grid');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (!galleryGrid || !loadMoreBtn) return;
    
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        // Reset button
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Images';
        
        // Show message
        alert('All images loaded! Visit our gallery page for more beautiful transformations.');
    }, 1500);
}

function loadMorePosts() {
    // Simulate loading more blog posts
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (!loadMoreBtn) return;
    
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Posts';
        alert('All posts loaded! Subscribe to our newsletter for latest updates.');
    }, 1500);
}

function loadMoreTestimonials() {
    // Simulate loading more testimonials
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (!loadMoreBtn) return;
    
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Reviews';
        alert('All reviews loaded! Thank you for reading our customer feedback.');
    }, 1500);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
    
    if (e.target.classList.contains('lightbox')) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
    }
    
    // Lightbox navigation with arrow keys
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// Window resize handler
window.addEventListener('resize', function() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenu && navMenu) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Console welcome message
console.log(`
%c✨ Welcome to Anushka Beauty Care! ✨
%cThank you for visiting our website.
Book your appointment today for the best beauty experience in Imamganj, Bihar!
`, 
'color: #E699C2; font-size: 16px; font-weight: bold;',
'color: #666; font-size: 12px;'
);
