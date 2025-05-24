// Main JavaScript file

document.addEventListener("DOMContentLoaded", function() {
  // Initialize typed.js
  initTyped();
  
  // Initialize particles.js
  initParticles();
  
  // Set up scrolling animations
  setupScrollAnimations();
  
  // Setup navigation
  setupNavigation();
  
  // Custom cursor
  setupCustomCursor();
  
  // Project filtering
  setupProjectFilters();
  
  // Back to top button
  setupBackToTop();
  
  // Initialize lazy loading for images
  setupLazyLoading();
  
  // Initialize mobile optimizations
  initMobileOptimizations();
});

// Initialize Typed.js
function initTyped() {
  if (typeof Typed !== 'undefined') {
    new Typed('.typed-text', {
      strings: [
        'Web Developer',
        'UI/UX Designer',
        'Machine Learning Enthusiast',
        'Problem Solver',
        'Tech Lover',
        'Architecture Enthusiast',
        'Open Source Contributor',
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      smartBackspace: true
    });
  }
}

// Initialize particles.js
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: window.innerWidth < 768 ? 50 : 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#4ff0f6"
        },
        shape: {
          type: "triangle",
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
          color: "#4ff0f6",
          opacity: 0.3,
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
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

// Set up scrolling animations
function setupScrollAnimations() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu-icon');
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileMenu.classList.remove('change');
        }
      }
    });
  });
  
  // Reveal elements on scroll with IntersectionObserver
  const fadeElements = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  
  fadeElements.forEach(element => {
    appearOnScroll.observe(element);
  });
  
  // Animate skill bars when they come into view
  const skillItems = document.querySelectorAll('.skill-item');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillLevel = entry.target.querySelector('.skill-level');
        const percent = entry.target.querySelector('.percent').textContent;
        
        skillLevel.style.width = "0";
        setTimeout(() => {
          skillLevel.style.width = percent;
        }, 100);
        
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillItems.forEach(item => {
    skillObserver.observe(item);
  });
}

// Set up navigation
function setupNavigation() {
  // Mobile menu toggle
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', function() {
      this.classList.toggle('change');
      navLinks.classList.toggle('active');
      
      // Add animation to each link with delay
      if (navLinks.classList.contains('active')) {
        navLinks.querySelectorAll('a').forEach((link, index) => {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
      } else {
        navLinks.querySelectorAll('a').forEach(link => {
          link.style.animation = '';
        });
      }
    });
  }
  
  // Header scroll effect
  const header = document.querySelector('header');
  let scrollPosition = 0;
  
  window.addEventListener('scroll', function() {
    const currentPosition = window.pageYOffset;
    
    if (currentPosition > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentPosition > 100) {
      if (currentPosition > scrollPosition) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    scrollPosition = currentPosition;
  });
  
  // Update active nav link on scroll
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= (sectionTop - sectionHeight/3)) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
}

// Custom cursor
function setupCustomCursor() {
  const cursor = document.getElementById('cursor');
  const cursorBlur = document.getElementById('cursor-blur');
  
  // Only enable custom cursor on desktop devices
  if (window.innerWidth > 991 && cursor && cursorBlur && !isReducedMotionPreferred()) {
    document.body.style.cursor = 'none';
    
    document.addEventListener('mousemove', function(e) {
      // Use requestAnimationFrame for smoother cursor movement
      requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Delayed blur effect for smoother trailing
        setTimeout(() => {
          cursorBlur.style.left = e.clientX + 'px';
          cursorBlur.style.top = e.clientY + 'px';
        }, 50);
      });
    });
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .certificate-card, input, textarea, .social-link, .filter-btn');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.border = '2px solid var(--neon-blue)';
        cursor.style.mixBlendMode = 'normal';
        
        // Customize cursor blur based on element type
        if (el.classList.contains('project-card') || el.classList.contains('certificate-card')) {
          cursorBlur.style.width = '450px';
          cursorBlur.style.height = '450px';
          cursorBlur.style.backgroundColor = 'rgba(79, 240, 246, 0.07)';
        } else if (el.classList.contains('social-link')) {
          cursorBlur.style.width = '300px';
          cursorBlur.style.height = '300px';
          cursorBlur.style.backgroundColor = 'rgba(79, 240, 246, 0.1)';
        } else if (el.classList.contains('btn') || el.tagName === 'BUTTON') {
          cursorBlur.style.width = '300px';
          cursorBlur.style.height = '300px';
          cursorBlur.style.backgroundColor = 'rgba(79, 240, 246, 0.1)';
        }
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.backgroundColor = 'var(--neon-blue)';
        cursor.style.border = 'none';
        cursor.style.mixBlendMode = 'screen';
        
        cursorBlur.style.width = '400px';
        cursorBlur.style.height = '400px';
        cursorBlur.style.backgroundColor = 'rgba(79, 240, 246, 0.03)';
      });
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorBlur.style.opacity = '0';
    });
    
    // Show cursor when entering the window
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorBlur.style.opacity = '1';
    });
    
    // Scale cursor on click
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  } else if (cursor && cursorBlur) {
    // Hide custom cursor on mobile or when reduced motion is preferred
    cursor.style.display = 'none';
    cursorBlur.style.display = 'none';
  }
}

// Project filtering
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects with animation
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.classList.contains(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

// Back to top button
function setupBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 700) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    // Smooth scroll to top
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Setup lazy loading for images
function setupLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Initialize mobile optimizations
function initMobileOptimizations() {
  if (window.innerWidth < 768) {
    // Reduce particles on mobile
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
      pJSDom[0].pJS.particles.number.value = 30;
      pJSDom[0].pJS.particles.line_linked.distance = 100;
      pJSDom[0].pJS.fn.particlesRefresh();
    }
    
    // Add touch capability for project cards
    document.querySelectorAll('.project-card, .certificate-card').forEach(card => {
      card.addEventListener('touchstart', function() {
        this.classList.add('touch-focus');
      }, { passive: true });
      
      card.addEventListener('touchend', function() {
        setTimeout(() => {
          this.classList.remove('touch-focus');
        }, 300);
      }, { passive: true });
    });
  }
}

// Check if reduced motion is preferred
function isReducedMotionPreferred() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Add ripple effect to buttons
function addRippleEffect() {
  const buttons = document.querySelectorAll('.btn, .filter-btn, .social-link, .certificate-link');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (isReducedMotionPreferred()) return;
      
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Performance optimization for scroll events
function debounce(func, wait = 15, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Initialize all performance optimizations
document.addEventListener('DOMContentLoaded', function() {
  addRippleEffect();
  
  // Optimize scroll events
  const optimizedScroll = debounce(function() {
    // Your scroll handlers
  });
  
  window.addEventListener('scroll', optimizedScroll);
  
  // Optimize resize events
  const optimizedResize = debounce(function() {
    if (window.innerWidth < 768) {
      initMobileOptimizations();
    }
  });
  
  window.addEventListener('resize', optimizedResize);
});