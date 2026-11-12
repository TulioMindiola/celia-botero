/* ==========================================================================
   Celia Botero — main.js
   JavaScript sin dependencias. Datos editables al inicio del archivo.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. DATOS DEL NEGOCIO (editables por la clienta)
     ------------------------------------------------------------------------ */

  // WhatsApp de asesoría personalizada (formato internacional, sin "+")
  const WA_NUMBER = "573107477755";

  // PENDIENTE: horario de la tienda. Mientras esté vacío, no se muestra en la página.
  // Ejemplo: "Lunes a sábado · 9:00 a. m. – 7:00 p. m."
  const HORARIO = "";

  // PENDIENTE: confirmar años de trayectoria (la bio dice "+30"; dos publicaciones dicen "25 años").
  const ANOS_TRAYECTORIA = "+30";

  // PENDIENTE: número de reseñas de Google (la ficha muestra 5,0 ★). Vacío = no se muestra el número.
  const RESENAS_GOOGLE = "";

  // PENDIENTE: precios. No se muestran hasta que la clienta los entregue.

  // Mensajes prellenados de WhatsApp
  const MENSAJES = {
    general: "Hola, estoy interesada en ver los diseños",
    categoria: (categoria) => `Hola Celia, quiero ver opciones de ${categoria}.`,
    producto: (producto) => `Hola Celia, me interesa ${producto}. ¿Qué tallas y colores tienen?`,
    coleccion: "Hola Celia, quiero ver la colección Encuentro Sagrado.",
  };

  // Categorías (sección "Encuentra lo tuyo")
  const CATEGORIAS = [
    {
      numero: "01",
      nombre: "Zapatos",
      mensaje: "zapatos",
      imagen: "cat-zapatos", anchos: [640, 1022], ancho: 1022, alto: 1278, foco: "50% 78%",
      sizes: "(min-width: 1024px) 40vw, (min-width: 768px) 100vw, 78vw",
      alt: "Mujer caminando por una calle de piedra con pantalón de lino y baletas doradas de cuero",
    },
    {
      numero: "02",
      nombre: "Bolsos",
      mensaje: "bolsos",
      imagen: "cat-bolsos", anchos: [585], ancho: 585, alto: 780, foco: "50% 50%",
      sizes: "(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 78vw",
      alt: "Bolso hobo dorado de cuero con asa trenzada en negro y dorado",
    },
    {
      numero: "03",
      nombre: "Cinturones y fajones",
      mensaje: "cinturones y fajones",
      imagen: "cat-cinturones", anchos: [640, 941], ancho: 941, alto: 941, foco: "50% 45%",
      sizes: "(min-width: 1024px) 24vw, (min-width: 768px) 50vw, 78vw",
      alt: "Cinturón de cuero con tachas sobre camisa negra y pantalón blanco",
    },
    {
      numero: "04",
      nombre: "Accesorios DiPietra",
      mensaje: "accesorios DiPietra",
      imagen: "cat-accesorios", anchos: [640], ancho: 640, alto: 853, foco: "50% 45%",
      sizes: "(min-width: 1024px) 24vw, (min-width: 768px) 50vw, 78vw",
      alt: "Collar dorado de discos de la línea DiPietra exhibido en un busto de lino",
    },
  ];

  // Colección "Encuentro Sagrado"
  // PENDIENTE: confirmar con la clienta nombres oficiales y descripciones de cada referencia.
  const COLECCION = [
    {
      numero: "01",
      nombre: "Slingback tejido dorado",
      descripcion: "Calado geométrico en tono dorado.",
      consulta: "el slingback tejido dorado",
      imagen: "col-01", anchos: [640, 1024], ancho: 1024, alto: 1365, foco: "50% 70%",
      alt: "Slingbacks dorados de cuero calado con falda de lino sobre un andén",
    },
    {
      numero: "02",
      nombre: "Mule trenzado de tacón bajo",
      descripcion: "Cuero trenzado con efecto canasta y tacón bajo.",
      consulta: "el mule trenzado de tacón bajo",
      imagen: "col-02", anchos: [640, 1012], ancho: 1012, alto: 1350, foco: "50% 70%",
      alt: "Mules trenzados de tacón bajo con jean claro",
    },
    {
      numero: "03",
      nombre: "Mary Jane calada",
      descripcion: "Cuero calado con correa al empeine.",
      consulta: "la Mary Jane calada",
      imagen: "col-03", anchos: [640], ancho: 640, alto: 853, foco: "50% 60%",
      alt: "Zapatos Mary Jane de cuero calado con pantalón café sobre piso de mármol",
    },
    {
      numero: "04",
      nombre: "Mule rojo de tacón bloque",
      descripcion: "Un tacón protagonista en rojo.",
      consulta: "el mule rojo de tacón bloque",
      imagen: "col-04", anchos: [640, 941], ancho: 941, alto: 1255, foco: "50% 50%",
      alt: "Mules rojos de punta y tacón bloque con jean, en una calle de piedra",
    },
    {
      numero: "05",
      nombre: "Sandalia de nudos en cuero miel",
      descripcion: "Tiras anudadas en cuero color miel.",
      consulta: "la sandalia de nudos en cuero miel",
      imagen: "col-05", anchos: [640, 1024], ancho: 1024, alto: 1365, foco: "50% 60%",
      alt: "Sandalia plana de tiras anudadas en cuero color miel, en la tienda",
    },
    {
      numero: "06",
      nombre: "Sandalia de plataforma metalizada",
      descripcion: "Cuero metalizado sobre plataforma.",
      consulta: "la sandalia de plataforma metalizada",
      imagen: "col-06", anchos: [640, 1024], ancho: 1024, alto: 1365, foco: "50% 70%",
      alt: "Sandalia de plataforma en cuero metalizado con correa al tobillo",
    },
  ];

  /* ------------------------------------------------------------------------
     2. UTILIDADES
     ------------------------------------------------------------------------ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function waLink(mensaje) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  }

  // data-wa="general" | "coleccion" | "categoria:zapatos" | "producto:el slingback tejido dorado"
  function mensajeDesde(spec) {
    const sep = spec.indexOf(":");
    const tipo = sep === -1 ? spec : spec.slice(0, sep);
    const valor = sep === -1 ? "" : spec.slice(sep + 1);
    if (tipo === "categoria") return MENSAJES.categoria(valor);
    if (tipo === "producto") return MENSAJES.producto(valor);
    if (tipo === "coleccion") return MENSAJES.coleccion;
    return MENSAJES.general;
  }

  function aplicarWhatsApp(scope = document) {
    $$("[data-wa]", scope).forEach((a) => {
      a.href = waLink(mensajeDesde(a.dataset.wa));
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  function imgHTML(o, sizes, extra = "") {
    const srcset = o.anchos.map((w) => `assets/img/${o.imagen}-${w}.webp ${w}w`).join(", ");
    return `<img src="assets/img/${o.imagen}-${o.anchos[0]}.webp" srcset="${srcset}" sizes="${sizes}" width="${o.ancho}" height="${o.alto}" loading="lazy" decoding="async" draggable="false" alt="${esc(o.alt)}" style="--pos:${o.foco}"${extra}>`;
  }

  const iconUse = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;

  // Ancho real de la ventana sin barra de scroll (para los elementos que sangran)
  function medirVentana() {
    root.style.setProperty("--vw", `${root.clientWidth / 100}px`);
  }

  /* ------------------------------------------------------------------------
     3. RENDER DE CONTENIDO DESDE LOS ARREGLOS
     ------------------------------------------------------------------------ */
  function renderCategorias() {
    const lista = $("[data-categorias]");
    if (!lista) return;
    lista.innerHTML = CATEGORIAS.map((c, i) => `
      <li class="cat cat--${i + 1}">
        <a class="cat__link frame" href="https://wa.me/${WA_NUMBER}" data-wa="categoria:${esc(c.mensaje)}">
          <figure class="cat__media photo" data-reveal="photo" style="--delay:${(i % 2) * 120}ms">${imgHTML(c, c.sizes)}</figure>
          <span class="cat__label"><span class="cat__num" aria-hidden="true">${esc(c.numero)}</span> <span class="cat__name">${esc(c.nombre)}</span></span>
          <span class="cat__arrow">${iconUse("i-arrow-ur")}</span>
          <span class="visually-hidden"> — ver opciones por WhatsApp</span>
        </a>
      </li>`).join("");
  }

  function renderColeccion() {
    const rail = $('[data-rail="coleccion"]');
    if (!rail) return;
    rail.innerHTML = COLECCION.map((p) => `
      <li class="card">
        <a class="card__link" href="https://wa.me/${WA_NUMBER}" data-wa="producto:${esc(p.consulta)}">
          <figure class="card__media photo frame" data-reveal="photo">
            ${imgHTML(p, "(min-width: 1024px) 340px, (min-width: 768px) 300px, 72vw")}
            <span class="card__arrow">${iconUse("i-arrow-ur")}</span>
          </figure>
          <div class="card__body">
            <span class="card__num">${esc(p.numero)}</span>
            <h3 class="card__title">${esc(p.nombre)}</h3>
            <p class="card__desc">${esc(p.descripcion)}</p>
            <span class="card__cta">Consultar ${iconUse("i-arrow-r")}<span class="visually-hidden"> por WhatsApp</span></span>
          </div>
        </a>
      </li>`).join("");
  }

  function renderDatosPendientes() {
    if (HORARIO.trim()) {
      $$("[data-horario]").forEach((el) => {
        const txt = $("[data-horario-text]", el);
        if (txt) txt.textContent = HORARIO;
        el.hidden = false;
      });
    }
    const proof = $(".store__proof");
    if (proof && RESENAS_GOOGLE.trim()) {
      proof.textContent = `5,0 ★ en Google (${RESENAS_GOOGLE} reseñas) · 18,6 mil en Instagram`;
    }
    const facts = $(".hero__facts strong");
    if (facts && ANOS_TRAYECTORIA) facts.textContent = ANOS_TRAYECTORIA;
  }

  /* ------------------------------------------------------------------------
     4. FRANJA DE ANUNCIO (marquesina continua)
     ------------------------------------------------------------------------ */
  function initMarquesina() {
    const track = $(".announce__track");
    const group = track && track.firstElementChild;
    if (!group) return;
    const base = group.outerHTML;
    const montar = () => {
      track.innerHTML = base;
      const ancho = track.firstElementChild.getBoundingClientRect().width || 1;
      const copias = Math.max(1, Math.ceil(window.innerWidth / ancho));
      const mitad = base.repeat(copias);
      track.innerHTML = mitad + mitad;
      track.style.animationDuration = `${40 * copias}s`;
    };
    montar();
    let ultimoAncho = window.innerWidth;
    window.addEventListener("resize", () => {
      if (Math.abs(window.innerWidth - ultimoAncho) > 80) {
        ultimoAncho = window.innerWidth;
        montar();
      }
    }, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(montar);
  }

  /* ------------------------------------------------------------------------
     5. CABECERA: fondo al hacer scroll, se oculta al bajar y reaparece al subir
     ------------------------------------------------------------------------ */
  function initHeader() {
    const header = $("[data-header]");
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 24);
      const menuAbierto = document.body.classList.contains("is-locked");
      const conFoco = header.contains(document.activeElement);
      if (!menuAbierto && !conFoco && y > lastY + 4 && y > 240) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y <= 240) header.classList.remove("is-hidden");
      lastY = y;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
    update();
  }

  /* ------------------------------------------------------------------------
     6. MENÚ MÓVIL: pantalla completa, bloquea el fondo, Escape, foco atrapado
     ------------------------------------------------------------------------ */
  function initMenu() {
    const menu = $("[data-menu]");
    const abrir = $("[data-menu-open]");
    const cerrar = $("[data-menu-close]");
    if (!menu || !abrir) return;
    const focusables = () => $$('a[href], button:not([disabled])', menu).filter((el) => el.offsetParent !== null);
    let cerrarTimer;

    const open = () => {
      clearTimeout(cerrarTimer);
      menu.hidden = false;
      document.body.classList.add("is-locked");
      abrir.setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add("is-open")));
      const primero = $(".menu__nav a", menu);
      if (primero) primero.focus({ preventScroll: true });
      document.addEventListener("keydown", onKey);
    };
    const close = (devolverFoco = true) => {
      menu.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      abrir.setAttribute("aria-expanded", "false");
      document.removeEventListener("keydown", onKey);
      cerrarTimer = setTimeout(() => { menu.hidden = true; }, reducedMotion.matches ? 0 : 360);
      if (devolverFoco) abrir.focus({ preventScroll: true });
    };
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    abrir.addEventListener("click", open);
    cerrar.addEventListener("click", () => close());
    $$("[data-menu-link]", menu).forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        const destino = id && id.startsWith("#") ? document.getElementById(id.slice(1)) : null;
        close(false);
        if (destino) {
          e.preventDefault();
          requestAnimationFrame(() => {
            destino.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
            history.pushState(null, "", id);
          });
        }
      });
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (mq) => {
      if (mq.matches && !menu.hidden) close(false);
    });
  }

  /* ------------------------------------------------------------------------
     7. ANIMACIONES DE ENTRADA: un único IntersectionObserver (umbral 0.2)
     ------------------------------------------------------------------------ */
  function initReveal() {
    const items = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    items.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------------
     8. CARRILES HORIZONTALES: scroll-snap, arrastre con mouse, flechas, progreso
     ------------------------------------------------------------------------ */
  function initRails() {
    $$("[data-rail]").forEach((rail) => {
      const name = rail.dataset.rail;
      const barra = $(`[data-rail-progress="${name}"]`);
      const prev = $(`[data-rail-prev="${name}"]`);
      const next = $(`[data-rail-next="${name}"]`);
      const contador = name === "galeria" ? $("[data-gallery-count]") : null;

      const paso = () => {
        const primero = rail.querySelector(".card, .gallery__item");
        if (!primero) return rail.clientWidth * 0.8;
        const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
        return primero.getBoundingClientRect().width + gap;
      };

      const actualizar = () => {
        const max = rail.scrollWidth - rail.clientWidth;
        const scrollable = max > 2;
        if (barra) {
          const visible = rail.clientWidth / rail.scrollWidth;
          const avance = scrollable ? rail.scrollLeft / max : 1;
          barra.style.transform = `scaleX(${Math.min(1, visible + (1 - visible) * avance)})`;
        }
        if (prev) prev.disabled = !scrollable || rail.scrollLeft <= 2;
        if (next) next.disabled = !scrollable || rail.scrollLeft >= max - 2;
        if (contador && scrollable) {
          const idx = Math.round(rail.scrollLeft / paso()) + 1;
          contador.textContent = String(Math.min(7, Math.max(1, idx)));
        }
      };

      let raf = 0;
      rail.addEventListener("scroll", () => {
        if (!raf) raf = requestAnimationFrame(() => { raf = 0; actualizar(); });
      }, { passive: true });
      window.addEventListener("resize", actualizar, { passive: true });

      const mover = (dir) => rail.scrollBy({ left: dir * paso(), behavior: reducedMotion.matches ? "auto" : "smooth" });
      if (prev) prev.addEventListener("click", () => mover(-1));
      if (next) next.addEventListener("click", () => mover(1));
      rail.addEventListener("keydown", (e) => {
        if (e.target !== rail) return;
        if (e.key === "ArrowRight") { e.preventDefault(); mover(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); mover(-1); }
      });

      if (rail.hasAttribute("data-drag")) initArrastre(rail);
      actualizar();
    });
  }

  function initArrastre(rail) {
    let inicioX = 0;
    let inicioScroll = 0;
    let activo = false;
    let arrastrando = false;
    let bloquearClick = false;
    let pointerId = null;

    rail.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      activo = true;
      arrastrando = false;
      inicioX = e.clientX;
      inicioScroll = rail.scrollLeft;
      pointerId = e.pointerId;
    });
    rail.addEventListener("pointermove", (e) => {
      if (!activo) return;
      const dx = e.clientX - inicioX;
      if (!arrastrando && Math.abs(dx) > 6) {
        arrastrando = true;
        rail.classList.add("is-dragging");
        try { rail.setPointerCapture(pointerId); } catch (_) { /* sin captura */ }
      }
      if (arrastrando) {
        e.preventDefault();
        rail.scrollLeft = inicioScroll - dx;
      }
    });
    const terminar = () => {
      if (!activo) return;
      activo = false;
      if (arrastrando) {
        bloquearClick = true;
        setTimeout(() => { bloquearClick = false; }, 0);
        // Restaurar el ajuste: se reactiva el snap y se alinea a la tarjeta más cercana
        const paso = (rail.querySelector(".card") || rail.firstElementChild).getBoundingClientRect().width + (parseFloat(getComputedStyle(rail).columnGap) || 0);
        const destino = Math.round(rail.scrollLeft / paso) * paso;
        rail.classList.remove("is-dragging");
        rail.scrollTo({ left: destino, behavior: reducedMotion.matches ? "auto" : "smooth" });
      }
      arrastrando = false;
      try { rail.releasePointerCapture(pointerId); } catch (_) { /* nada */ }
    };
    rail.addEventListener("pointerup", terminar);
    rail.addEventListener("pointercancel", terminar);
    rail.addEventListener("lostpointercapture", terminar);
    rail.addEventListener("click", (e) => {
      if (bloquearClick) { e.preventDefault(); e.stopPropagation(); }
    }, true);
    rail.addEventListener("dragstart", (e) => e.preventDefault());

    // Cursor "Arrastra"
    const wrap = rail.parentElement;
    const cursor = wrap && $(".drag-cursor", wrap);
    const fino = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    if (!cursor) return;
    let cx = 0, cy = 0, raf = 0;
    const pintar = () => { raf = 0; cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; };
    rail.addEventListener("pointermove", (e) => {
      if (!fino.matches || e.pointerType !== "mouse") return;
      const r = wrap.getBoundingClientRect();
      cx = e.clientX - r.left;
      cy = e.clientY - r.top;
      cursor.classList.add("is-active");
      if (!raf) raf = requestAnimationFrame(pintar);
    });
    rail.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
  }

  /* ------------------------------------------------------------------------
     9. PARALAJE DE LA GALERÍA (>= 1024 px y puntero fino)
     ------------------------------------------------------------------------ */
  function initParalaje() {
    const galeria = $("[data-gallery]");
    if (!galeria) return;
    const cols = $$("[data-parallax]", galeria);
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    let raf = 0;

    const pintar = () => {
      raf = 0;
      if (!mq.matches || reducedMotion.matches) {
        cols.forEach((c) => { c.style.transform = ""; });
        return;
      }
      const r = galeria.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -100 || r.top > vh + 100) return; // fuera de pantalla: no se recalcula
      // Avance de la sección a lo largo de la ventana: 0 al entrar, 1 al salir
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      cols.forEach((c) => {
        const amp = parseFloat(c.dataset.parallax) || 0;
        c.style.transform = `translate3d(0, ${(amp * (p - 0.5) * 2).toFixed(1)}px, 0)`;
      });
    };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(pintar); };

    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir, { passive: true });
    mq.addEventListener("change", pedir);
    pintar();
  }

  /* ------------------------------------------------------------------------
     10. BOTÓN FLOTANTE Y BARRA INFERIOR: aparecen al salir del hero y se
         ocultan con el CTA final o el footer en pantalla. El mensaje cambia
         según lo que la visitante está mirando.
     ------------------------------------------------------------------------ */
  function initConversion() {
    const flotantes = $$("[data-float]");
    const hero = $("[data-hero]");
    if (!flotantes.length || !hero || !("IntersectionObserver" in window)) return;
    let heroVisible = true;
    const ocultadores = new Set();

    const actualizar = () => {
      const mostrar = !heroVisible && ocultadores.size === 0;
      flotantes.forEach((el) => {
        el.classList.toggle("is-shown", mostrar);
        if (mostrar) el.removeAttribute("inert");
        else el.setAttribute("inert", "");
      });
    };

    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      actualizar();
    }).observe(hero);

    const ioOcultar = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) ocultadores.add(entry.target);
        else ocultadores.delete(entry.target);
      });
      actualizar();
    });
    $$("[data-hide-bar]").forEach((el) => ioOcultar.observe(el));
    actualizar();

    // Mensaje contextual: en la colección, el mensaje habla de Encuentro Sagrado
    const contexto = $$("[data-wa-context]");
    const coleccion = $("#coleccion");
    if (coleccion && contexto.length) {
      new IntersectionObserver(([entry]) => {
        const spec = entry.isIntersecting ? "coleccion" : "general";
        contexto.forEach((a) => {
          a.dataset.wa = spec;
          a.href = waLink(mensajeDesde(spec));
        });
      }, { rootMargin: "-40% 0px -40% 0px" }).observe(coleccion);
    }
  }

  /* ------------------------------------------------------------------------
     11. NAVEGACIÓN ACTIVA
     ------------------------------------------------------------------------ */
  function initNavActiva() {
    const links = $$(".nav__link");
    if (!links.length || !("IntersectionObserver" in window)) return;
    const mapa = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = mapa.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "true");
        } else if (link.getAttribute("aria-current")) {
          link.removeAttribute("aria-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    mapa.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ------------------------------------------------------------------------
     12. ARRANQUE
     ------------------------------------------------------------------------ */
  function init() {
    medirVentana();
    window.addEventListener("resize", medirVentana, { passive: true });
    renderCategorias();
    renderColeccion();
    renderDatosPendientes();
    aplicarWhatsApp();
    initMarquesina();
    initHeader();
    initMenu();
    initReveal();
    initRails();
    initParalaje();
    initConversion();
    initNavActiva();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
