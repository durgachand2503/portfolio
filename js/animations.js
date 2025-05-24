// Animations JavaScript file

document.addEventListener("DOMContentLoaded", function() {
  // Initialize animations when DOM is loaded
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 300);
  
  // Add animation classes to sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
  });
  
  // Initialize text animations
  initTextAnimations();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize hover animations
  initHoverAnimations();
  
  // Initialize section-specific animations
  initSectionAnimations();
  
  // Initialize 3D tilt effect for cards
  initTiltEffect();
  
  // Initialize magnetic effect for buttons
  initMagneticEffect();
});

// Initialize text animations
function initTextAnimations() {
  // Reveal text animation for section headings
  document.querySelectorAll('.section-header h2').forEach(heading => {
    if (!heading.getAttribute('data-animated')) {
      const text = heading.textContent;
      const mainText = text.split(' ')[0];
      const highlightText = text.split(' ').slice(1).join(' ');
      
      heading.innerHTML = `${mainText} <span>${highlightText}</span>`;
      heading.setAttribute('data-animated', 'true');
    }
  });
  
  // Add reveal-text effect to selected elements
  document.querySelectorAll('.reveal-text').forEach(element => {
    if (!element.getAttribute('data-text')) {
      element.setAttribute('data-text', element.textContent);
    }
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  // Animate elements when scrolled into view
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };
  
  const scrollObserver = new IntersectionObserver(animateOnScroll, {
    root: null,
    threshold: 0.1,
    rootMargin: "-100px"
  });
  
  document.querySelectorAll('.fade-in').forEach(element => {
    scrollObserver.observe(element);
  });
  
  // Staggered animations for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Staggered animations for skill bars
  const skillBars = document.querySelectorAll('.skill-item');
  skillBars.forEach((bar, index) => {
    bar.style.transitionDelay = `${index * 0.05}s`;
  });
  
  // Staggered animations for certificate cards
  const certificateCards = document.querySelectorAll('.certificate-card');
  certificateCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Staggered animations for contact cards
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Scroll-triggered animations for sections
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const sectionId = section.id;
        
        // Add specific animations based on section
        switch(sectionId) {
          case 'home':
            animateHomeSection(section);
            break;
          case 'about':
            animateAboutSection(section);
            break;
          case 'skills':
            animateSkillsSection(section);
            break;
          case 'projects':
            animateProjectsSection(section);
            break;
          case 'certificates':
            animateCertificatesSection(section);
            break;
          case 'contact':
            animateContactSection(section);
            break;
        }
        
        sectionObserver.unobserve(section);
      }
    });
  }, { threshold: 0.2 });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

// Initialize hover animations
function initHoverAnimations() {
  // Navigation hover animations
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      if (window.innerWidth > 991) {
        link.style.transform = 'translateY(-3px)';
        setTimeout(() => {
          link.style.transform = 'translateY(0)';
        }, 300);
      }
    });
  });
  
  // Project card hover animations
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelectorAll('.project-content h3, .project-content p').forEach(element => {
        element.style.transform = 'translateY(-3px)';
        element.style.transition = 'transform 0.3s ease';
      });
    });
    
    card.addEventListener('mouseleave', () => {
      card.querySelectorAll('.project-content h3, .project-content p').forEach(element => {
        element.style.transform = 'translateY(0)';
      });
    });
  });
  
  // Certificate card hover animations
  const certificateCards = document.querySelectorAll('.certificate-card');
  certificateCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelectorAll('.certificate-content h4, .certificate-content p').forEach(element => {
        element.style.transform = 'translateY(-3px)';
        element.style.transition = 'transform 0.3s ease';
      });
    });
    
    card.addEventListener('mouseleave', () => {
      card.querySelectorAll('.certificate-content h4, .certificate-content p').forEach(element => {
        element.style.transform = 'translateY(0)';
      });
    });
  });
  
  // Button hover animations
  const buttons = document.querySelectorAll('.btn, .certificate-link, .project-link');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      if (!isReducedMotionPreferred()) {
        button.style.transform = 'translateY(-3px)';
      }
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });
  
  // Social link hover animations
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      if (!isReducedMotionPreferred()) {
        const icon = link.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(5deg)';
          icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
      }
    });
    
    link.addEventListener('mouseleave', () => {
      const icon = link.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
}

// Section-specific animations
function animateHomeSection(section) {
  const glitchWrapper = section.querySelector('.glitch-wrapper');
  const subtitle = section.querySelector('.subtitle');
  const description = section.querySelector('.description');
  const scrollDown = section.querySelector('.scroll-down');
  
  if (glitchWrapper) glitchWrapper.classList.add('focus-in');
  if (subtitle) {
    setTimeout(() => {
      subtitle.style.opacity = '1';
      subtitle.style.transform = 'translateY(0)';
    }, 300);
  }
  if (description) {
    setTimeout(() => {
      description.style.opacity = '1';
      description.style.transform = 'translateY(0)';
    }, 500);
  }
  if (scrollDown) {
    setTimeout(() => {
      scrollDown.style.opacity = '1';
      scrollDown.style.transform = 'translateY(0)';
    }, 800);
  }
}

function animateAboutSection(section) {
  const aboutImage = section.querySelector('.about-image');
  const aboutText = section.querySelector('.about-text');
  const aboutDetails = section.querySelector('.about-details');
  
  if (aboutImage) {
    aboutImage.style.transform = 'translateX(0)';
    aboutImage.style.opacity = '1';
  }
  
  if (aboutText) {
    setTimeout(() => {
      aboutText.style.transform = 'translateX(0)';
      aboutText.style.opacity = '1';
    }, 300);
  }
  
  if (aboutDetails) {
    setTimeout(() => {
      aboutDetails.classList.add('stagger-animation', 'animate');
    }, 600);
  }
}

function animateSkillsSection(section) {
  const skillCategories = section.querySelectorAll('.skill-category');
  
  skillCategories.forEach((category, index) => {
    setTimeout(() => {
      category.style.transform = 'translateY(0)';
      category.style.opacity = '1';
    }, index * 200);
  });
}

function animateProjectsSection(section) {
  const projectFilter = section.querySelector('.projects-filter');
  const projectCards = section.querySelectorAll('.project-card');
  
  if (projectFilter) {
    projectFilter.style.transform = 'translateY(0)';
    projectFilter.style.opacity = '1';
  }
  
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    }, 300 + (index * 100));
  });
}

function animateCertificatesSection(section) {
  const certificateCards = section.querySelectorAll('.certificate-card');
  
  certificateCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    }, 300 + (index * 100));
  });
}

function animateContactSection(section) {
  const contactInfo = section.querySelector('.contact-info');
  const contactSocial = section.querySelector('.contact-social');
  
  if (contactInfo) {
    contactInfo.style.transform = 'translateY(0)';
    contactInfo.style.opacity = '1';
  }
  
  if (contactSocial) {
    setTimeout(() => {
      contactSocial.style.transform = 'translateY(0)';
      contactSocial.style.opacity = '1';
    }, 400);
  }
}

// Initialize all section animations
function initSectionAnimations() {
  // Initial styles for staggered animations
  document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
  });
  
  document.querySelectorAll('.about-image, .about-text').forEach((element, index) => {
    const direction = index === 0 ? 'translateX(-30px)' : 'translateX(30px)';
    element.style.opacity = '0';
    element.style.transform = direction;
    element.style.transition = `opacity 0.8s ease, transform 0.8s ease`;
  });
  
  document.querySelectorAll('.projects-filter').forEach(filter => {
    filter.style.opacity = '0';
    filter.style.transform = 'translateY(20px)';
    filter.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  document.querySelectorAll('.contact-info, .contact-social').forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.8s ease, transform 0.8s ease ${index * 0.2}s`;
  });
  
  // Add floating animation to selected elements
  document.querySelectorAll('.scroll-down, .social-icon').forEach(element => {
    element.classList.add('float');
  });
  
  // Add subtle hover effects to section headers
  document.querySelectorAll('.section-header').forEach(header => {
    header.addEventListener('mouseenter', () => {
      if (!isReducedMotionPreferred()) {
        const h2 = header.querySelector('h2');
        if (h2) {
          h2.style.transform = 'translateY(-5px)';
          h2.style.transition = 'transform 0.3s ease';
        }
        
        const line = header.querySelector('.section-line');
        if (line) {
          line.style.width = '100px';
          line.style.transition = 'width 0.3s ease';
        }
      }
    });
    
    header.addEventListener('mouseleave', () => {
      const h2 = header.querySelector('h2');
      if (h2) {
        h2.style.transform = 'translateY(0)';
      }
      
      const line = header.querySelector('.section-line');
      if (line) {
        line.style.width = '80px';
      }
    });
  });
}

// Initialize 3D tilt effect for cards
function initTiltEffect() {
  if (isReducedMotionPreferred() || window.innerWidth < 992) return;
  
  const cards = document.querySelectorAll('.project-card, .certificate-card');
  
  cards.forEach(card => {
    card.classList.add('tilt-effect');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

// Initialize magnetic effect for buttons
function initMagneticEffect() {
  if (isReducedMotionPreferred() || window.innerWidth < 992) return;
  
  const buttons = document.querySelectorAll('.btn, .social-link');
  
  buttons.forEach(button => {
    button.classList.add('magnetic');
    
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / 10;
      const deltaY = (y - centerY) / 10;
      
      button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

// Check if user prefers reduced motion
function isReducedMotionPreferred() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Glitch effect on scroll
window.addEventListener('scroll', () => {
  if (isReducedMotionPreferred()) return;
  
  const glitchElement = document.querySelector('.glitch');
  if (glitchElement) {
    const scrollPosition = window.scrollY;
    const maxGlitch = 5;
    const glitchIntensity = Math.min(scrollPosition / 700, 1) * maxGlitch;
    
    glitchElement.style.setProperty('--glitch-offset', `${glitchIntensity}px`);
  }
});

// Parallax effect for background elements
window.addEventListener('mousemove', (e) => {
  if (isReducedMotionPreferred() || window.innerWidth < 992) return;
  
  const xPos = e.clientX / window.innerWidth - 0.5;
  const yPos = e.clientY / window.innerHeight - 0.5;
  
  // Apply parallax effect to section headers
  document.querySelectorAll('.section-header').forEach(el => {
    el.style.transform = `translate(${xPos * 15}px, ${yPos * 15}px)`;
    el.style.transition = 'transform 0.1s ease-out';
  });
  
  // Apply subtle parallax to other elements
  document.querySelectorAll('.image-frame, .project-img, .certificate-img').forEach(el => {
    el.style.transform = `translate(${xPos * 10}px, ${yPos * 10}px)`;
    el.style.transition = 'transform 0.1s ease-out';
  });
});

// Random neon color shifter for accents
function randomNeonColor() {
  const neonColors = [
    'var(--neon-blue)',
    'var(--neon-red)',
    'var(--neon-yellow)'
  ];
  
  return neonColors[Math.floor(Math.random() * neonColors.length)];
}

// Create shooting stars in the background
function createShootingStar() {
  if (isReducedMotionPreferred() || window.innerWidth < 768) return;
  
  const shootingStar = document.createElement('div');
  shootingStar.classList.add('shooting-star');
  shootingStar.style.cssText = `
    position: fixed;
    width: 150px;
    height: 1px;
    background: linear-gradient(90deg, rgba(79, 240, 246, 0), rgba(79, 240, 246, 1));
    top: ${Math.random() * window.innerHeight / 3}px;
    left: ${Math.random() * window.innerWidth}px;
    transform: rotate(${Math.random() * 60 - 30}deg);
    z-index: -1;
    animation: shootingStar 1s linear forwards;
  `;
  
  document.body.appendChild(shootingStar);
  
  // Remove after animation completes
  setTimeout(() => {
    document.body.removeChild(shootingStar);
  }, 1000);
}

// Create shooting star animation
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes shootingStar {
      0% {
        transform: translateX(0) translateY(0) rotate(${Math.random() * 60 - 30}deg);
        opacity: 1;
      }
      100% {
        transform: translateX(${window.innerWidth}px) translateY(${window.innerHeight / 2}px) rotate(${Math.random() * 60 - 30}deg);
        opacity: 0;
      }
    }
  </style>
`);

// Create shooting stars periodically
if (!isReducedMotionPreferred()) {
  setInterval(createShootingStar, 3000);
}