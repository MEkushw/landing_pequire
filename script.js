/* ============================================================
   PeQuire — Main Script
   ============================================================ */

// ─── Navbar Scroll Effect ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ─── Mobile Hamburger Menu ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
}

// ─── Scroll Reveal (IntersectionObserver) ───
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ─── Smooth Scroll for Anchor Links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ============================================================
   TESTIMONIALS — Card Deck Carousel
   ============================================================ */
const TESTIMONIALS = [
    {
        type: 'user', rating: 4,
        quote: '\u201cSaved me during a kitchen emergency. Plumber <span class="testi-hl">arrived in 20 mins.</span>\u201d',
        name: 'Sneha Mishra', loc: 'Kanpur', ini: 'SM'
    },
    {
        type: 'pro', rating: 5,
        quote: '\u201cThe platform connects me with genuine clients. I\'ve grown my bookings <span class="testi-hl">by 3x in 6 months.</span>\u201d',
        name: 'Ravi Kumar', loc: 'Delhi', ini: 'RK'
    },
    {
        type: 'user', rating: 5,
        quote: '\u201cBooked an electrician in minutes. Pricing was <span class="testi-hl">completely transparent.</span>\u201d',
        name: 'Priya Sharma', loc: 'Mumbai', ini: 'PS'
    },
    {
        type: 'pro', rating: 5,
        quote: '\u201cBest platform for freelancers. Payments arrive fast and support is <span class="testi-hl">always available.</span>\u201d',
        name: 'Arjun Mehta', loc: 'Pune', ini: 'AM'
    },
    {
        type: 'user', rating: 4,
        quote: '\u201cWas skeptical at first but the carpenter fixed my wardrobe perfectly. <span class="testi-hl">Will definitely reuse!</span>\u201d',
        name: 'Divya Nair', loc: 'Bengaluru', ini: 'DN'
    },
    {
        type: 'pro', rating: 5,
        quote: '\u201cAs an AC technician I struggled offline. This app gave me <span class="testi-hl">a steady stream of jobs.</span>\u201d',
        name: 'Suresh Patel', loc: 'Ahmedabad', ini: 'SP'
    }
];

let testiCur = 0;
let testiAnim = false;

// ─── Build Mosaic Tiles ───
const tileGridEl = document.getElementById('tileGrid');
if (tileGridEl) {
    const tileDefs = [
        { c: 1, r: '1/3', cl: 'light' }, { c: 2, r: '1', cl: 'light' }, { c: 2, r: '2/4', cl: 'dark' },
        { c: 3, r: '1/3', cl: 'light' }, { c: 3, r: '3/5', cl: 'dark' }, { c: 4, r: '1', cl: 'light' },
        { c: 4, r: '2/4', cl: 'dark' }, { c: 5, r: '1/4', cl: 'light' }, { c: 5, r: '4/6', cl: 'dark' },
        { c: 6, r: '1/3', cl: 'light' }, { c: 6, r: '3/5', cl: 'dark' }, { c: 7, r: '1', cl: 'light' },
        { c: 7, r: '2/4', cl: 'dark' }, { c: 8, r: '1/3', cl: 'light' }, { c: 8, r: '3', cl: 'dark' },
        { c: 8, r: '4/6', cl: 'dark' }, { c: 9, r: '1', cl: 'light' }, { c: 9, r: '2/4', cl: 'light' },
        { c: 9, r: '4/6', cl: 'dark' }, { c: 10, r: '1/3', cl: 'light' }, { c: 10, r: '3/5', cl: 'dark' },
        { c: 1, r: '3/6', cl: 'dark' }, { c: 2, r: '5/7', cl: 'dark' }
    ];
    tileDefs.forEach((t, i) => {
        const el = document.createElement('div');
        el.className = 'testi-tile ' + t.cl;
        el.style.gridColumn = t.c;
        el.style.gridRow = t.r;
        el.style.animation = `tileFloat ${3.6 + (i % 5) * 0.2}s ease-in-out ${(i * 0.12).toFixed(1)}s infinite alternate`;
        tileGridEl.appendChild(el);
    });
}

// ─── Render Active Testimonial Card ───
function renderTestiCard(data) {
    const face = document.getElementById('testiCardFace');
    if (!face) return;
    const isUser = data.type === 'user';
    face.className = 'testi-card-face ' + (isUser ? 'testi-user-card' : 'testi-pro-card');
    const stars = Array.from({ length: 5 }, (_, i) =>
        `<span class="testi-star ${i < data.rating ? 'on' : 'off'}">&#9733;</span>`
    ).join('');
    face.innerHTML = `
        <div class="testi-card-top">
            <div>
                <div class="testi-stars">${stars}</div>
                <div class="testi-rating-text">${data.rating}.0 Ratings</div>
            </div>
            <div class="testi-badge ${isUser ? 'homeowner' : 'professional'}">${isUser ? 'HOMEOWNER' : 'PROFESSIONAL'}</div>
        </div>
        <div class="testi-quote">${data.quote}</div>
        <div>
            <div class="testi-card-divider"></div>
            <div class="testi-author-row">
                <div class="testi-avatar">${data.ini}</div>
                <div>
                    <div class="testi-author-name">${data.name}</div>
                    <div class="testi-author-loc">${data.loc}</div>
                </div>
            </div>
        </div>`;
}

// ─── Render Dots ───
function renderTestiDots() {
    const dotsEl = document.getElementById('testiDots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    TESTIMONIALS.forEach((t, i) => {
        const dot = document.createElement('div');
        dot.className = 'testi-dot' + (i === testiCur ? ' active' : '') + (t.type === 'pro' ? ' pro-dot' : '');
        dot.onclick = () => {
            if (i === testiCur || testiAnim) return;
            const dir = i > testiCur ? 'next' : 'prev';
            testiCur = i;
            testiFlipTo(dir);
        };
        dotsEl.appendChild(dot);
    });
}

// ─── Stack Swap Animation ───
function testiFlipTo(dir) {
    if (testiAnim) return;
    testiAnim = true;
    const wrap = document.getElementById('testiFlipWrapper');
    const stage = document.getElementById('testiDeckStage');
    if (!wrap || !stage) { testiAnim = false; return; }

    stage.classList.add('flipping');
    wrap.classList.remove('testi-slide-out-next', 'testi-slide-out-prev', 'testi-slide-in');
    void wrap.offsetWidth; // force reflow

    // Phase 1: front card slides out
    wrap.classList.add(dir === 'next' ? 'testi-slide-out-next' : 'testi-slide-out-prev');

    setTimeout(() => {
        // Phase 2: swap content while card is invisible
        renderTestiCard(TESTIMONIALS[testiCur]);
        renderTestiDots();

        // Phase 3: card slides/fades back in
        wrap.classList.remove('testi-slide-out-next', 'testi-slide-out-prev');
        wrap.classList.add('testi-slide-in');
    }, 350); // halfway through the 0.7s out animation

    setTimeout(() => {
        wrap.classList.remove('testi-slide-in');
        stage.classList.remove('flipping');
        testiAnim = false;
    }, 850);
}

// ─── Button Handlers ───
const testiNextBtn = document.getElementById('testiNextBtn');
const testiPrevBtn = document.getElementById('testiPrevBtn');

if (testiNextBtn) {
    testiNextBtn.addEventListener('click', () => {
        if (testiAnim) return;
        testiCur = (testiCur + 1) % TESTIMONIALS.length;
        testiFlipTo('next');
    });
}

if (testiPrevBtn) {
    testiPrevBtn.addEventListener('click', () => {
        if (testiAnim) return;
        testiCur = (testiCur - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
        testiFlipTo('prev');
    });
}

// ─── Initialize ───
renderTestiCard(TESTIMONIALS[0]);
renderTestiDots();
