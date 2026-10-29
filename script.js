// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll — theme-aware (uses CSS variable)
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const navBg = isDark ? 'rgba(13,17,23,0.98)' : 'rgba(255,255,255,0.98)';
    const navBgLight = isDark ? 'rgba(13,17,23,0.95)' : 'rgba(255,255,255,0.95)';
    if (window.scrollY > 50) {
        navbar.style.background = navBg;
        navbar.style.boxShadow = isDark
            ? '0 2px 20px rgba(0,0,0,0.5)'
            : '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = navBgLight;
        navbar.style.boxShadow = 'none';
    }
});

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
    const animateElements = document.querySelectorAll('.research-card, .publication-item, .project-card, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = stat.textContent.includes('+') ? 
                    parseInt(stat.textContent.replace('+', '')) : 
                    parseInt(stat.textContent);
                
                if (!isNaN(target)) {
                    stat.textContent = '0';
                    setTimeout(() => {
                        animateCounter(stat, target);
                        if (stat.textContent.includes('+')) {
                            setTimeout(() => {
                                stat.textContent = target + '+';
                            }, 2100);
                        }
                    }, 500);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Email link functionality
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // You can add analytics tracking here if needed
        console.log('Email link clicked');
    });
});

// Add hover effects for cards
document.querySelectorAll('.research-card, .project-card, .publication-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// Active nav link — handled by CSS variables in styles.css

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const htmlElement = document.documentElement;

    // 1. Cargar preferencia
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun'); // En modo oscuro mostramos el Sol
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon'); // En modo claro mostramos la Luna
    }

    // 2. Evento Click
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // Pasar a Claro
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            // Pasar a Oscuro
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });
});

// ============================================================
// Publication filter + collapsible lists (show first 5)
// ============================================================
(function () {
    const LIMIT = 5;
    const TYPES = ['journal', 'conference', 'book'];
    const pubList   = document.querySelector('.publications-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const catTitles  = document.querySelectorAll('.pub-category-title');
    if (!pubList) return;

    const expanded = { journal: false, conference: false, book: false };
    let activeFilter = 'all';

    function makeCollapseBtn(text, forType) {
        const btn = document.createElement('button');
        btn.className = 'collapse-btn';
        btn.dataset.for = forType;
        btn.innerHTML = text;
        return btn;
    }

    function applyFilter(filter) {
        activeFilter = filter;
        TYPES.forEach(t => { expanded[t] = false; });

        document.querySelectorAll('.publication-item').forEach(item => {
            const match = filter === 'all' || item.dataset.type === filter;
            item.classList.toggle('pub-type-hidden', !match);
            item.classList.remove('pub-limit-hidden'); // reset limit on filter change
        });
        catTitles.forEach(title => {
            const match = filter === 'all' || title.dataset.type === filter;
            title.classList.toggle('pub-type-hidden', !match);
        });
    }

    function applyCollapse() {
        // Remove all existing collapse buttons
        pubList.querySelectorAll('.collapse-btn').forEach(b => b.remove());

        const typesToProcess = activeFilter === 'all' ? TYPES : [activeFilter];

        typesToProcess.forEach(type => {
            const items = Array.from(
                pubList.querySelectorAll(`.publication-item[data-type="${type}"]`)
            ).filter(item => !item.classList.contains('pub-type-hidden'));

            if (items.length <= LIMIT) {
                items.forEach(item => item.classList.remove('pub-limit-hidden'));
                return;
            }

            items.forEach((item, i) => {
                item.classList.toggle('pub-limit-hidden', !expanded[type] && i >= LIMIT);
            });

            const lastVisible = expanded[type] ? items[items.length - 1] : items[LIMIT - 1];
            const total = items.length;
            const btn = makeCollapseBtn(
                expanded[type]
                    ? '<i class="fas fa-chevron-up"></i> Hide'
                    : `<i class="fas fa-chevron-down"></i> See all`,
                type
            );
            btn.addEventListener('click', () => {
                expanded[type] = !expanded[type];
                applyCollapse();
                if (!expanded[type]) {
                    // scroll back to first item of this type
                    const firstItem = items[0];
                    const offset = firstItem.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            });
            lastVisible.insertAdjacentElement('afterend', btn);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.filter);
            applyCollapse();
        });
    });

    // Initial state
    applyFilter('all');
    applyCollapse();
})();

// ============================================================
// Presentation lists — show first 5 per column
// ============================================================
(function () {
    const LIMIT = 5;

    document.querySelectorAll('.pres-column').forEach(col => {
        const list  = col.querySelector('.presentation-list');
        const items = Array.from(col.querySelectorAll('.presentation-item'));
        if (!list || items.length <= LIMIT) return;

        let expanded = false;

        function applyLimit() {
            const existingBtn = col.querySelector('.collapse-btn');
            if (existingBtn) existingBtn.remove();

            items.forEach((item, i) => {
                item.classList.toggle('pres-limit-hidden', !expanded && i >= LIMIT);
            });

            const lastVisible = expanded ? items[items.length - 1] : items[LIMIT - 1];
            const btn = document.createElement('button');
            btn.className = 'collapse-btn';
            btn.innerHTML = expanded
                ? '<i class="fas fa-chevron-up"></i> Hide'
                : `<i class="fas fa-chevron-down"></i> See all`;

            btn.addEventListener('click', () => {
                expanded = !expanded;
                applyLimit();
                if (!expanded) {
                    const offset = items[0].getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            });

            lastVisible.insertAdjacentElement('afterend', btn);
        }

        applyLimit();
    });
})();
