document.addEventListener("DOMContentLoaded", function () {

  // Ano dinâmico no rodapé
  var anoEl = document.getElementById("ano");
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

  // Animação das barras de habilidade quando entram na tela
  var skillBars = document.querySelectorAll(".skill-bar");

  function preencherBarra(bar) {
    var nivel = bar.getAttribute("data-level") || "0";
    var fill = bar.querySelector(".skill-fill");
    if (fill) {
      fill.style.width = nivel + "%";
    }
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          preencherBarra(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    skillBars.forEach(function (bar) {
      observer.observe(bar);
    });
  } else {
    // Navegadores antigos: preenche tudo direto
    skillBars.forEach(preencherBarra);
  }

  // Clicar na barra também alterna entre mostrar/atualizar o valor (interação extra)
  skillBars.forEach(function (bar) {
    var track = bar.querySelector(".skill-track");
    if (track) {
      track.addEventListener("click", function () {
        preencherBarra(bar);
      });
    }
  });

  // Fecha o menu mobile automaticamente ao clicar em um link
  var navLinks = document.querySelectorAll("#navMenu .nav-link");
  var navMenu = document.getElementById("navMenu");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("show")) {
        var bsCollapse = bootstrap.Collapse.getInstance(navMenu) || new bootstrap.Collapse(navMenu);
        bsCollapse.hide();
      }
    });
  });

});
