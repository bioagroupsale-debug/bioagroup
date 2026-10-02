class Modal {
  check(id) {
    if (!id) {
      console.log("modalId not found");
      return;
    }

    const modalEl = document.getElementById(id);
    if (modalEl) {
      return modalEl;
    } else {
      console.log("modalEl not found");
      return undefined;
    }
  }

  open(id) {
    const modalEl = this.check(id);
    if (!modalEl) return;

    const openModals = document.querySelectorAll(".modal.open");
    openModals.forEach((modal) => {
      this.close(modal.id);
    });

    modalEl.style.display = "block";
    setTimeout(() => {
      modalEl.classList.add("open");
    }, 100);
  }

  close(id) {
    const modalEl = this.check(id);
    if (!modalEl) return;
    modalEl.classList.remove("open");
    setTimeout(() => {
      modalEl.style.display = "none";
    }, 500);
  }

  listen() {
    window.addEventListener("click", (e) => {
      const openEl = e.target.closest("[modal]");
      if (openEl) {
        const modalId = openEl.getAttribute("modal");
        this.open(modalId);
        return;
      }

      const closeEl = e.target.closest(".modal__close");
      if (closeEl) {
        const modalEl = closeEl.closest(".modal");
        this.close(modalEl.id);
        return;
      }

      const shadowEl = e.target.closest(".modal__shadow");
      if (shadowEl) {
        const modalEl = shadowEl.closest(".modal");
        this.close(modalEl.id);
        return;
      }
    });
  }
}

window.Modal = Modal;
