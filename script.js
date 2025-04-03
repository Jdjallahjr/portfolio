document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('year').textContent = new Date().getFullYear();

    const nav = document.getElementById('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Typing animation for home section
    const typingText = document.querySelector('.typing-text');
    const words = ['a Frontend Developer', 'Backend Developer', 'Fullstack Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }

    setTimeout(type, 1500);

    // Animate skill bars when skills section is in view
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsSection = document.getElementById('skills');

    function animateSkills() {
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const sectionBottom = skillsSection.getBoundingClientRect().bottom;
        
        if (sectionTop < window.innerHeight && sectionBottom > 0) {
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                    const progress = item.querySelector('.skill-progress');
                    const percent = progress.getAttribute('data-percent');
                    progress.style.width = percent + '%';
                }, index * 200);
            });
            // Remove event listener after animation
            window.removeEventListener('scroll', animateSkills);
        }
    }

    // Initialize skill bars if already in view
    animateSkills();
    window.addEventListener('scroll', animateSkills);

    // Animate portfolio items when portfolio section is in view
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioSection = document.getElementById('portfolio');

    function animatePortfolio() {
        const sectionTop = portfolioSection.getBoundingClientRect().top;
        const sectionBottom = portfolioSection.getBoundingClientRect().bottom;
        
        if (sectionTop < window.innerHeight && sectionBottom > 0) {
            portfolioItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            });
            // Remove event listener after animation
            window.removeEventListener('scroll', animatePortfolio);
        }
    }

    // Initialize portfolio items if already in view
    animatePortfolio();
    window.addEventListener('scroll', animatePortfolio);

    // Form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Formspree submission
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                throw new Error('Failed to send. Please email me directly at jdjallahjr@gmail.com');
            }
        })
        .catch(error => {
            alert(error.message);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});