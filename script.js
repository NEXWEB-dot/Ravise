/* ═══════════════════════════════════════════════════════════
   RAVISE — Single Page Drop Experience
   Scroll-Driven Hero + Products + Cart
   ═══════════════════════════════════════════════════════════ */

// ── Product Data ──────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'squad',
    name: 'THE SQUAD',
    tag: 'CARTOON DOGS',
    desc: 'Five legends. One tee. Heavyweight oversized.',
    src: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (3).jpeg',
    srcAlt: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (2).jpeg',
    bg: '#2D4A3E',
    accent: '#C8E6C9',
    price: 2999,
    oldPrice: 3499,
    featured: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'rose',
    name: 'DARK ROSE',
    tag: 'ORIGINAL ART',
    desc: 'Hand-drawn darkness. Every petal tells a story.',
    src: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (5).jpeg',
    srcAlt: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (4).jpeg',
    bg: '#2A3A4A',
    accent: '#D4E4F4',
    price: 2799,
    oldPrice: null,
    featured: true,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'mario',
    name: 'GOOD BAD UGLY',
    tag: 'SUPER MARIO',
    desc: 'The Good. The Bad. The Ugly. Which one are you?',
    src: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (6).jpeg',
    srcAlt: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (7).jpeg',
    bg: '#8B6914',
    accent: '#FFF0C0',
    price: 2999,
    oldPrice: 3499,
    featured: true,
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'sunday',
    name: 'SUNDAY RIDER',
    tag: 'LIMITED EDITION',
    desc: '朝の乗り物. Morning ride. Limited run.',
    src: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (10).jpeg',
    srcAlt: null,
    bg: '#1A1A2E',
    accent: '#E8B4D8',
    price: 3499,
    oldPrice: null,
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'hope',
    name: 'HOPE',
    tag: 'STREETWEAR DROP',
    desc: "Where there's life, there's hope. Believe it.",
    src: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (11).jpeg',
    srcAlt: null,
    bg: '#0D0D0D',
    accent: '#90EE90',
    price: 2999,
    oldPrice: 3799,
    featured: false,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'eyes',
    name: 'ALL EYES ON ME',
    tag: 'LIMITED EDITION',
    desc: 'The greatest loss is what dies inside while still alive.',
    src: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (12).jpeg',
    srcAlt: null,
    bg: '#1C0A0A',
    accent: '#FF6B6B',
    price: 3499,
    oldPrice: null,
    featured: false,
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 'traffic',
    name: "TRAFFIC & PYAAR",
    tag: 'DESI DROP',
    desc: 'Hum traffic aur pyaar mein phaste nahi.',
    src: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (9).jpeg',
    srcAlt: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (8).jpeg',
    bg: '#3A3A3A',
    accent: '#E0E0E0',
    price: 2499,
    oldPrice: 2999,
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'flowers',
    name: "IT'S OKAY",
    tag: 'ORIGINAL ART',
    desc: "It's okay to bloom in your own time.",
    src: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM (1).jpeg',
    srcAlt: 'images/WhatsApp Image 2026-06-26 at 4.06.42 PM.jpeg',
    bg: '#1A3040',
    accent: '#82B1FF',
    price: 2799,
    oldPrice: null,
    featured: false,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
];

const WHATSAPP_NUMBER = '923000000000'; // Replace with actual

// ── State ─────────────────────────────────────────────────
let activeIndex = 0;
let isMobile = window.innerWidth <= 768;
let cart = [];
let selectedSizes = {}; // productId -> size

// ── DOM ───────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const heroBg = $('#heroBg');
const carousel = $('#carousel');
const productTag = $('#productTag');
const productName = $('#productName');
const productOverlay = $('#productOverlay');
const heroDesc = $('#heroDesc');
const preloader = $('#preloader');
const preloaderFill = $('#preloaderFill');
const navbar = $('#navbar');
const cartBtn = $('#cartBtn');
const cartCount = $('#cartCount');
const cartDrawer = $('#cartDrawer');
const cartOverlay = $('#cartOverlay');
const cartClose = $('#cartClose');
const cartBody = $('#cartBody');
const cartItems = $('#cartItems');
const cartEmpty = $('#cartEmpty');
const cartTotal = $('#cartTotal');
const cartFooter = $('#cartFooter');
const checkoutBtn = $('#checkoutBtn');
const dropsGrid = $('#dropsGrid');
const collectionGrid = $('#collectionGrid');
const toast = $('#toast');
const toastMsg = $('#toastMsg');
const heroSection = $('#hero');

// ═══════════════════════════════════════════════════════════
// PRELOADER
// ═══════════════════════════════════════════════════════════
function initPreloader() {
  let loaded = 0;
  // Only preload the hero images to get users in faster
  const heroImages = featuredProducts().map(p => p.src);
  const total = heroImages.length;
  
  let preloaderDone = false;
  const hidePreloader = () => {
    if (preloaderDone) return;
    preloaderDone = true;
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
    initScrollReveal();
  };

  const promises = heroImages.map((src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (!preloaderDone) {
          preloaderFill.style.width = Math.round((loaded / total) * 100) + '%';
        }
        resolve();
      };
      img.src = src;
    })
  );

  Promise.all(promises).then(() => {
    // Small delay to let the progress bar hit 100% visually
    setTimeout(hidePreloader, 400);
  });

  // Maximum loading time: 2.5s. If network is slow, drop them in anyway.
  setTimeout(hidePreloader, 2500);
}

// ═══════════════════════════════════════════════════════════
// HERO SCROLL SEQUENCE
// ═══════════════════════════════════════════════════════════
// Exactly 3 featured products for the scroll sequence
const featuredProducts = () => PRODUCTS.filter((p) => p.featured).slice(0, 3);

function buildCarousel() {
  carousel.innerHTML = '';
  featuredProducts().forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'carousel-item';
    div.dataset.index = i;
    div.innerHTML = `<img src="${p.src}" alt="${p.name}" draggable="false" />`;
    
    // Click to collection if active
    div.addEventListener('click', () => {
      if (parseInt(div.dataset.index) === activeIndex) {
        document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    carousel.appendChild(div);
  });
}

function getRole(index) {
  const fp = featuredProducts();
  const n = fp.length;
  const diff = ((index - activeIndex) % n + n) % n;
  if (diff === 0) return 'center';
  if (diff === 1) return 'right';
  if (diff === n - 1) return 'left';
  return 'back';
}

function positionItems() {
  const items = carousel.querySelectorAll('.carousel-item');
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const mob = isMobile;
  const ar = 0.75;

  items.forEach((item, i) => {
    const role = getRole(i);
    item.dataset.role = role;
    let s = {};

    if (role === 'center') {
      const h = mob ? vh * 0.52 : vh * 0.78;
      const w = h * ar;
      s = {
        width: w + 'px', height: h + 'px',
        left: (vw - w) / 2 + 'px',
        bottom: (mob ? vh * 0.15 : vh * -0.02) + 'px',
        opacity: '1',
        filter: 'blur(0px) brightness(1)',
        zIndex: '10',
        transform: 'scale(1)',
        borderRadius: '16px',
      };
    } else if (role === 'left') {
      const h = mob ? vh * 0.36 : vh * 0.56;
      const w = h * ar;
      s = {
        width: w + 'px', height: h + 'px',
        left: (mob ? -w * 0.3 : vw * 0.04) + 'px',
        bottom: (mob ? vh * 0.26 : vh * 0.08) + 'px',
        opacity: '0.65',
        filter: 'blur(2px) brightness(0.5)',
        zIndex: '5',
        transform: 'scale(0.95)',
        borderRadius: '14px',
      };
    } else if (role === 'right') {
      const h = mob ? vh * 0.36 : vh * 0.56;
      const w = h * ar;
      s = {
        width: w + 'px', height: h + 'px',
        left: (mob ? vw - w * 0.7 : vw - w - vw * 0.04) + 'px',
        bottom: (mob ? vh * 0.26 : vh * 0.08) + 'px',
        opacity: '0.65',
        filter: 'blur(2px) brightness(0.5)',
        zIndex: '5',
        transform: 'scale(0.95)',
        borderRadius: '14px',
      };
    } else {
      const h = mob ? vh * 0.28 : vh * 0.42;
      const w = h * ar;
      s = {
        width: w + 'px', height: h + 'px',
        left: (vw - w) / 2 + 'px',
        bottom: (mob ? vh * 0.32 : vh * 0.14) + 'px',
        opacity: '0',
        filter: 'blur(6px) brightness(0.3)',
        zIndex: '2',
        transform: 'scale(0.8)',
        borderRadius: '12px',
      };
    }
    Object.assign(item.style, s);
  });
}

function updateHeroUI() {
  const fp = featuredProducts();
  const p = fp[activeIndex];
  heroBg.style.backgroundColor = p.bg;

  productOverlay.classList.add('transitioning');
  setTimeout(() => {
    productTag.textContent = p.tag;
    productTag.style.color = p.accent;
    productName.textContent = p.name;
    productOverlay.classList.remove('transitioning');
  }, 100);

  heroDesc.style.opacity = '0';
  setTimeout(() => {
    heroDesc.textContent = p.desc;
    heroDesc.style.opacity = '1';
  }, 150);
}

// ═══════════════════════════════════════════════════════════
// PRODUCT CARDS
// ═══════════════════════════════════════════════════════════
function createProductCard(product, staggerIndex) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.style.transitionDelay = (staggerIndex * 0.08) + 's';

  const priceHTML = product.oldPrice
    ? `PKR ${product.price.toLocaleString()} <span class="old">PKR ${product.oldPrice.toLocaleString()}</span>`
    : `PKR ${product.price.toLocaleString()}`;

  const sizesHTML = product.sizes.map((s) =>
    `<button class="size-btn" data-size="${s}" data-product="${product.id}">${s}</button>`
  ).join('');

  card.innerHTML = `
    <div class="card-img-wrap">
      <img src="${product.src}" alt="${product.name}" loading="lazy" />
      <span class="card-badge">${product.tag}</span>
      <button class="card-quick-add" data-product-id="${product.id}" aria-label="Quick add ${product.name}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
    </div>
    <div class="card-body">
      <div class="card-category">${product.tag}</div>
      <h3 class="card-title">${product.name}</h3>
      <p class="card-desc">${product.desc}</p>
      <div class="card-footer">
        <div class="card-price">${priceHTML}</div>
        <div class="size-selector">${sizesHTML}</div>
      </div>
      <button class="add-to-cart-btn" data-product-id="${product.id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        ADD TO CART
      </button>
    </div>
  `;

  card.querySelectorAll('.size-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      card.querySelectorAll('.size-btn').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSizes[product.id] = btn.dataset.size;
    });
  });

  card.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(product.id));
  card.querySelector('.card-quick-add').addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product.id);
  });

  return card;
}

function renderProducts() {
  const featured = PRODUCTS.filter((p) => p.featured);
  
  dropsGrid.innerHTML = '';
  featured.forEach((p, i) => dropsGrid.appendChild(createProductCard(p, i)));

  collectionGrid.innerHTML = '';
  PRODUCTS.forEach((p, i) => collectionGrid.appendChild(createProductCard(p, i)));
}

// ═══════════════════════════════════════════════════════════
// CART LOGIC
// ═══════════════════════════════════════════════════════════
function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const size = selectedSizes[productId] || product.sizes[1] || product.sizes[0];
  const existing = cart.find((item) => item.id === productId && item.size === size);
  
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: productId, size, qty: 1 });
  }

  updateCartUI();
  showToast(`${product.name} (${size}) added to cart`);

  document.querySelectorAll(`.add-to-cart-btn[data-product-id="${productId}"]`).forEach((btn) => {
    btn.classList.add('added');
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ADDED`;
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> ADD TO CART`;
    }, 1500);
  });
}

function removeFromCart(productId, size) {
  cart = cart.filter((item) => !(item.id === productId && item.size === size));
  updateCartUI();
}

function updateQty(productId, size, delta) {
  const item = cart.find((i) => i.id === productId && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId, size);
  } else {
    updateCartUI();
  }
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const p = PRODUCTS.find((pr) => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  cartCount.textContent = totalItems;
  cartCount.classList.toggle('visible', totalItems > 0);
  cartCount.classList.remove('bump');
  void cartCount.offsetWidth;
  if (totalItems > 0) cartCount.classList.add('bump');

  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartItems.style.display = 'none';
    cartFooter.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartItems.style.display = 'flex';
    cartFooter.style.display = 'block';

    cartItems.innerHTML = cart.map((item) => {
      const p = PRODUCTS.find((pr) => pr.id === item.id);
      if (!p) return '';
      return `
        <div class="cart-item">
          <div class="cart-item-img"><img src="${p.src}" alt="${p.name}" /></div>
          <div class="cart-item-info">
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-meta">Size: ${item.size} · ${p.tag}</div>
            <div class="cart-item-price">PKR ${(p.price * item.qty).toLocaleString()}</div>
          </div>
          <div class="cart-item-actions">
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}','${item.size}')" aria-label="Remove">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="qty-control">
              <button class="qty-btn" onclick="updateQty('${item.id}','${item.size}',-1)">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" onclick="updateQty('${item.id}','${item.size}',1)">+</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  cartTotal.textContent = `PKR ${totalPrice.toLocaleString()}`;
  checkoutBtn.disabled = cart.length === 0;
}

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cartDrawer.classList.contains('open')) closeCart();
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  let msg = '🛒 *RAVISE Order*\n\n';
  let total = 0;
  cart.forEach((item) => {
    const p = PRODUCTS.find((pr) => pr.id === item.id);
    if (!p) return;
    const lineTotal = p.price * item.qty;
    total += lineTotal;
    msg += `• ${p.name} (${item.size}) × ${item.qty} — PKR ${lineTotal.toLocaleString()}\n`;
  });
  msg += `\n*Total: PKR ${total.toLocaleString()}*\n\nPlease confirm availability and share payment details. 🙏`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
});

// ═══════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════
let toastTimer = null;
function showToast(message) {
  clearTimeout(toastTimer);
  toastMsg.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2500);
}

// ═══════════════════════════════════════════════════════════
// SCROLL: Reveal Animations & Hero Sequence & Navbar
// ═══════════════════════════════════════════════════════════
function initScrollReveal() {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3').forEach((el) => revealObs.observe(el));

  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  $$('.product-card').forEach((card) => cardObs.observe(card));
}

const sections = ['hero', 'drops', 'collection', 'about'];

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // 1. Hero Sticky Scroll Sequence
  const heroRect = heroSection.getBoundingClientRect();
  const trackScrollable = heroRect.height - window.innerHeight; // e.g. 200vh
  
  if (trackScrollable > 0 && heroRect.top <= 0 && heroRect.bottom >= window.innerHeight) {
    // Calculate progress from 0 to 1
    let progress = Math.max(0, Math.min(1, -heroRect.top / trackScrollable));
    // Map to 3 slides (0, 1, 2)
    let targetIndex = Math.min(2, Math.floor(progress * 3));
    // Soft bounce at ends to ensure it snaps fully
    if (progress > 0.95) targetIndex = 2;
    
    if (targetIndex !== activeIndex) {
      activeIndex = targetIndex;
      positionItems();
      updateHeroUI();
    }
  }

  // 2. Navbar background
  navbar.classList.toggle('scrolled', scrollY > 60);

  // 3. Active nav link
  let current = 'hero';
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop - 200 <= scrollY) current = id;
  });
  $$('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.dataset.section === current);
  });

}, { passive: true });

$$('.nav-link, .nav-brand-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ═══════════════════════════════════════════════════════════
// RESIZE
// ═══════════════════════════════════════════════════════════
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    isMobile = window.innerWidth <= 768;
    positionItems();
  }, 150);
});

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
function init() {
  document.body.style.overflow = 'hidden'; 
  buildCarousel();
  positionItems();
  updateHeroUI();
  renderProducts();
  updateCartUI();
  initPreloader();
}

init();
