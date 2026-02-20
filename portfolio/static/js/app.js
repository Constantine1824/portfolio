document.addEventListener('DOMContentLoaded', function () {
    // Typing animation for hero section
    const content = ['Backend Developer', 'AI/ML', 'Data Analyst'];
    const element = document.getElementById('intro-content');
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function simulateType() {
        const currentText = content[index];

        if (!isDeleting && charIndex < currentText.length) {
            // Typing mode
            element.textContent += currentText.charAt(charIndex);
            charIndex++;
            typeSpeed = Math.random() * 150 + 50; // Random typing speed
        } else if (isDeleting && charIndex > 0) {
            // Deleting mode
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deletion
        } else {
            // Switch between typing and deleting
            isDeleting = !isDeleting;

            if (!isDeleting) {
                // Move to next text after a pause
                index = (index + 1) % content.length;
                typeSpeed = 2000; // Pause before typing next text
            } else {
                typeSpeed = 1000; // Pause before deleting
            }
        }

        setTimeout(simulateType, typeSpeed);
    }

    // Start the typing animation after a short delay
    // Start the typing animation after a short delay
    setTimeout(simulateType, 1000);

    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const mobileLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn && navLinksContainer) {

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = navLinksContainer.classList.contains('open');
            toggleMenu(!isOpen);
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (navLinksContainer.classList.contains('open') &&
                !navLinksContainer.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                toggleMenu(false);
            }
        });

        function toggleMenu(show) {
            const icon = mobileMenuBtn.querySelector('i');
            if (show) {
                navLinksContainer.classList.add('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            } else {
                navLinksContainer.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // Restore scrolling
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }

    // Enhanced contact form functionality
    const contactForm = document.getElementById('form');
    const submitButton = document.getElementById('mail-btn');
    const successMessage = document.getElementById('success-message');
    // const formContainer = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const isValid = validateForm();
            if (!isValid) {
                return;
            }

            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            submitButton.disabled = true;

            const formData = {
                name: document.getElementById('name').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            try {
                const response = await sendContactRequest(formData);

                if (response.status === 200) {
                    contactForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    contactForm.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error sending your message. Please try again.');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Resume button functionality - fetch resume link from backend
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function (e) {
            const resumeUrl = this.getAttribute('data-resume-url');

            if (resumeUrl) {
                window.open(resumeUrl, '_blank');
            } else {
                e.preventDefault();
                alert('Resume link not available at the moment. Please check back later or contact me directly.');
            }
        });
    }

    // Form validation function
    function validateForm() {
        let isValid = true;
        const fields = ['name', 'subject', 'email', 'message'];

        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const value = field.value.trim();

            if (!value) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });

        return isValid;
    }

    // Function to send contact request
    async function sendContactRequest(formData) {
        const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(formData)
        };

        return fetch('/contact', requestOptions);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation items based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add focus management for accessibility
    document.querySelectorAll('a, button, input, textarea, select, [tabindex]').forEach(element => {
        element.addEventListener('focus', function () {
            this.classList.add('focus-visible');
        });

        element.addEventListener('blur', function () {
            this.classList.remove('focus-visible');
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger loading
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Dark mode toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme in localStorage or respect system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
});