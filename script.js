/* =========================================================
   NEXTLAYER - Business Coaching Landing Page
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. ハンバーガーメニュー
  ========================================================= */

  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  if (hamburger && nav) {

    // トグル開閉
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("is-open");

      const isExpanded =
        hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
    });

    // ナビリンク押したら閉じる（SP対策）
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* =========================================================
     2. Fade-up Animation
  ========================================================= */

  const fadeElements = document.querySelectorAll(".fade-up");

  if (fadeElements.length > 0) {

    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }


  /* =========================================================
     3. Count-up Animation
  ========================================================= */

  const countElements = document.querySelectorAll(".result-number");

  if (countElements.length > 0) {

    const animateCount = (el) => {
      const target = parseInt(el.getAttribute("data-target"), 10);
      if (isNaN(target)) return;

      const duration = 2000;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);

        el.textContent = value.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(update);
    };

    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countElements.forEach(el => countObserver.observe(el));
  }


  /* =========================================================
     4. FAQアコーディオン
  ========================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {

    faqItems.forEach(item => {

      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      if (!button || !answer) return;

      button.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        // 全部閉じる
        faqItems.forEach(i => {
          i.classList.remove("active");
          const a = i.querySelector(".faq-answer");
          if (a) a.style.maxHeight = null;
        });

        // 開く
        if (!isActive) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }

      });

    });
  }


  /* =========================================================
     5. フォームバリデーション
  ========================================================= */

  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (form) {

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;

      // エラーリセット
      form.querySelectorAll(".error-message").forEach(el => {
        el.classList.remove("is-show");
      });

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const task = form.task.value.trim();
      const agree = form.agree.checked;

      if (!name) {
        showError("name");
        isValid = false;
      }

      if (!validateEmail(email)) {
        showError("email");
        isValid = false;
      }

      if (!task) {
        showError("task");
        isValid = false;
      }

      if (!agree) {
        showError("agree");
        isValid = false;
      }

      if (isValid) {
        form.style.display = "none";
        if (successMessage) {
          successMessage.style.display = "block";

          window.scrollTo({
            top: successMessage.offsetTop - 100,
            behavior: "smooth"
          });
        }
      }

    });

    function showError(type) {
      const errorEl =
        form.querySelector(`[data-error="${type}"]`);
      if (errorEl) {
        errorEl.classList.add("is-show");
      }
    }

    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  }

});