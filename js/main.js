/* ============================================================
   main.js — Neubrutalism Portfolio 2026
   Handles: year, scroll progress, reveal observer, mobile menu,
            certificate modal, active nav, focus ticker, card hover nudge
   ============================================================ */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Year ───────────────────────────────────────────────── */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ── Scroll Progress Bar ───────────────────────────────── */
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress && !prefersReducedMotion) {
        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                    scrollProgress.style.width = progress + '%';
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* ── Scroll Reveal ─────────────────────────────────────── */
    const revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        revealItems.forEach(function (el) { obs.observe(el); });
    } else {
        revealItems.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ── Mobile Menu ───────────────────────────────────────── */
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        const isOpen = menuBtn.classList.toggle('is-open');
        mobileNav.classList.toggle('is-open');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        mobileNav.setAttribute('aria-hidden', String(!isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', toggleMenu);
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', toggleMenu);
        });
    }

    /* ── Certificate Modal ─────────────────────────────────── */
    /* Strategy:
       - Small viewports / in-app WebViews (Instagram, FB, etc.) can't render
         inline <iframe src="xxx.pdf"> reliably. We show the webp thumbnail
         preview instead, and expose a prominent "Open PDF ↗" link that opens
         the file in a new tab via the native PDF viewer/browser. */
    const modal = document.getElementById('certModal');
    const frame = document.getElementById('certFrame');
    const image = document.getElementById('certImage');
    const titleEl = document.getElementById('certTitle');
    const openLink = document.getElementById('certOpen');
    const closeBtn = document.getElementById('certClose');
    const backdrop = document.getElementById('certBackdrop');

    const ua = navigator.userAgent || '';
    const isInAppBrowser = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Line|TikTok|Twitter/i.test(ua);
    const isNarrow = window.matchMedia('(max-width: 900px)').matches;
    const useImageFallback = isInAppBrowser || isNarrow;

    function openCert(pdfSrc, name, imgSrc) {
        if (!modal || !titleEl) return;
        titleEl.textContent = name;
        if (openLink) openLink.href = pdfSrc;

        if (useImageFallback && imgSrc && image && frame) {
            image.src = imgSrc;
            image.style.display = 'block';
            frame.style.display = 'none';
            frame.src = '';
        } else if (frame) {
            frame.src = pdfSrc;
            frame.style.display = 'block';
            if (image) {
                image.style.display = 'none';
                image.src = '';
            }
        }

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCert() {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(function () {
            if (frame) frame.src = '';
            if (image) image.src = '';
        }, 300);
    }

    document.querySelectorAll('[data-cert]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const src = btn.getAttribute('data-cert');
            const name = btn.getAttribute('data-cert-name') || btn.textContent.trim();
            const imgSrc = btn.getAttribute('data-cert-img') || '';
            openCert(src, name, imgSrc);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeCert);
    if (backdrop) backdrop.addEventListener('click', closeCert);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeCert();
    });

    /* ── Active Nav on Scroll ──────────────────────────────── */
    (function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.top-nav a');
        if (!sections.length || !navLinks.length) return;

        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    let current = '';
                    sections.forEach(function (section) {
                        const sectionTop = section.offsetTop - 140;
                        if (window.scrollY >= sectionTop) {
                            current = section.getAttribute('id');
                        }
                    });
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + current) {
                            link.classList.add('active');
                        }
                    });
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    })();

    /* ── Card hover nudge (playful neubrutalism) ───────────── */
    if (!prefersReducedMotion && window.matchMedia('(min-width: 768px)').matches) {
        const nudgeCards = document.querySelectorAll('.service-item, .portfolio-item, .timeline-card');
        nudgeCards.forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                const rx = (Math.random() * 2 - 1).toFixed(2);
                const ry = (Math.random() * 2 - 1).toFixed(2);
                card.style.setProperty('--nudge-x', rx + 'px');
                card.style.setProperty('--nudge-y', ry + 'px');
            });
        });
    }

    /* ── Focus Ticker ──────────────────────────────────────── */
    (function initTicker() {
        const ticker = document.getElementById('focusTicker');
        if (!ticker) return;

        const focuses = [
            'CYBERSECURITY',
            'DIGITAL FORENSICS',
            'AI / MACHINE LEARNING',
            'PYTHON & TENSORFLOW',
            'PENETRATION TESTING',
            'OSINT'
        ];
        let currentIndex = 0;
        ticker.style.transition = 'opacity 0.2s ease';

        setInterval(function () {
            ticker.style.opacity = '0';
            setTimeout(function () {
                currentIndex = (currentIndex + 1) % focuses.length;
                ticker.textContent = focuses[currentIndex];
                ticker.style.opacity = '1';
            }, 200);
        }, 3000);
    })();

})();
