const cfg = window.SITE_CONFIG || {};
const $ = s => document.querySelector(s);
const company = cfg.companyName || "YOUR COMPANY";
document.title = `${company} | Contact`;
$("#brandName").textContent = company;
$("#footerCompany").textContent = company;
$("#copyrightCompany").textContent = company;
$("#year").textContent = new Date().getFullYear();

if (cfg.logo) {
  $("#brandLogo").src = cfg.logo;
  $("#brandLogo").classList.remove("hidden");
  $("#brandLogo").onerror = () => $("#brandLogo").classList.add("hidden");
}
const phone = cfg.phoneDisplay || "Add your mobile number";
const digits = cfg.phoneDigits || "";
const email = cfg.email || "Add your email";
const address = cfg.address || "Add your complete business address";
const mapQuery = cfg.mapQuery || address;

$("#contactPerson").textContent = cfg.contactName || "Your contact name";
$("#contactPhone").textContent = phone;
$("#contactPhone").href = digits ? `tel:+${digits}` : "#";
$("#contactEmail").textContent = email;
$("#contactEmail").href = cfg.email ? `mailto:${cfg.email}` : "#";
$("#contactAddress").textContent = address;
$("#footerAddress").textContent = address;
$("#footerPhone").textContent = `Mobile: ${phone}`;
$("#footerPhone").href = digits ? `tel:+${digits}` : "#";
$("#footerEmail").textContent = `Email: ${email}`;
$("#footerEmail").href = cfg.email ? `mailto:${cfg.email}` : "#";

const encoded = encodeURIComponent(mapQuery);
$("#googleMap").src = `https://www.google.com/maps?q=${encoded}&output=embed`;
$("#mapOpenLink").href = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
$("#whatsappLink").href = digits ? `https://wa.me/${digits}` : "#";
if (!digits) $("#whatsappLink").classList.add("disabled");
