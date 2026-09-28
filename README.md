# JOH EVENTS website

A static website (plain HTML, CSS and JavaScript, with no server code) for JOH EVENTS.

## Folder layout

```
joh-events/
├── index.html                      Home
├── services.html                   All services
├── service-full-planning.html      Package detail page
├── portfolio.html                  Portfolio with filters
├── project.html                    Project page (fills itself from content/projects.json)
├── blog.html                       Journal list
├── post.html                       Article page (fills itself from content/posts.json)
├── about.html                      About JOH
├── contact.html                    Contact + form
├── robots.txt                      Tells search engines what to crawl
├── sitemap.xml                     List of pages for search engines
├── content/        The data the admin edits: testimonials, projects, posts, settings
├── admin/          The admin panel (Sveltia CMS) at yoursite/admin
└── assets/
    ├── css/styles.css   All styling. Brand colours and fonts are at the top.
    ├── js/main.js       Header, footer, menu, filters, contact form, SEO tags.
    └── images/          Put your photos here.
```

## Current status

Already set up and working:
- Real contact details in `content/settings.json`: phone, WhatsApp, Instagram, TikTok
- Contact form connected to Formspree (`form_endpoint` in `content/settings.json`) — messages arrive by email
- Admin panel connected to the `Joh-Ishimwe/joh-events` GitHub repo (`admin/config.yml`)
- `robots.txt`, `sitemap.xml`, canonical tags and structured data (JSON-LD) for search engines

Still needed before going live:
- **Photos** — none added yet, see below
- **Business email** — currently a personal Gmail (`jishimwe24@gmail.com`) as a placeholder in `content/settings.json`, since the `johevents.rw` domain isn't bought yet
- **Testimonials section** — removed from the home and about pages for now (only sample quotes existed). The admin field and `content/testimonials.json` are still there; add the section back to the pages once you have real client quotes to publish
- **Domain** — once bought, update `site_url`/`display_url` in `admin/config.yml`, and the hardcoded `https://johevents.rw` in `robots.txt`, `sitemap.xml`, and the `<link rel="canonical">` / `og:image` tags in every HTML file

## Adding your photos (no code changes needed)

Every grey box on the site is waiting for a photo with a specific file name.
Save your photo into `assets/images/` using that exact name, and it appears
automatically. Use `.jpg`, around 1600px wide, and compress it first
(for example at squoosh.app) so pages load fast.

Also add `favicon.png` (the small icon in the browser tab, 64×64)
and `og-image.jpg` (the preview picture when the link is shared, 1200×630).

Image file names:
- about-hero.jpg
- about-portrait.jpg
- blog-1.jpg
- blog-2.jpg
- blog-3.jpg
- blog-4.jpg
- blog-hero.jpg
- burgundy-arch.jpg
- burgundy-cake.jpg
- burgundy-flowers.jpg
- burgundy-table.jpg
- contact-hero.jpg
- gallery-1.jpg
- gallery-2.jpg
- gallery-3.jpg
- hero.jpg
- joh-portrait.jpg
- og-image.jpg
- p-burgundy.jpg
- p-corporate.jpg
- p-dinner.jpg
- p-modern.jpg
- package-1.jpg
- package-2.jpg
- package-3.jpg
- package-hero.jpg
- portfolio-cta.jpg
- portfolio-hero.jpg
- post-1.jpg
- post-2.jpg
- post-3.jpg
- project-detail.jpg
- project-hero.jpg
- service-coordination.jpg
- service-events.jpg
- service-wedding.jpg
- services-hero.jpg
- svc-coordination.jpg
- svc-events.jpg
- svc-full.jpg
- svc-partial.jpg

## Previewing on your computer

The pages load their content from `content/*.json`, and browsers block that
when you double-click a file. Run a tiny local server instead:

    cd joh-events
    python -m http.server 8000

Then open http://localhost:8000

## What the admin manages

Testimonials, portfolio projects, journal articles, and contact details
(phone, WhatsApp, email, Instagram, TikTok, form address). Photos uploaded in
the admin go to `assets/images/uploads/`.

Services, the About story and the home page wording stay in the HTML files,
because they rarely change.

## Setting up the admin

Already done for this repo (`Joh-Ishimwe/joh-events`) — kept here for reference
if you ever move the site to a different repo:

1. Put the folder on GitHub as a repository.
2. In `admin/config.yml`, set `backend.repo` to `your-username/your-repo`.
3. Connect the repository to Netlify (or Cloudflare Pages / Vercel) so every
   change on GitHub republishes the site.
4. Go to yoursite/admin and sign in. The simplest way is a GitHub
   "personal access token": GitHub → Settings → Developer settings →
   Fine-grained tokens → give it access to this one repository with
   "Contents: Read and write". Paste it into the admin's sign-in screen.
5. Edit, press Save. A minute later the change is live.

## Connecting the contact form

Already done — messages sent through the contact form go to
`jishimwe24@gmail.com` via Formspree. The real endpoint lives in
`content/settings.json` (`form_endpoint`), editable through the admin; the
value in `assets/js/main.js` is only a fallback used if that file fails to load.

To switch to a different Formspree account or form later:
1. Create/open your form at https://formspree.io.
2. Copy the form ID (looks like `xyzabcd`).
3. In the admin (or directly in `content/settings.json`), set
   `form_endpoint` to `https://formspree.io/f/xyzabcd`.

## SEO basics

- `robots.txt` allows search engines to crawl the site and points to the sitemap.
- `sitemap.xml` lists every static page plus each current portfolio project and
  journal post by slug. It's a static file — it won't update itself, so add new
  slugs there when you publish new projects or articles through the admin.
- Every page has a `<link rel="canonical">`; on `project.html` and `post.html`
  it's rewritten by `assets/js/main.js` to include the real `?slug=` once the
  content loads.
- `assets/js/main.js` injects `ProfessionalService` structured data (JSON-LD)
  built from `content/settings.json`, so it updates automatically when you
  edit contact details in the admin.

None of this makes the site show up in search overnight — that also needs a
live domain, a Google Business Profile, and real (non-placeholder) content.

## Going live

See the steps in the chat, or: drag this folder onto https://app.netlify.com/drop
