// Wedding Website - Gothic Luxury Design
(function () {
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const navHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add active nav link on scroll
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Falling Hearts Animation
  function createFallingHearts() {
    const heartsContainer = document.querySelector(".hearts-container");
    if (!heartsContainer) return;

    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "❤";

      // Random horizontal position
      heart.style.left = Math.random() * 100 + "%";

      // Random size
      const size = Math.random() * 15 + 15; // 15-30px
      heart.style.fontSize = size + "px";

      // Random animation duration
      const duration = Math.random() * 5 + 8; // 8-13 seconds
      heart.style.animationDuration = duration + "s";

      // Random delay
      heart.style.animationDelay = Math.random() * 5 + "s";

      // Random opacity
      heart.style.opacity = Math.random() * 0.3 + 0.4; // 0.4-0.7

      // Slight horizontal sway
      const sway = (Math.random() - 0.5) * 100;
      heart.style.setProperty("--sway", sway + "px");

      heartsContainer.appendChild(heart);

      // Remove heart after animation
      setTimeout(
        () => {
          heart.remove();
        },
        (duration + 5) * 1000,
      );
    }

    // Create initial hearts
    for (let i = 0; i < 15; i++) {
      setTimeout(createHeart, i * 400);
    }

    // Continue creating hearts
    setInterval(createHeart, 800);
  }

  // Initialize falling hearts after page load
  window.addEventListener("load", createFallingHearts);
})();

// RSVP Modal & Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const rsvpBtn = document.getElementById("rsvp-btn");
  const rsvpModal = document.getElementById("rsvp-modal");
  const closeBtn = document.querySelector(".modal-close");
  const rsvpForm = document.getElementById("rsvp-form");

  // Success Modal Elements
  const successModal = document.getElementById("success-modal");
  const successMessage = document.getElementById("success-message");
  const successCloseBtn = document.getElementById("success-close-btn");

  // Show success notification
  function showSuccessNotification(message) {
    successMessage.textContent = message;
    successModal.classList.add("active");
    // Prevent body scroll on mobile and desktop
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${window.scrollY}px`;
  }

  // Close success modal
  function closeSuccessModal() {
    const scrollY = document.body.style.top;
    successModal.classList.remove("active");
    // Restore body scroll
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }

  if (successCloseBtn) {
    successCloseBtn.addEventListener("click", closeSuccessModal);
  }

  if (successModal) {
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) {
        closeSuccessModal();
      }
    });
  }

  // QUAN TRỌNG: Link bên dưới ĐANG SAI (Link Library).
  // Bạn cần link Web App có đuôi là "/exec" và có chữ "/s/" ở giữa.
  // Ví dụ đúng: https://script.google.com/macros/s/AKfycb.../exec
  // Hãy làm theo hướng dẫn trong file GET_CORRECT_URL.md vừa được tạo.
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzWpllAFssVMMFGTbG3jMrx_z80-EMn_b4LAP-yDISNDRdlXA3CThH9dbCRXCHmsMnd/exec";

  if (rsvpBtn) {
    rsvpBtn.addEventListener("click", () => {
      rsvpModal.classList.add("active");
      // Prevent body scroll on mobile and desktop
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    });
  }

  function closeModal() {
    const scrollY = document.body.style.top;
    rsvpModal.classList.remove("active");
    // Restore body scroll
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close on outside click
  if (rsvpModal) {
    rsvpModal.addEventListener("click", (e) => {
      if (e.target === rsvpModal) {
        closeModal();
      }
    });
  }

  // Toggle guest count visibility based on attendance
  const attendanceRadios = document.querySelectorAll(
    'input[name="attendance"]',
  );
  const guestCountGroup = document.getElementById("guest-count-group");

  function toggleGuestCount() {
    const attendance = document.querySelector(
      'input[name="attendance"]:checked',
    ).value;
    if (attendance === "Tham dự") {
      guestCountGroup.classList.remove("hidden");
    } else {
      guestCountGroup.classList.add("hidden");
    }
  }

  attendanceRadios.forEach((radio) => {
    radio.addEventListener("change", toggleGuestCount);
  });

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;

      submitBtn.disabled = true;
      submitBtn.innerText = "Đang gửi...";

      const name = document.getElementById("guest-name").value;
      const attendance = document.querySelector(
        'input[name="attendance"]:checked',
      ).value;
      const guestCount = document.getElementById("guest-count").value;
      const message = document.getElementById("guest-message").value;

      const params = new URLSearchParams();
      params.append("name", name);
      params.append("attendance", attendance);
      params.append("guestCount", attendance === "Tham dự" ? guestCount : "0");
      params.append("message", message);
      params.append("timestamp", new Date().toLocaleString());

      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      })
        .then((response) => {
          closeModal();
          rsvpForm.reset();
          toggleGuestCount();
          showSuccessNotification(`Xin cảm ơn!`);
        })
        .catch((error) => {
          console.error("Error:", error);
          showSuccessNotification(
            "Có lỗi xảy ra. Bạn vui lòng thử lại sau nhé!",
          );
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
        });
    });
  }
});
