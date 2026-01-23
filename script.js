// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Section navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const sectionName = this.getAttribute('data-section');
            
            // Update active button
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(sectionName).classList.add('active');
            
            // Close mobile menu
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';

            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Prevent scroll when mobile menu is open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Generate fire particles
    const particlesContainer = document.getElementById('particles-container');
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = (Math.random() * 2) + 's';
        particlesContainer.appendChild(particle);
    }

    // Generate flowers
    const flowersContainer = document.getElementById('flowers-container');
    for (let i = 0; i < 20; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 25 + 15;
        flower.style.width = size + 'px';
        flower.style.height = size + 'px';
        flower.style.animationDuration = (Math.random() * 5 + 4) + 's';
        flower.style.animationDelay = (Math.random() * 3) + 's';
        
        // Create SVG flower
        flower.innerHTML = `
            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
                <g>
                    <ellipse cx="50" cy="30" rx="15" ry="25" fill="#ff6b6b" opacity="0.8" transform="rotate(0 50 50)"/>
                    <ellipse cx="50" cy="30" rx="15" ry="25" fill="#ff6b6b" opacity="0.8" transform="rotate(72 50 50)"/>
                    <ellipse cx="50" cy="30" rx="15" ry="25" fill="#ff6b6b" opacity="0.8" transform="rotate(144 50 50)"/>
                    <ellipse cx="50" cy="30" rx="15" ry="25" fill="#ff6b6b" opacity="0.8" transform="rotate(216 50 50)"/>
                    <ellipse cx="50" cy="30" rx="15" ry="25" fill="#ff6b6b" opacity="0.8" transform="rotate(288 50 50)"/>
                    <circle cx="50" cy="50" r="8" fill="#ffaa00"/>
                </g>
            </svg>
        `;
        
        flowersContainer.appendChild(flower);
    }

    // Mouse glow effect
    const mouseGlow = document.getElementById('mouse-glow');
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateMouseGlow() {
        mouseGlow.style.left = mouseX + 'px';
        mouseGlow.style.top = mouseY + 'px';
        requestAnimationFrame(updateMouseGlow);
    }
    updateMouseGlow();

    // Fire trail canvas effect
    const canvas = document.getElementById('fireCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireParticles = [];
    const maxParticles = 100;

    class FireParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = Math.random() * -3 - 1;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            this.color = Math.random() > 0.5 ? '#ff6b35' : '#f7931e';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.size *= 0.98;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    let lastMouseX = 0;
    let lastMouseY = 0;
    let isMouseMoving = false;

    document.addEventListener('mousemove', function(e) {
        const distance = Math.sqrt(
            Math.pow(e.clientX - lastMouseX, 2) + 
            Math.pow(e.clientY - lastMouseY, 2)
        );

        if (distance > 5) {
            isMouseMoving = true;
            
            for (let i = 0; i < 3; i++) {
                if (fireParticles.length < maxParticles) {
                    fireParticles.push(new FireParticle(e.clientX, e.clientY));
                }
            }
            
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        }
    });

    function animateFireCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = fireParticles.length - 1; i >= 0; i--) {
            fireParticles[i].update();
            fireParticles[i].draw();

            if (fireParticles[i].life <= 0 || fireParticles[i].size < 0.5) {
                fireParticles.splice(i, 1);
            }
        }

        requestAnimationFrame(animateFireCanvas);
    }
    animateFireCanvas();

    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create fire burst effect
            const rect = e.target.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    fireParticles.push(new FireParticle(centerX, centerY));
                }, i * 10);
            }

            // Show success message
            alert('Message sent! 🔥 Thank you for reaching out!');
            contactForm.reset();
        });
    }

    // Parallax effect for images
    const heroImages = document.querySelectorAll('.hero-image img, .about-image-main img, .about-image-small img, .education-sidebar img, .experience-image img, .contact-image img');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        heroImages.forEach((img, index) => {
            const speed = 0.05 + (index % 3) * 0.02;
            const yPos = -(scrolled * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    if (fireParticles.length < maxParticles) {
                        fireParticles.push(new FireParticle(
                            centerX + (Math.random() - 0.5) * rect.width,
                            centerY + (Math.random() - 0.5) * rect.height
                        ));
                    }
                }, i * 20);
            }
        });
    });

    // Add fire effect to navigation buttons
    navBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    if (fireParticles.length < maxParticles) {
                        fireParticles.push(new FireParticle(centerX, centerY));
                    }
                }, i * 15);
            }
        });
    });

    // Add fire particles to experience image
    const experienceImage = document.querySelector('.experience-image');
    if (experienceImage) {
        // Create floating fire particles around image
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'fire-particle';
            
            const angle = (360 / 8) * i;
            const radius = 55; // distance from image edge
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            particle.style.left = `calc(50% + ${x}%)`;
            particle.style.top = `calc(50% + ${y}%)`;
            particle.style.animationDelay = `${i * 0.2}s`;
            
            experienceImage.appendChild(particle);
        }

        // Add more particles on hover
        experienceImage.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const randomX = rect.left + Math.random() * rect.width;
                    const randomY = rect.top + Math.random() * rect.height;
                    
                    if (fireParticles.length < maxParticles) {
                        fireParticles.push(new FireParticle(randomX, randomY));
                    }
                }, i * 30);
            }
        });
    }

    // Add fire edge effect to all images
    const allImages = document.querySelectorAll('.image-frame, .about-image-main, .education-sidebar img, .contact-image, .project-image');
    allImages.forEach(imageContainer => {
        imageContainer.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            const edges = [
                { x: rect.left, y: rect.top + rect.height / 2 }, // left
                { x: rect.right, y: rect.top + rect.height / 2 }, // right
                { x: rect.left + rect.width / 2, y: rect.top }, // top
                { x: rect.left + rect.width / 2, y: rect.bottom } // bottom
            ];

            edges.forEach((edge, index) => {
                setTimeout(() => {
                    for (let i = 0; i < 3; i++) {
                        if (fireParticles.length < maxParticles) {
                            fireParticles.push(new FireParticle(
                                edge.x + (Math.random() - 0.5) * 40,
                                edge.y + (Math.random() - 0.5) * 40
                            ));
                        }
                    }
                }, index * 50);
            });
        });
    });

    // Animate stats on scroll
    const statCards = document.querySelectorAll('.stat-card');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'none';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 10);
            }
        });
    }, observerOptions);

    statCards.forEach(card => observer.observe(card));

    // Add floating animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = (index * 0.1) + 's';
    });

    // Typing effect for hero subtitle (optional enhancement)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let charIndex = 0;

        function typeText() {
            if (charIndex < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            }
        }

        setTimeout(typeText, 500);
    }

    // Add glow effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('.content-section.active');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });

    console.log('🔥 Hu Tao Portfolio Loaded! May the flames guide your way! 🔥');
});