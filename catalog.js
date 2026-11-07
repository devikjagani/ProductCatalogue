const $ = (s) => document.querySelector(s);
const cfg = window.SITE_CONFIG || {};
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
}[c]));

function setBrandAndFooter() {
  const name = cfg.companyName || "YOUR COMPANY";
  document.title = `${name} | Product Catalog`;
  $("#brandName").textContent = name;
  $("#footerCompany").textContent = name;
  $("#copyrightCompany").textContent = name;
  $("#year").textContent = new Date().getFullYear();

  const logo = cfg.logo || "";
  if (logo) {
    $("#brandLogo").src = logo;
    $("#brandLogo").classList.remove("hidden");
    $("#brandLogo").onerror = () => $("#brandLogo").classList.add("hidden");
  }

  $("#footerAddress").textContent = cfg.address || "";
  const phone = cfg.phoneDisplay || "Add your mobile number";
  $("#footerPhone").textContent = `Mobile: ${phone}`;
  $("#footerPhone").href = cfg.phoneDigits ? `tel:+${cfg.phoneDigits}` : "#";
  $("#footerEmail").textContent = `Email: ${cfg.email || "Add your email"}`;
  $("#footerEmail").href = cfg.email ? `mailto:${cfg.email}` : "#";
}

let activeProduct = null;
let activePhoto = 0;
let startX = 0;

function renderProducts() {
  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const grid = $("#productGrid");
  grid.innerHTML = products.map((p, index) => {
    const photos = Array.isArray(p.photos) ? p.photos : [];
    const image = photos[0]
      ? `<img src="${escapeHTML(photos[0])}" alt="${escapeHTML(p.name)}" loading="lazy">`
      : `<span class="no-image-mark">◇</span>`;
    return `<article class="product-card" data-index="${index}" tabindex="0" role="button" aria-label="View ${escapeHTML(p.name)}">
      <div class="product-image">${image}</div>
      <div class="product-info">
        <h2>${escapeHTML(p.name)}</h2>
        <span class="product-code">CODE: ${escapeHTML(p.code)}</span>
        ${photos.length > 1 ? `<span class="photo-hint">${photos.length} photos · Tap to view</span>` : ""}
      </div>
    </article>`;
  }).join("");

  $("#emptyState").classList.toggle("hidden", products.length > 0);
  grid.classList.toggle("hidden", products.length === 0);
  grid.querySelectorAll(".product-card").forEach(card => {
    const open = () => openGallery(products[Number(card.dataset.index)]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
}

function openGallery(product) {
  if (!product || !Array.isArray(product.photos) || product.photos.length === 0) return;
  activeProduct = product;
  activePhoto = 0;
  updateGallery();
  $("#gallery").classList.remove("hidden");
  document.body.classList.add("no-scroll");
}
function closeGallery() {
  $("#gallery").classList.add("hidden");
  document.body.classList.remove("no-scroll");
}
function updateGallery() {
  const photos = activeProduct.photos;
  $("#galleryImage").src = photos[activePhoto];
  $("#galleryImage").alt = `${activeProduct.name} photo ${activePhoto + 1}`;
  $("#galleryName").textContent = activeProduct.name;
  $("#galleryCode").textContent = `CODE: ${activeProduct.code}`;
  $("#galleryDots").innerHTML = photos.map((_, i) => `<span class="gallery-dot ${i === activePhoto ? "active" : ""}"></span>`).join("");
  const showArrows = photos.length > 1;
  $("#prevPhoto").classList.toggle("hidden", !showArrows);
  $("#nextPhoto").classList.toggle("hidden", !showArrows);
}
function movePhoto(direction) {
  if (!activeProduct) return;
  activePhoto = (activePhoto + direction + activeProduct.photos.length) % activeProduct.photos.length;
  updateGallery();
}
$("#closeGallery").addEventListener("click", closeGallery);
$("#prevPhoto").addEventListener("click", () => movePhoto(-1));
$("#nextPhoto").addEventListener("click", () => movePhoto(1));
$("#gallery").addEventListener("click", e => { if (e.target.id === "gallery") closeGallery(); });
document.addEventListener("keydown", e => {
  if ($("#gallery").classList.contains("hidden")) return;
  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowLeft") movePhoto(-1);
  if (e.key === "ArrowRight") movePhoto(1);
});
$("#gallery").addEventListener("touchstart", e => { startX = e.changedTouches[0].screenX; }, {passive:true});
$("#gallery").addEventListener("touchend", e => {
  const delta = e.changedTouches[0].screenX - startX;
  if (Math.abs(delta) > 45) movePhoto(delta < 0 ? 1 : -1);
}, {passive:true});

setBrandAndFooter();
renderProducts();
