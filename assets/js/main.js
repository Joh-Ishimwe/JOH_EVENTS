/* =========================================================
   JOH EVENTS — shared JavaScript
   - Builds the header and footer once, so you edit them in ONE place
   - Mobile menu
   - Portfolio filters
   - Contact form (with timeout, retry and clear error messages)
   ========================================================= */

/* ---------- Site settings ----------
   The real values live in content/settings.json (edited in the admin).
   These are only fallbacks if that file can't be loaded. */
const SITE = {
  phone: "",
  whatsapp: "",
  email: "",
  instagram: "#",
  tiktok: "#",
  location: "Kigali, Rwanda",
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};

const SITE_URL = "https://johevents.rw";

const NAV = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "services.html", label: "Services", key: "services" },
  { href: "portfolio.html", label: "Portfolio", key: "portfolio" },
  { href: "about.html", label: "About", key: "about" },
  // { href: "blog.html", label: "Journal", key: "blog" }, // hidden for now, re-enable when articles are ready
  { href: "contact.html", label: "Contact", key: "contact" },
];

const ICONS = {
  instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 8.5c.3 2.6 2.4 5 5.5 6l1.3-1.3-2-1-1 .8c-1-.5-2-1.5-2.4-2.4l.8-1-1-2z"/></svg>',
  email: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3.5 6l8.5 7 8.5-7"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M5 3.5h3.5l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>',
};

const SPRIG = '<svg viewBox="0 0 100 160" fill="none" stroke-width="1.2"><path d="M50 158C48 110 55 60 78 8"/><path d="M53 120c-14-4-24-14-26-28 12 3 22 12 26 28zM56 92c10-8 22-10 32-6-8 9-20 11-32 6zM60 66c-12-6-18-16-17-28 10 6 16 16 17 28zM67 42c8-8 18-11 27-9-6 9-16 12-27 9z"/></svg>';

/* ---------- Header ---------- */
function renderHeader() {
  const slot = document.getElementById("site-header");
  if (!slot) return;
  const current = document.body.dataset.page;
  const links = NAV.map(
    (n) => `<li><a href="${n.href}"${n.key === current ? ' aria-current="page"' : ""}>${n.label}</a></li>`
  ).join("");

  slot.outerHTML = `
  <header class="site-header">
    <div class="container">
      <div class="brand">
        <a href="index.html" class="logo" aria-label="JOH Events home">
          <img src="assets/images/logo-primary.png" alt="JOH Events">
        </a>
        <span class="brand__tag">Weddings · Events · Coordination</span>
      </div>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav" id="main-nav" aria-label="Main">
        <ul class="nav__links">${links}</ul>
        <a href="contact.html" class="btn">Book a Consultation</a>
      </nav>
    </div>
  </header>`;
}

/* ---------- Footer ---------- */
function renderFooter() {
  const slot = document.getElementById("site-footer");
  if (!slot) return;
  const links = NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("");
  slot.outerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo"><img src="assets/images/logo-primary.png" alt="JOH Events"></a>
          <small>Weddings · Events · Coordination</small>
        </div>
        <div class="footer-col"><h4>Explore</h4><ul>${links}</ul></div>
        <div class="footer-col"><h4>Connect</h4>
          <ul class="footer-social">
            <li>${ICONS.instagram}<a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></li>
            <li>${ICONS.tiktok}<a href="${SITE.tiktok}" target="_blank" rel="noopener">TikTok</a></li>
            <li>${ICONS.whatsapp}<a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
            <li>${ICONS.email}<a href="mailto:${SITE.email}">Email</a></li>
          </ul>
        </div>
        <div class="footer-col"><h4>Based in ${SITE.location}</h4>
          <p class="footer-sign">Let's create something meaningful together.</p>
        </div>
      </div>
      <p class="footer-bottom">© ${new Date().getFullYear()} JOH EVENTS. All rights reserved.</p>
    </div>
  </footer>`;
}

/* ---------- Decorative sprigs on CTA bands ---------- */
function decorateCtaBands() {
  document.querySelectorAll(".cta-band").forEach((band) => {
    band.insertAdjacentHTML("afterbegin",
      `<span class="cta-band__sprig cta-band__sprig--l" aria-hidden="true">${SPRIG}</span>` +
      `<span class="cta-band__sprig cta-band__sprig--r" aria-hidden="true">${SPRIG}</span>`);
  });
}

/* ---------- Fill contact details wherever [data-site] appears ---------- */
function fillSiteDetails() {
  document.querySelectorAll("[data-site]").forEach((el) => {
    const key = el.dataset.site;
    if (SITE[key]) el.textContent = SITE[key];
  });
  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = ICONS[el.dataset.icon] || "";
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach((a) => (a.href = `https://wa.me/${SITE.whatsapp}`));
  document.querySelectorAll("[data-email-link]").forEach((a) => (a.href = `mailto:${SITE.email}`));
  document.querySelectorAll("[data-instagram-link]").forEach((a) => (a.href = SITE.instagram));
  document.querySelectorAll("[data-tiktok-link]").forEach((a) => (a.href = SITE.tiktok));
}

/* ---------- Structured data (helps Google understand who we are) ---------- */
function injectStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "JOH EVENTS",
    image: `${SITE_URL}/assets/images/og-image.jpg`,
    url: SITE_URL,
    telephone: SITE.phone,
    email: SITE.email,
    address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
    areaServed: "Kigali, Rwanda",
    sameAs: [SITE.instagram, SITE.tiktok].filter((u) => u && u !== "#"),
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/* ---------- Mobile menu ---------- */
function initMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    nav.classList.toggle("is-open", !open);
  });
}

/* ---------- Portfolio filters ---------- */
function initFilters() {
  const buttons = document.querySelectorAll(".filter");
  const items = document.querySelectorAll("[data-category]");
  if (!buttons.length) return;
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const f = btn.dataset.filter;
      items.forEach((it) => (it.hidden = f !== "all" && it.dataset.category !== f));
    })
  );
}

/* ---------- Project page tabs: highlight the section you're reading ---------- */
function initTabs() {
  const tabs = document.querySelectorAll(".tabs a");
  if (!tabs.length || !("IntersectionObserver" in window)) return;
  const map = new Map([...tabs].map((t) => [t.getAttribute("href").slice(1), t]));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        tabs.forEach((t) => t.classList.remove("is-active"));
        map.get(e.target.id)?.classList.add("is-active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) obs.observe(s); });
}

/* =========================================================
   Contact form — production-style sending
   - timeout: give up on a request after 10 seconds
   - retry with backoff: try again after 1s, then 2s, then 4s
   - only retry "temporary" problems (no internet, timeout, 5xx, 429)
   - never retry "permanent" problems (400/404/422 = bad data or bad URL)
   ========================================================= */
const log = (level, event, details = {}) =>
  console[level](JSON.stringify({ time: new Date().toISOString(), level, event, ...details }));

class PermanentError extends Error {}
class TransientError extends Error {}

async function fetchWithTimeout(url, options, timeoutMs = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (err) {
    // AbortError = our timeout fired; TypeError = network down / DNS failed
    throw new TransientError(err.name === "AbortError" ? "timeout" : "network");
  } finally {
    clearTimeout(timer);
  }
}

async function sendWithRetry(url, options, { retries = 3, baseDelay = 1000 } = {}) {
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const res = await fetchWithTimeout(url, options);
      if (res.ok) return res;
      if (res.status >= 500 || res.status === 429) throw new TransientError(`http_${res.status}`);
      throw new PermanentError(`http_${res.status}`);
    } catch (err) {
      const transient = err instanceof TransientError;
      log("warn", "form_send_failed", { attempt, reason: err.message, willRetry: transient && attempt <= retries });
      if (!transient || attempt > retries) throw err;
      const wait = baseDelay * 2 ** (attempt - 1) + Math.random() * 250; // jitter
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

function validate(form) {
  let ok = true;
  form.querySelectorAll("[required]").forEach((input) => {
    const field = input.closest(".field");
    let valid = input.value.trim() !== "";
    if (valid && input.type === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    field.classList.toggle("has-error", !valid);
    if (!valid) ok = false;
  });
  return ok;
}

/* ---------- Confirmation modal (shown after a successful form send) ---------- */
function ensureConfirmModal() {
  let modal = document.getElementById("confirm-modal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.id = "confirm-modal";
  modal.className = "modal-overlay";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
      <button type="button" class="modal__close" aria-label="Close">&times;</button>
      <svg class="modal__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l2.5 2.5L16 9"/></svg>
      <h3 id="confirm-modal-title">Message sent</h3>
      <p class="modal__text"></p>
      <button type="button" class="btn modal__ok">Done</button>
    </div>`;
  document.body.appendChild(modal);
  const close = () => { modal.hidden = true; };
  modal.querySelector(".modal__close").addEventListener("click", close);
  modal.querySelector(".modal__ok").addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });
  return modal;
}

function showConfirmationModal(message) {
  const modal = ensureConfirmModal();
  modal.querySelector(".modal__text").textContent = message;
  modal.hidden = false;
  modal.querySelector(".modal__close").focus();
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = form.querySelector(".form-status");
  const button = form.querySelector("button[type=submit]");

  const show = (type, msg) => {
    status.className = `form-status is-${type}`;
    status.textContent = msg;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.querySelector(".hp input").value) return; // spam bot filled the hidden field
    if (!validate(form)) { show("error", "Check the highlighted fields and try again."); return; }

    if (SITE.formEndpoint.includes("YOUR_FORM_ID")) {
      show("error", "The form isn't connected yet. Add your Formspree ID in assets/js/main.js.");
      log("error", "form_not_configured");
      return;
    }

    button.disabled = true;
    const original = button.textContent;
    button.textContent = "Sending…";

    try {
      await sendWithRetry(SITE.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      form.reset();
      show("success", "Message sent. We'll reply within two working days.");
      showConfirmationModal("Thank you! Your message has been sent. We'll reply within two working days.");
      log("info", "form_sent");
    } catch (err) {
      const msg = err instanceof PermanentError
        ? "The message couldn't be sent. Check your details, or email us directly."
        : "Can't reach the server right now. Check your connection, or message us on WhatsApp.";
      show("error", msg);
      log("error", "form_send_gave_up", { reason: err.message });
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  });

  form.querySelectorAll("input, textarea").forEach((el) =>
    el.addEventListener("input", () => el.closest(".field")?.classList.remove("has-error"))
  );
}

/* =========================================================
   Content loading (data files edited in the admin)
   ========================================================= */
async function loadContent(name) {
  try {
    const res = await sendWithRetry(`/content/${name}.json`, { headers: { Accept: "application/json" } }, { retries: 2 });
    return await res.json();
  } catch (err) {
    log("error", "content_load_failed", { file: name, reason: err.message });
    return null; // the page shows a friendly message instead of crashing
  }
}

// Make text safe to put inside HTML (stops a stray "<" breaking the page)
const esc = (v = "") => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Photo box: shows the photo if there is one, otherwise the labelled placeholder
const media = (src, label, cls = "") =>
  `<div class="media ${cls}" data-label="${esc(label)}">${src ? `<img src="${esc(src)}" alt="${esc(label)}" loading="lazy" onerror="this.remove()">` : ""}</div>`;

// Render a list so that one broken entry is skipped, not fatal
function renderEach(items, fn, what) {
  return (items || []).map((item, i) => {
    try { return fn(item); }
    catch (err) { log("warn", "record_skipped", { what, index: i, reason: err.message }); return ""; }
  }).join("");
}

const emptyState = (msg, link = "") => `<p class="empty">${msg} ${link}</p>`;

/* ---------- Testimonials ---------- */
async function renderTestimonials() {
  const slot = document.getElementById("testimonials");
  if (!slot) return;
  const data = await loadContent("testimonials");
  let items = data?.items || [];
  if (slot.dataset.homeOnly !== undefined) items = items.filter((t) => t.show_on_home !== false);
  if (!items.length) { slot.closest("section")?.remove(); return; }
  slot.innerHTML = renderEach(items.slice(0, 6), (t) => {
    if (!t.quote || !t.name) throw new Error("missing quote or name");
    return `<figure class="testimonial">
      <blockquote>${esc(t.quote)}</blockquote>
      <figcaption>
        ${t.photo ? `<img class="testimonial__photo" src="${esc(t.photo)}" alt="" onerror="this.remove()">` : ""}
        <span><strong>${esc(t.name)}</strong>${t.event ? `<small>${esc(t.event)}</small>` : ""}</span>
      </figcaption>
    </figure>`;
  }, "testimonial");
}

/* ---------- Portfolio ---------- */
const projectLink = (p) => `project.html?slug=${encodeURIComponent(p.slug)}`;

async function renderPortfolio() {
  const grid = document.getElementById("project-grid");
  const featured = document.getElementById("featured-project");
  if (!grid && !featured) return;
  const data = await loadContent("projects");
  const items = (data?.items || []).filter((p) => p.slug && p.title);

  if (grid) {
    grid.innerHTML = items.length
      ? renderEach(items, (p) => `<article class="project-card" data-category="${esc(p.category)}">
          <a href="${projectLink(p)}">${media(p.cover, p.title)}</a>
          <h3>${esc(p.title)}</h3><p class="meta">${esc(p.type_label)}${p.location ? ` · ${esc(p.location)}` : ""}</p>
          <a href="${projectLink(p)}" class="link-arrow">View project →</a>
        </article>`, "project")
      : emptyState("Projects can't be shown right now.", '<a class="link-arrow" href="contact.html">Contact us →</a>');
    initFilters();
  }

  if (featured) {
    const p = items.find((x) => x.featured) || items[0];
    if (!p) { featured.closest("section")?.remove(); return; }
    const g = p.gallery || [];
    featured.innerHTML = `
      ${media(p.cover, p.title, "featured__main")}
      <div class="featured__info">
        <span class="eyebrow">${esc(p.type_label)}</span>
        <h3>${esc(p.title)}</h3>
        <p class="meta">${esc(p.location)}</p>
        <p class="tags">${esc(p.services)}</p>
        <div><a href="${projectLink(p)}" class="btn btn--outline">View Project</a></div>
      </div>
      <div class="featured__stack">${[0, 1, 2].map((i) => media(g[i], `${p.title} photo ${i + 1}`)).join("")}</div>`;
  }
}

async function renderProjectPage() {
  const slot = document.getElementById("project");
  if (!slot) return;
  const slug = new URLSearchParams(location.search).get("slug");
  const data = await loadContent("projects");
  const p = (data?.items || []).find((x) => x.slug === slug);
  if (!p) {
    slot.innerHTML = `<section class="section"><div class="container">${emptyState("This project isn't available.", '<a class="link-arrow" href="portfolio.html">View all projects →</a>')}</div></section>`;
    return;
  }
  document.title = `${p.title} | JOH EVENTS`;
  document.getElementById("canonical-link")?.setAttribute("href", `${SITE_URL}/project.html?slug=${encodeURIComponent(p.slug)}`);
  const list = (p.elements || []).map((e) => `<li>${esc(e)}</li>`).join("");
  slot.innerHTML = `
  <section class="page-hero">${media(p.cover, p.title)}
    <div class="container"><h1>${esc(p.title)}</h1><p>${esc(p.type_label)}${p.location ? ` · ${esc(p.location)}` : ""}</p></div>
  </section>
  <section class="section">
    <div class="container split" style="align-items:start">
      <div>
        <h2>The vision</h2><p>${esc(p.vision)}</p>
        ${list ? `<h3 style="margin:32px 0 6px">Key elements</h3><ul class="dotlist">${list}</ul>` : ""}
        ${p.coordination ? `<h3 style="margin:32px 0 6px">How we coordinated it</h3><p>${esc(p.coordination)}</p>` : ""}
      </div>
      <div>
        ${media((p.gallery || [])[0] || p.cover, `${p.title} detail`, "media--tall")}
        ${p.quote ? `<blockquote class="quote">${esc(p.quote)}<cite>JOH EVENTS</cite></blockquote>` : ""}
      </div>
    </div>
  </section>
  ${(p.gallery || []).length ? `<section class="section" style="padding-top:0"><div class="container grid-3">${p.gallery.map((g, i) => media(g, `${p.title} gallery ${i + 1}`, "media--tall")).join("")}</div></section>` : ""}`;
}

/* ---------- Journal ---------- */
const formatDate = (d) => { const t = new Date(d); return isNaN(t) ? "" : t.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); };

async function renderPosts() {
  const grid = document.getElementById("post-grid");
  if (!grid) return;
  const data = await loadContent("posts");
  const items = (data?.items || []).filter((p) => p.slug && p.title).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  grid.innerHTML = items.length
    ? renderEach(items, (p) => `<article class="card post-card">${media(p.cover, p.title)}
        <div class="card__body"><p class="date">${esc(p.category)}${p.date ? ` · ${formatDate(p.date)}` : ""}</p>
        <h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p>
        <a href="post.html?slug=${encodeURIComponent(p.slug)}" class="link-arrow">Read article →</a></div></article>`, "post")
    : emptyState("New articles are coming soon.");
}

async function renderPostPage() {
  const slot = document.getElementById("post");
  if (!slot) return;
  const slug = new URLSearchParams(location.search).get("slug");
  const data = await loadContent("posts");
  const p = (data?.items || []).find((x) => x.slug === slug);
  if (!p) {
    slot.innerHTML = `<section class="section"><div class="container">${emptyState("This article isn't available.", '<a class="link-arrow" href="blog.html">Back to the journal →</a>')}</div></section>`;
    return;
  }
  document.title = `${p.title} | JOH EVENTS`;
  document.getElementById("canonical-link")?.setAttribute("href", `${SITE_URL}/post.html?slug=${encodeURIComponent(p.slug)}`);
  // marked turns the admin's formatted text (markdown) into HTML; plain paragraphs if it didn't load
  const body = window.marked ? window.marked.parse(p.body || "") : (p.body || "").split(/\n{2,}/).map((x) => `<p>${esc(x)}</p>`).join("");
  slot.innerHTML = `
  <section class="page-hero">${media(p.cover, p.title)}
    <div class="container"><h1>${esc(p.title)}</h1><p>${esc(p.category)}${p.date ? ` · ${formatDate(p.date)}` : ""}</p></div>
  </section>
  <section class="section"><div class="container"><article class="prose">${body}</article>
    <p style="margin-top:48px"><a class="link-arrow" href="blog.html">← Back to the journal</a></p></div></section>`;
}

/* ---------- Start ---------- */
async function boot() {
  renderHeader();
  initMenu();
  const settings = await loadContent("settings");
  if (settings) {
    Object.assign(SITE, {
      phone: settings.phone || SITE.phone,
      whatsapp: String(settings.whatsapp || "").replace(/\D/g, ""),
      email: settings.email || SITE.email,
      instagram: settings.instagram || SITE.instagram,
      tiktok: settings.tiktok || SITE.tiktok,
      location: settings.location || SITE.location,
      formEndpoint: settings.form_endpoint || SITE.formEndpoint,
    });
  }
  renderFooter();
  decorateCtaBands();
  fillSiteDetails();
  injectStructuredData();
  initContactForm();
  initTabs();
  // Independent sections load in parallel; one failing doesn't stop the others
  await Promise.allSettled([renderTestimonials(), renderPortfolio(), renderProjectPage(), renderPosts(), renderPostPage()]);
}
boot();
