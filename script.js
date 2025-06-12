document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle with Advanced Effects
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Apply theme
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    document.querySelector('.particles').style.backgroundColor = 'rgba(17, 24, 39, 0.8)';
  }
  
  themeToggle.addEventListener('click', function() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Change particle color based on theme
    document.querySelector('.particles').style.backgroundColor = isDark 
      ? 'rgba(17, 24, 39, 0.8)' 
      : 'rgba(255, 255, 255, 0.8)';
    
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    this.appendChild(ripple);
    
    const x = event.clientX - event.target.getBoundingClientRect().left;
    const y = event.clientY - event.target.getBoundingClientRect().top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });

  // Floating Navigation
  const menuToggle = document.getElementById('menuToggle');
  const floatingNav = document.querySelector('.floating-nav');
  const closeNav = document.querySelector('.close-nav');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    floatingNav.classList.toggle('hidden');
    document.body.style.overflow = floatingNav.classList.contains('hidden') ? '' : 'hidden';
  });
  
  closeNav.addEventListener('click', function() {
    menuToggle.classList.remove('active');
    floatingNav.classList.add('hidden');
    document.body.style.overflow = '';
  });

  // Close nav when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      floatingNav.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });



  // GSAP Animations
  gsap.registerEffect({
    name: "fadeIn",
    effect: (targets, config) => {
      return gsap.from(targets, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        ...config
      });
    },
    defaults: {duration: 1},
    extendTimeline: true
  });

  // Animate elements on scroll
  const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      
      if (sectionTop < window.innerHeight * 0.75 && sectionBottom > 0) {
        gsap.effects.fadeIn(section.querySelectorAll('.animate-on-scroll'));
      }
    });
  };

  // Initial check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('span').textContent;
    
    // Simulate form submission
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';
    
    setTimeout(() => {
      submitBtn.querySelector('span').textContent = 'Sent!';
      submitBtn.querySelector('i').className = 'fas fa-check';
      
      // Reset form
      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.querySelector('i').className = 'fas fa-paper-plane';
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
          <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <p>Message sent successfully!</p>
          </div>
        `;
        contactForm.appendChild(successMsg);
        
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }, 1500);
    }, 2000);
  });

  // Dynamic Skill Tags Animation
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      gsap.to(tag, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    tag.addEventListener('mouseleave', () => {
      gsap.to(tag, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
});