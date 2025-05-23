// --- MENÚ HAMBURGUESA ---
document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('burger');
  const menu = document.getElementById('menu-desplegable');

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      menu.classList.add('visible');
    } else {
      menu.classList.remove('visible');
    }
  });

  document.addEventListener('click', (e) => {
    const isClickInside = menu.contains(e.target) || e.target.closest('.burger');
    if (!isClickInside && checkbox.checked) {
      checkbox.checked = false;
      menu.classList.remove('visible');
    }
  });
});

// --- NAVBAR TRANSPARENTE ---
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navBar");
  const logoNavBarTEXTO = document.getElementById("logoNavBarTEXTO");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      navbar.classList.add("transparent");
      logoNavBarTEXTO.classList.add("transparent");
    } else {
      navbar.classList.remove("transparent");
      logoNavBarTEXTO.classList.remove("transparent");
    }
  });
});

// --- COMPORTAMIENTO DE BLOQUES DE TEXTO (mostrar TextoOculto) ---
let timeoutId = null;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.bloqueTexto').forEach(bloque => {
    const p1 = bloque.querySelector('.TextoInicial');
    const p2 = bloque.querySelector('.TextoOculto');

    p1.addEventListener('click', () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      // Resetear todos los bloques
      document.querySelectorAll('.bloqueTexto').forEach(otroBloque => {
        const otroP1 = otroBloque.querySelector('.TextoInicial');
        const otroP2 = otroBloque.querySelector('.TextoOculto');

        otroP1.style.opacity = 1;
        otroP1.style.pointerEvents = 'auto';
        otroP2.style.opacity = 0;
        otroP2.style.pointerEvents = 'none';
      });

      // Mostrar TextoOculto actual
      p1.style.opacity = 0;
      p1.style.pointerEvents = 'none';
      p2.style.opacity = 1;
      p2.style.pointerEvents = 'auto';

      timeoutId = setTimeout(() => {
        document.querySelectorAll('.bloqueTexto').forEach(b => {
          const resetP1 = b.querySelector('.TextoInicial');
          const resetP2 = b.querySelector('.TextoOculto');

          resetP1.style.opacity = 1;
          resetP1.style.pointerEvents = 'auto';
          resetP2.style.opacity = 0;
          resetP2.style.pointerEvents = 'none';
        });

        timeoutId = null;
      }, 8000);
    });

    p2.addEventListener('click', () => {
      p2.style.opacity = 0;
      p2.style.pointerEvents = 'none';
      p1.style.opacity = 1;
      p1.style.pointerEvents = 'auto';

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    });
  });
});

// --- EFECTO ZOOM AL SCROLLEAR EN MÓVILES ---
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 768) { // Solo en móviles
    const bloques = document.querySelectorAll(".bloqueTexto");

    function checkVisibility() {
      const centerY = window.innerHeight * 0.5; // 50% del alto de la pantalla
      const minY = window.innerHeight * 0.45;
      const maxY = window.innerHeight * 0.65;

      bloques.forEach(bloque => {
        const textoInicial = bloque.querySelector(".TextoInicial");

        if (!textoInicial) return;

        const rect = textoInicial.getBoundingClientRect();
        const elementoCentro = rect.top + rect.height / 2;

        if (elementoCentro >= minY && elementoCentro <= maxY) {
          bloque.classList.add("zoom-bg");
        } else {
          bloque.classList.remove("zoom-bg");
        }
      });
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility); // por si cambian las dimensiones
    checkVisibility(); // ejecutar al cargar
  }
});

// ADAPTABILIDAD DEL CARROUSEL DE TESTIMONIOS

document.addEventListener("DOMContentLoaded", function () {
  function agruparTestimonios() {
    const anchoPantalla = window.innerWidth;
    const carouselInner = document.querySelector("#carouselTestimonios .carousel-inner");
    const indicadores = document.querySelector(".carousel-indicators");

    if (anchoPantalla >= 768) {
      const testimonios = Array.from(document.querySelectorAll(".testimonio"));

      // Limpiar contenido actual
      carouselInner.innerHTML = "";
      indicadores.innerHTML = "";

      const testimoniosPorGrupo = 3;
      const totalSlides = Math.ceil(testimonios.length / testimoniosPorGrupo);

      for (let i = 0; i < testimonios.length; i += testimoniosPorGrupo) {
        const nuevoItem = document.createElement("div");
        nuevoItem.classList.add("carousel-item");
        if (i === 0) nuevoItem.classList.add("active");

        const contenedor = document.createElement("div");
        contenedor.classList.add("contenedor-testimonios");

        testimonios.slice(i, i + testimoniosPorGrupo).forEach(testimonio => {
          contenedor.appendChild(testimonio);
        });

        nuevoItem.appendChild(contenedor);
        carouselInner.appendChild(nuevoItem);

        // Crear indicador
        const indicador = document.createElement("button");
        indicador.type = "button";
        indicador.setAttribute("data-bs-target", "#carouselTestimonios");
        indicador.setAttribute("data-bs-slide-to", i / testimoniosPorGrupo);
        indicador.setAttribute("aria-label", `Slide ${i / testimoniosPorGrupo + 1}`);
        if (i === 0) {
          indicador.classList.add("active");
          indicador.setAttribute("aria-current", "true");
        }
        indicadores.appendChild(indicador);
      }
    }
  }

  agruparTestimonios();

  window.addEventListener("resize", function () {
    location.reload();
  });
});