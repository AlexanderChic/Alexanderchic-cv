document.addEventListener("DOMContentLoaded", function () {
    // Essential DOM references
    const navbar = document.querySelector(".navbar");
    const toggleDarkMode = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const backToTopBtn = document.getElementById("back-to-top-btn");
    const contactForm = document.getElementById("contactForm");
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const offset = 20;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight - offset,
                    behavior: "smooth"
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });

    // Dark mode functions
    function updateThemeIcon(isDark) {
        if (toggleDarkMode) {
            toggleDarkMode.innerHTML = isDark ? 
                '<i class="fas fa-sun"></i><span class="ms-2 d-none d-md-inline">Modo Claro</span>' : 
                '<i class="fas fa-moon"></i><span class="ms-2 d-none d-md-inline">Modo Oscuro</span>';
        }
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem("theme");
        const isDarkMode = savedTheme === "dark";
        
        if (isDarkMode) {
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
        }
        
        updateThemeIcon(isDarkMode);
    }

    function toggleTheme() {
        const isDarkMode = body.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        updateThemeIcon(isDarkMode);
    }

    // Initialize theme
    loadTheme();

    // Toggle theme event
    if (toggleDarkMode) {
        toggleDarkMode.addEventListener("click", toggleTheme);
    }

    // Navbar scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
            if (backToTopBtn) {
                backToTopBtn.classList.add("active");
            }
        } else {
            navbar.classList.remove("navbar-scrolled");
            if (backToTopBtn) {
                backToTopBtn.classList.remove("active");
            }
        }
    }

    // Add scroll event
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    
    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Add your form submission logic here
            
            setTimeout(function() {
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
                contactForm.reset();
            }, 1000);
        });
    }
});