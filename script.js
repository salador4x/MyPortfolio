// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add glitch effect to logo when menu is toggled
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.add('glitch-effect');
        setTimeout(() => {
            logo.classList.remove('glitch-effect');
        }, 500);
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links with enhanced behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Add pulse effect to clicked link
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 500);
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add a highlight effect to the target section
            target.classList.add('section-highlight');
            setTimeout(() => {
                target.classList.remove('section-highlight');
            }, 1000);
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll with enhanced effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        // Add subtle scale effect
        navbar.style.transform = 'scale(0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
        navbar.style.transform = 'scale(1)';
    }
});

// Active navigation link highlighting with enhanced visual feedback
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            // Add subtle animation to newly active link
            link.classList.add('link-activated');
            setTimeout(() => {
                link.classList.remove('link-activated');
            }, 500);
        }
    });
});

// Contact form handling with enhanced feedback
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state to form
        contactForm.classList.add('loading');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) submitBtn.textContent = 'Sending...';
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simulate sending (would be an actual API call in production)
        setTimeout(() => {
            // Create mailto link
            const mailtoLink = `mailto:erkuyesamuel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;        
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Thank you! Your email client should open now.', 'success');
            
            // Reset form and button
            this.reset();
            contactForm.classList.remove('loading');
            if (submitBtn) submitBtn.textContent = originalBtnText;
        }, 800);
    });
    
    // Add interactive form field effects
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        // Add focus effects
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('field-active');
        });
        
        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentElement.classList.remove('field-active');
            }
        });
        
        // If field already has value on page load
        if (field.value) {
            field.parentElement.classList.add('field-active');
        }
    });
}

// Notification system with tech-forward styling
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add tech-forward styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        border-left: 4px solid ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#2563eb'};
        backdrop-filter: blur(5px);
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in with glitch effect
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.classList.add('glitch-effect');
        setTimeout(() => {
            notification.classList.remove('glitch-effect');
        }, 300);
    }, 100);
    
    // Close button functionality with glitch effect
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('glitch-effect');
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 200);
    });
    
    // Auto remove after 5 seconds with glitch effect
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('glitch-effect');
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 200);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .about-stats .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Skills hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Social links functionality
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-envelope')) {
                link.href = 'mailto:erkuyesamuel@gmail.com';
            } else if (icon.classList.contains('fa-phone')) {
                link.href = 'tel:+251989827177';
            } else if (icon.classList.contains('fa-linkedin')) {
                link.href = '#'; // Add LinkedIn URL when available
                link.target = '_blank';
            }
        }
    });
});

// Add tech-forward loading animation
window.addEventListener('load', () => {
    // Add tech-forward loading effect
    document.body.classList.add('loading');
    
    setTimeout(() => {
        document.body.classList.add('loaded');
        document.body.classList.remove('loading');
        
        // Add entrance animation to sections
        document.querySelectorAll('section').forEach((section, index) => {
            section.style.animationDelay = `${index * 0.1}s`;
            section.classList.add('section-entrance');
        });
    }, 500);
});

// Add CSS for enhanced tech-forward animations
const loadingStyles = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loading {
        opacity: 0;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .nav-link.active {
        color: #2563eb !important;
        position: relative;
    }
    
    .nav-link.active::after {
        width: 100% !important;
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        height: 2px;
        background: #2563eb;
        animation: glowLine 1.5s infinite alternate;
    }
    
    @keyframes glowLine {
        from { box-shadow: 0 0 2px #2563eb; }
        to { box-shadow: 0 0 8px #2563eb; }
    }
    
    .section-entrance {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.8s ease-in-out forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);
