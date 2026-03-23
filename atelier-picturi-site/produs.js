(() => {
  const container = document.getElementById("product");
  const titleEl = document.getElementById("product-title");
  const tagEl = document.getElementById("product-tag");
  const summaryEl = document.getElementById("product-summary");
  const imageEl = document.getElementById("product-image");
  const thumbsEl = document.getElementById("product-thumbs");
  const techniqueEl = document.getElementById("product-technique");
  const sizeEl = document.getElementById("product-size");
  const availabilityEl = document.getElementById("product-availability");
  const descriptionEl = document.getElementById("product-description");
  const notFoundEl = document.getElementById("product-not-found");
  const detailsSection = document.querySelector(".product-details");

  const params = new URLSearchParams(window.location.search);
  const id = (params.get("id") || "").trim();
  const produse = Array.isArray(window.PRODUSE) ? window.PRODUSE : [];
  const produs = produse.find((p) => p.id === id);

  if (!produs) {
    if (container) container.hidden = true;
    if (detailsSection) detailsSection.hidden = true;
    if (notFoundEl) notFoundEl.hidden = false;
    return;
  }

  document.title = `${produs.titlu} | Atelier de Pictură`;

  if (titleEl) titleEl.textContent = produs.titlu;
  if (tagEl) tagEl.textContent = produs.tag;
  if (summaryEl) summaryEl.textContent = produs.rezumat;
  if (techniqueEl) techniqueEl.textContent = produs.tehnica;
  if (sizeEl) sizeEl.textContent = produs.dimensiuni;
  if (availabilityEl) availabilityEl.textContent = produs.disponibilitate;
  if (descriptionEl) descriptionEl.textContent = produs.descriere;

  const imagini = Array.isArray(produs.imagini) && produs.imagini.length ? produs.imagini : [produs.imagine].filter(Boolean);

  if (imageEl && imagini.length) {
    const setMainImage = (src, index) => {
      imageEl.src = src;
      imageEl.alt = `Imaginea ${index + 1} pentru lucrarea ${produs.titlu}`;

      if (!thumbsEl) return;
      const buttons = Array.from(thumbsEl.querySelectorAll("button"));
      buttons.forEach((btn, btnIndex) => {
        const isActive = btnIndex === index;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };

    setMainImage(imagini[0], 0);

    if (thumbsEl) {
      if (imagini.length < 2) {
        thumbsEl.hidden = true;
      } else {
        thumbsEl.hidden = false;
        thumbsEl.innerHTML = "";

        imagini.forEach((src, index) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "product-thumb";
          btn.setAttribute("aria-label", `Vezi imaginea ${index + 1}`);
          btn.setAttribute("aria-current", index === 0 ? "true" : "false");

          const img = document.createElement("img");
          img.src = src;
          img.alt = `Miniatură ${index + 1} pentru ${produs.titlu}`;
          img.loading = "lazy";

          btn.appendChild(img);
          btn.addEventListener("click", () => setMainImage(src, index));
          thumbsEl.appendChild(btn);
        });

        // Mark first as active initially.
        const first = thumbsEl.querySelector("button");
        if (first) first.classList.add("is-active");
      }
    }
  }
})();
