document.addEventListener("DOMContentLoaded", function () {
    console.log("Página cargada correctamente.");

    // Desplazamiento suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offset = 50; // Ajusta este valor según la altura de tu navbar
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: "smooth"
                });
            }
        });
    });

    // Modo oscuro
    const toggleDarkMode = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Cargar preferencia del modo oscuro al inicio
    function loadTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            body.classList.add("dark-mode");
            toggleDarkMode.textContent = "☀️ Cambiar a Claro";
        } else {
            body.classList.remove("dark-mode");
            toggleDarkMode.textContent = "🌙 Cambiar a Oscuro";
        }
    }

    // Cambiar modo oscuro
    function toggleTheme() {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            toggleDarkMode.textContent = "☀️ Cambiar a Claro";
        } else {
            localStorage.setItem("theme", "light");
            toggleDarkMode.textContent = "🌙 Cambiar a Oscuro";
        }
    }

    // Cargar tema al inicio
    loadTheme();

    // Evento para cambiar el modo
    toggleDarkMode.addEventListener("click", toggleTheme);

    // Cambiar el color del navbar al hacer scroll
    window.addEventListener("scroll", function() {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    });
}); 