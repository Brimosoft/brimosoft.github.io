// BrimoSoft website: phone menu, header shadow on scroll, fade-in on scroll, pricing tabs.
(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle) toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Sections fade in as they come into view.
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("shown"); seen.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { seen.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("shown"); });
  }

  // Pricing: switch between the products' plans.
  document.querySelectorAll(".tabs [data-plans]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var box = btn.closest(".pricing-tabs");
      box.querySelectorAll(".tabs button").forEach(function (b) { b.classList.toggle("active", b === btn); });
      box.querySelectorAll(".plans").forEach(function (p) {
        p.hidden = p.id !== "plans-" + btn.dataset.plans;
        if (!p.hidden) p.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("shown"); });
      });
    });
  });
})();

// "Products" menu: opens on hover (desktop) or on a tap; closes on a tap elsewhere.
(function () {
  document.querySelectorAll(".nav-group-toggle").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var group = btn.closest(".nav-group");
      var open = group.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".nav-group.open").forEach(function (g) {
      g.classList.remove("open");
      g.querySelector(".nav-group-toggle").setAttribute("aria-expanded", "false");
    });
  });
})();
