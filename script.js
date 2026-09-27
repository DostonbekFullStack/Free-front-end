(function () {
  "use strict";

  var burger = document.getElementById("burgerBtn");
  var contact = document.getElementById("headerContact");

  if (burger && contact) {
    burger.addEventListener("click", function () {
      var isOpen = contact.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    contact.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        contact.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (event) {
      if (!contact.classList.contains("is-open")) return;
      if (contact.contains(event.target) || burger.contains(event.target)) return;
      contact.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  }

  var header = document.getElementById("siteHeader");
  if (header) {
    var updateHeader = function () {
      if (window.scrollY > 10) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      var target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  var moreBtn = document.getElementById("portfolioMoreBtn");
  if (moreBtn) {
    moreBtn.addEventListener("click", function () {
      moreBtn.disabled = true;
      moreBtn.textContent = "Больше проектов пока нет";
    });
  }

  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    var message = form.querySelector("[data-form-message]");

    form.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("blur", function () {
        input.classList.add("touched");
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.querySelectorAll("input").forEach(function (input) {
          input.classList.add("touched");
        });
        if (message) {
          message.textContent = "Пожалуйста, заполните все поля и примите условия.";
          message.classList.add("is-error");
        }
        return;
      }

      if (message) {
        message.classList.remove("is-error");
        message.textContent = "Спасибо! Заявка отправлена, мы свяжемся с вами в ближайшее время.";
      }
      form.reset();
      form.querySelectorAll("input").forEach(function (input) {
        input.classList.remove("touched");
      });
    });
  });
})();
