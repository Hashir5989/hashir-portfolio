/**
 * ABDULLA HASHIR ALI - PORTFOLIO INTERACTIVITY & LOGIC
 * Professional Senior Full Stack & PHP/Laravel Developer
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollProgress();
    initNavbarScroll();
    initMobileNav();
    initActiveNavHighlight();
    initBackToTop();
    initContactForm();
    initModalEvents();
});

/* --------------------------------------------------------------------------
   1. THEME MANAGEMENT (PHONE & SYSTEM PREFERENCE SUPPORT)
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const systemThemeQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    
    // Set initial theme based on saved preference or phone/system setting
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('portfolio_theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // Listen for phone/OS system dark or light mode setting changes
    if (systemThemeQuery) {
        const handleSystemThemeChange = (e) => {
            if (!localStorage.getItem('portfolio_theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        };
        if (systemThemeQuery.addEventListener) {
            systemThemeQuery.addEventListener('change', handleSystemThemeChange);
        } else if (systemThemeQuery.addListener) {
            systemThemeQuery.addListener(handleSystemThemeChange);
        }
    }
}

function getPreferredTheme() {
    const savedTheme = localStorage.getItem('portfolio_theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
}

/* --------------------------------------------------------------------------
   2. SCROLL PROGRESS INDICATOR
   -------------------------------------------------------------------------- */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. STICKY NAVBAR SCROLL CLASS
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-item-link');

    if (mobileToggleBtn && navMenu) {
        mobileToggleBtn.addEventListener('click', () => {
            const isExpanded = mobileToggleBtn.getAttribute('aria-expanded') === 'true';
            mobileToggleBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            const iconBars = mobileToggleBtn.querySelector('.icon-bars');
            const iconClose = mobileToggleBtn.querySelector('.icon-close');
            if (iconBars && iconClose) {
                iconBars.style.display = isExpanded ? 'inline-block' : 'none';
                iconClose.style.display = isExpanded ? 'none' : 'inline-block';
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggleBtn.setAttribute('aria-expanded', 'false');
                    const iconBars = mobileToggleBtn.querySelector('.icon-bars');
                    const iconClose = mobileToggleBtn.querySelector('.icon-close');
                    if (iconBars && iconClose) {
                        iconBars.style.display = 'inline-block';
                        iconClose.style.display = 'none';
                    }
                }
            });
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileToggleBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggleBtn.setAttribute('aria-expanded', 'false');
                const iconBars = mobileToggleBtn.querySelector('.icon-bars');
                const iconClose = mobileToggleBtn.querySelector('.icon-close');
                if (iconBars && iconClose) {
                    iconBars.style.display = 'inline-block';
                    iconClose.style.display = 'none';
                }
            }
        });
    }
}

/* --------------------------------------------------------------------------
   5. ACTIVE NAVIGATION LINK HIGHLIGHTING
   -------------------------------------------------------------------------- */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   6. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* --------------------------------------------------------------------------
   7. COPY EMAIL TO CLIPBOARD
   -------------------------------------------------------------------------- */
function copyEmailToClipboard() {
    const email = 'hashirbinali@gmail.com';
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email)
            .then(() => showToast('Email copied to clipboard: hashirbinali@gmail.com', 'success'))
            .catch(() => fallbackCopyTextToClipboard(email));
    } else {
        fallbackCopyTextToClipboard(email);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast('Email copied to clipboard: hashirbinali@gmail.com', 'success');
    } catch (err) {
        showToast('Failed to copy email automatically. Address: hashirbinali@gmail.com', 'info');
    }
    document.body.removeChild(textArea);
}

/* --------------------------------------------------------------------------
   8. PROJECT DATA & MODALS
   -------------------------------------------------------------------------- */
const projectsData = [
    {
        id: 0,
        title: "Biometric Attendance Integration",
        category: "PHP / Laravel / SOAP API",
        overview: "Developed and integrated a biometric attendance system using PHP and SOAP APIs. Implemented custom punch-in/punch-out matching logic for accurate attendance processing and integrated biometric attendance data with existing PHP/Laravel enterprise systems.",
        role: "Senior Backend Engineer / Integration Developer",
        contributions: [
            "Architected SOAP API integrations connecting physical biometric devices with backend database systems.",
            "Designed and implemented complex punch-in/punch-out matching algorithm for accurate employee work hour processing.",
            "Handled real-time data sync and error logging for high-volume daily attendance records.",
            "Integrated biometric dataset seamlessly into existing enterprise PHP/Laravel dashboards."
        ],
        technologies: ["PHP", "Laravel", "SOAP API", "MySQL", "API Integration", "Attendance Management"]
    },
    {
        id: 1,
        title: "Enterprise Web Applications",
        category: "PHP / Laravel / Backend",
        overview: "Designed and maintained enterprise web applications using Laravel and Core PHP with MVC architecture, OOP, REST APIs, database integrations, testing, debugging, and production support.",
        role: "Senior Software Engineer",
        contributions: [
            "Developed modular backend code bases adhering strictly to MVC and object-oriented programming standards.",
            "Created robust RESTful endpoints for internal system modules and external services.",
            "Optimized database queries and relational schemas to handle high throughput data operations.",
            "Provided continuous production support, bug fixes, unit testing, and technical documentation."
        ],
        technologies: ["PHP", "Laravel", "Core PHP", "MySQL", "REST APIs", "MVC", "OOP"]
    },
    {
        id: 2,
        title: "ERPNext Customization",
        category: "Enterprise Systems",
        overview: "Customized ERPNext modules and workflows to support client-specific operational processes and enterprise requirements.",
        role: "Enterprise Solutions Developer",
        contributions: [
            "Extended built-in ERPNext modules to meet specialized enterprise business requirements.",
            "Configured custom document workflows, custom fields, and validation logic.",
            "Integrated ERPNext data pipelines with third-party backend tools and relational databases."
        ],
        technologies: ["ERPNext", "Enterprise Workflows", "System Customization", "Business Logic"]
    },
    {
        id: 3,
        title: "OpenCart E-commerce Development",
        category: "E-commerce",
        overview: "Developed and customized OpenCart-based e-commerce functionality and integrated backend systems with internal and third-party services.",
        role: "E-commerce & PHP Backend Developer",
        contributions: [
            "Built custom OpenCart extensions, payment/service integrations, and checkout enhancements.",
            "Optimized product catalog queries and inventory sync routines for performance.",
            "Connected frontend e-commerce storefronts with internal backend ERP and payment APIs."
        ],
        technologies: ["OpenCart", "PHP", "MySQL", "JavaScript", "APIs"]
    },
    {
        id: 4,
        title: "Full Stack Web Applications",
        category: "Full Stack Development",
        overview: "Delivered full-stack features using Laravel, CodeIgniter, and Core PHP for backend development and Vue.js and Nuxt.js for frontend applications.",
        role: "Full Stack Developer",
        contributions: [
            "Engineered end-to-end full-stack web applications utilizing modern PHP backends and Vue.js / Nuxt.js frontends.",
            "Built responsive single-page interfaces with seamless async API communication.",
            "Maintained CodeIgniter and Core PHP legacy modules while migrating components to modern Laravel APIs."
        ],
        technologies: ["Laravel", "CodeIgniter", "Core PHP", "Vue.js", "Nuxt.js", "MySQL", "REST APIs"]
    },
    {
        id: 5,
        title: "Large-Scale Web, Mobile & IoT Project",
        category: "Enterprise / IoT",
        overview: "Contributed to a complex project involving a large-scale website, mobile application, physical devices, and IoT components.",
        role: "Senior Software Engineer / Backend Integration Specialist",
        contributions: [
            "Engineered scalable PHP/Laravel REST APIs supporting multi-platform interaction across web, mobile apps, and IoT hardware.",
            "Designed reliable backend sync protocols and message handlers for physical device telematics.",
            "Received direct client recognition for high-quality code, exceptional communication, responsiveness, professionalism, and reliable delivery."
        ],
        technologies: ["PHP", "Laravel", "IoT Integration", "Mobile API", "REST APIs", "MySQL"]
    }
];

function openProjectModal(index) {
    const project = projectsData[index];
    if (!project) return;

    const modal = document.getElementById('project-modal');
    if (!modal) return;

    document.getElementById('modal-category').textContent = project.category;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-overview').textContent = project.overview;
    document.getElementById('modal-role').textContent = project.role;

    const contributionsList = document.getElementById('modal-contributions');
    contributionsList.innerHTML = '';
    project.contributions.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        contributionsList.appendChild(li);
    });

    const techTagsContainer = document.getElementById('modal-tech-tags');
    techTagsContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'project-tag';
        span.textContent = tech;
        techTagsContainer.appendChild(span);
    });

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }
}

function initModalEvents() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

/* --------------------------------------------------------------------------
   9. CONTACT FORM VALIDATION & HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous error messages
        document.getElementById('name-error').textContent = '';
        document.getElementById('email-error').textContent = '';
        document.getElementById('subject-error').textContent = '';
        document.getElementById('message-error').textContent = '';

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-message').value.trim();

        let isValid = true;

        if (!name) {
            document.getElementById('name-error').textContent = 'Name is required.';
            isValid = false;
        }

        if (!email) {
            document.getElementById('email-error').textContent = 'Email is required.';
            isValid = false;
        } else if (!validateEmail(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!subject) {
            document.getElementById('subject-error').textContent = 'Subject is required.';
            isValid = false;
        }

        if (!message) {
            document.getElementById('message-error').textContent = 'Message is required.';
            isValid = false;
        }

        if (isValid) {
            showToast('Thank you! Your message inquiry has been validated and prepared.', 'success');
            form.reset();
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* --------------------------------------------------------------------------
   10. TOAST NOTIFICATION SYSTEM
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info';
    toast.innerHTML = `<i class="${iconClass}"></i> <span>${escapeHtml(message)}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
