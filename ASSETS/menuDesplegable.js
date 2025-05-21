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



let timeoutId = null; // Variable global para guardar el temporizador

document.querySelectorAll('.bloqueTexto').forEach(bloque => {
  const p1 = bloque.querySelector('.TextoInicial');
  const p2 = bloque.querySelector('.TextoOculto');

  p1.addEventListener('click', () => {
    // Cancelar el temporizador anterior si existe
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    // Restaurar todos los bloques
    document.querySelectorAll('.bloqueTexto').forEach(otroBloque => {
      const otroP1 = otroBloque.querySelector('.TextoInicial');
      const otroP2 = otroBloque.querySelector('.TextoOculto');
      
      otroP1.style.opacity = 1;
      otroP1.style.pointerEvents = 'auto';
      otroP2.style.opacity = 0;
      otroP2.style.pointerEvents = 'none';
    });

    // Mostrar el p2 del bloque actual
    p1.style.opacity = 0;
    p1.style.pointerEvents = 'none';
    p2.style.opacity = 1;
    p2.style.pointerEvents = 'auto';

    // Iniciar nuevo temporizador
    timeoutId = setTimeout(() => {
      document.querySelectorAll('.bloqueTexto').forEach(b => {
        const resetP1 = b.querySelector('.TextoInicial');
        const resetP2 = b.querySelector('.TextoOculto');

        resetP1.style.opacity = 1;
        resetP1.style.pointerEvents = 'auto';
        resetP2.style.opacity = 0;
        resetP2.style.pointerEvents = 'none';
      });

      timeoutId = null; // Limpiar el temporizador
    }, 8000);
  });

  // (opcional) aún puedes dejar esto si querés que el usuario cierre antes
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



