// Product modal behavior
(function(){
 const cards = document.querySelectorAll('.product-card');
  const modal = document.getElementById('productModal');
 const backdrop = document.getElementById('modalBackdrop');
 const closeBtn = document.getElementById('modalClose');
 const mainImg = document.getElementById('modalMainImage');
 const thumbsWrap = document.getElementById('modalThumbs');
 const titleEl = document.getElementById('modalTitle');
 const priceEl = document.getElementById('modalPrice');
 const descEl = document.getElementById('modalDesc');
 const qtyInput = document.getElementById('qtyInput');
 const sizeSelect = document.getElementById('sizeSelect');

 // open modal with product data
 function openModalFromCard(card){
 const name = card.dataset.name || '';
  const price = card.dataset.price || '';
 const desc = card.dataset.desc || '';
const images = JSON.parse(card.dataset.images || '[]');
modal.setAttribute('data-current-id', card.dataset.id);

 titleEl.textContent = name;
 priceEl.textContent = price;
descEl.textContent = desc;
qtyInput.value = 1;

// populate main image & thumbs
thumbsWrap.innerHTML = '';
if(images.length){
mainImg.src = images[0];
 images.forEach((src, idx)=>{
const img = document.createElement('img');
img.src = src;
 img.alt = name + ' ' + (idx+1);
if(idx === 0) img.classList.add('active');
img.addEventListener('click', ()=> {
setActiveThumb(img);
mainImg.src = src;
});
 thumbsWrap.appendChild(img);
 });
} else {
mainImg.src = '';
}

// show modal
modal.setAttribute('aria-hidden','false');
 document.body.style.overflow = 'hidden';
// focus for accessibility
closeBtn.focus();
 }

function setActiveThumb(el){
thumbsWrap.querySelectorAll('img').forEach(i => i.classList.remove('active'));
 el.classList.add('active');
}

function closeModal(){
modal.setAttribute('aria-hidden','true');
document.body.style.overflow = '';
}

// attach click events
cards.forEach(card=>{
card.addEventListener('click', ()=> openModalFromCard(card));
card.addEventListener('keydown', (e)=> { if(e.key === 'Enter' || e.key === ' ') openModalFromCard(card); });
});

closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

// (Optional) add to cart handler
document.getElementById('addToCart').addEventListener('click', function(){
// example: collect product id, quantity, size
const pid = document.querySelector('.product-card[data-name="'+titleEl.textContent+'"]')?.dataset.id || '';
const qty = qtyInput.value;
 const size = sizeSelect.value;
// add your add-to-cart logic here
// //alert('Added to cart: ' + titleEl.textContent + ' ('+size+') x' + qty);
// show toast anchored to cart icon, include item name
showToast(titleEl.textContent + ' — Item added to cart', document.getElementById('cartToggle') || document.getElementById('cartToggleMobile'));
 closeModal();
 });

function setActiveThumb(el){
thumbsWrap.querySelectorAll('img').forEach(i => i.classList.remove('active'));
el.classList.add('active');
}

function closeModal(){
modal.setAttribute('aria-hidden','true');
document.body.style.overflow = '';
 }

// attach click events
  cards.forEach(card=>{
    card.addEventListener('click', ()=> openModalFromCard(card));
    card.addEventListener('keydown', (e)=> { if(e.key === 'Enter' || e.key === ' ') openModalFromCard(card); });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

  // (Optional) add to cart handler
  document.getElementById('addToCart').addEventListener('click', function(){
    // example: collect product id, quantity, size
    const pid = document.querySelector('.product-card[data-name="'+titleEl.textContent+'"]')?.dataset.id || '';
    const qty = qtyInput.value;
    const size = sizeSelect.value;
    // add your add-to-cart logic here
    //alert('Added to cart: ' + titleEl.textContent + ' ('+size+') x' + qty);
    // show toast anchored to cart icon, include item name
    showToast(titleEl.textContent + ' — Item added to cart', document.getElementById('cartToggle') || document.getElementById('cartToggleMobile'));
    closeModal();
  });

 

})();


// BRANDS


(function(){
    // Elements
    const brandSelect = document.getElementById('brandSelect');
    const genderBtns = document.querySelectorAll('.gender-toggle .btn');
    const productsGrid = document.getElementById('productsGrid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));

    // modal elements
    const modal = document.getElementById('productModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const thumbsWrap = document.getElementById('thumbsWrap');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');
    const addToCart = document.getElementById('addToCart');
    const buyNow = document.getElementById('buyNow');

    // CURRENT FILTER STATE
    let currentBrand = 'all';
    let currentGender = 'all';

    // Filtering function
    function applyFilters(){
      productCards.forEach(card=>{
        const cardBrand = card.dataset.brand || '';
        const cardGender = card.dataset.gender || '';
        const showByBrand = (currentBrand === 'all' || currentBrand === cardBrand);
        const showByGender = (currentGender === 'all' || currentGender === cardGender);
        if(showByBrand && showByGender){
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Brand select change
    brandSelect.addEventListener('change', (e)=> {
      currentBrand = e.target.value;
      applyFilters();
    });

    // Gender toggle clicks
    genderBtns.forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        genderBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        currentGender = btn.dataset.gender;
        applyFilters();
      });
    });

    // Open modal for a card
    function openModalFromCard(card){
      const images = JSON.parse(card.dataset.images || '[]');
      const name = card.dataset.name || '';
      const price = card.dataset.price || '';
      const desc = card.dataset.desc || '';
        modal.setAttribute('data-current-id', card.dataset.id);

      modalTitle.textContent = name;
      modalPrice.textContent = price;
      modalDesc.textContent = desc;

      // populate thumbs
      thumbsWrap.innerHTML = '';
      if(images.length){
        modalImage.src = images[0];
        images.forEach((src, idx)=>{
          const img = document.createElement('img');
          img.src = src;
          img.alt = name + ' ' + (idx+1);
          if(idx===0) img.classList.add('active');
          img.addEventListener('click', ()=> {
            modalImage.src = src;
            thumbsWrap.querySelectorAll('img').forEach(i=>i.classList.remove('active'));
            img.classList.add('active');
          });
          thumbsWrap.appendChild(img);
        });
      } else {
        modalImage.src = '';
      }

      // show modal
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }

    // Attach click handlers to cards
    productCards.forEach(card=>{
      card.addEventListener('click', ()=> openModalFromCard(card));
      // keyboard accessibility
      card.addEventListener('keydown', (e)=> { if(e.key === 'Enter') openModalFromCard(card); });
    });

    // close modal
    function closeModal(){
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
    modalBackdrop.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

    // addToCart / buyNow stubs (replace with real logic)
    addToCart.addEventListener('click', ()=> {
      showToast(modalTitle.textContent + ' — Item added to cart', document.getElementById('cartToggle') || document.getElementById('cartToggleMobile'));
      closeModal();
    });
    
    // --- START: NEW BUY NOW LOGIC ---
    document.getElementById('buyNow').addEventListener('click', function(){
        // --- GATHER PRODUCT INFO ---
        const qtyInput = document.getElementById('qtyInput');
        const sizeSelect = document.getElementById('sizeSelect');
        
        const pid = modal.getAttribute('data-current-id') || ('p_'+Date.now());
        const name = modalTitle.textContent;
        const priceText = modalPrice.textContent;
        const qty = Number(qtyInput.value || 1);
        const size = sizeSelect.value;
        
        // --- INITIALIZE CART UTILITIES (copied from your cart IIFE) ---
        const CART_KEY = 'gg_cart_v1';
        
        function parsePrice(priceStr){
            if(!priceStr) return 0;
            const num = priceStr.replace(/[^\d.]/g,'');
            return parseFloat(num) || 0;
        }
        const priceNumeric = parsePrice(priceText);
        
        // --- CREATE A NEW CART (only containing the "Buy Now" item) ---
        let singleItemCart = [{
            id: pid,
            name,
            price: priceText,
            qty,
            size,
            _priceNumeric: priceNumeric
        }];

        // --- SAVE TO LOCALSTORAGE ---
        localStorage.setItem(CART_KEY, JSON.stringify(singleItemCart));
        
        // --- REDIRECT TO CHECKOUT ---
        closeModal();
        window.location.href = 'checkout.html';
    });
    // --- END: NEW BUY NOW LOGIC ---

 // initial apply
applyFilters();
 })();
// WHY THIS BTN
 document.querySelector('.why-this-btn').addEventListener('click', function () {
  const modal = document.getElementById('productModal');
const productId = modal.getAttribute('data-current-id');

if (!productId) {
alert('Product not found.');
return;
}

const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);

if (productCard) {
const filePath = productCard.getAttribute('data-file');
if (filePath) {
 window.open(filePath, '_blank');
} else {
  alert('No file attached for this product.');
 }
 } else {
 alert('Product not found.');
 }
});
// WHY THIS BTN END

// CART: add / render / toggle
(function(){
 const CART_KEY = 'gg_cart_v1';
 let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');



  const cartPanel = document.getElementById('cartPanel');
  const cartList = document.getElementById('cartList');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartToggle = document.getElementById('cartToggle');
  const cartToggleMobile = document.getElementById('cartToggleMobile');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const clearCartBtn = document.getElementById('clearCart');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartCount = document.getElementById('cartCount');
  const cartCountMobile = document.getElementById('cartCountMobile');

  function saveCart(){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }

  function parsePrice(priceStr){
    if(!priceStr) return 0;
    // remove non-digit/decimal characters, treat comma as thousand sep
    const num = priceStr.replace(/[^\d.]/g,'');
    return parseFloat(num) || 0;
  }

  function formatCurrency(num){
    // keep original currency label if PKR present, but for simplicity show PKR
    return 'PKR ' + Number(num).toLocaleString(undefined, {maximumFractionDigits:2});
  }

  function renderCart(){
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item, idx) => {
      total += parseFloat(item._priceNumeric || 0) * item.qty;
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-start';
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '8px';

      li.innerHTML = `
        <div style="flex:1">
          <div style="font-weight:600">${item.name}</div>
          <div style="font-size:12px;color:#666">Size: ${item.size} &nbsp; Qty: ${item.qty}</div>
          <div style="font-size:13px;margin-top:6px;">${formatCurrency(item._priceNumeric)}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
          <button class="btn btn-sm btn-outline-danger remove-cart-item" data-index="${idx}" title="Remove">&times;</button>
        </div>
      `;
      cartList.appendChild(li);
    });

    cartTotalEl.textContent = formatCurrency(total);
    const count = cart.reduce((s,i)=> s + Number(i.qty), 0);
    if(cartCount) cartCount.textContent = count;
    if(cartCountMobile) cartCountMobile.textContent = count;
  }

  function toggleCart(show){
    if(show === undefined) show = cartPanel.style.display === 'none';
    cartPanel.style.display = show ? 'block' : 'none';
  }

  // attach toggles
  if(cartToggle) cartToggle.addEventListener('click', (e)=>{ e.preventDefault(); toggleCart(); });
  if(cartToggleMobile) cartToggleMobile.addEventListener('click', (e)=>{ e.preventDefault(); toggleCart(); });
  if(closeCartBtn) closeCartBtn.addEventListener('click', ()=> toggleCart(false));
  if(clearCartBtn) clearCartBtn.addEventListener('click', ()=> { cart = []; saveCart(); });
  // if(checkoutBtn) checkoutBtn.addEventListener('click', ()=> { alert('Proceed to checkout (not implemented)'); });

  // remove item via event delegation
  cartList.addEventListener('click', (e)=>{
    const btn = e.target.closest('.remove-cart-item');
    if(!btn) return;
    const idx = Number(btn.dataset.index);
    if(!isNaN(idx)){
      // capture removed item name for toast
      const removed = cart.splice(idx,1)[0];
      saveCart();
      const anchor = document.getElementById('cartToggle') || document.getElementById('cartToggleMobile');
      showToast((removed?.name || 'Item') + ' — Item removed', anchor, 2600, '#dc3545');
    }
  });

  // override existing addToCart behavior: listen to clicks on #addToCart and push selected product
  document.addEventListener('click', function(e){
    const addBtn = e.target.closest('#addToCart');
    if(!addBtn) return;
    // gather product info from modal
    const modal = document.getElementById('productModal');
    const productId = modal?.getAttribute('data-current-id') || '';
    const name = document.getElementById('modalTitle')?.textContent || '';
    const priceText = document.getElementById('modalPrice')?.textContent || '';
    const qty = Number(document.getElementById('qtyInput')?.value || 1);
    const size = document.getElementById('sizeSelect')?.value || '';

    const priceNumeric = parsePrice(priceText);

    // push into cart
    cart.push({
      id: productId || ('p_'+Date.now()),
      name,
      price: priceText,
      qty,
      size,
      _priceNumeric: priceNumeric
    });

    saveCart();

    // small feedback
    toggleCart(true);
    // show toast anchored to cart icon, include item name
    showToast(name + ' — Item added to cart', document.getElementById('cartToggle') || document.getElementById('cartToggleMobile'));
    // close product modal if open
    const modalClose = document.getElementById('modalClose');
    if(modalClose) modalClose.click();
  });

  // initial render
  renderCart();

})();

// simple green toast helper (auto-dismiss)
function showToast(message = 'Item added to cart', anchorEl = null, duration = 2600, bgColor = '#198754') {
  // remove any existing quick toasts to avoid overlap
  document.querySelectorAll('.gg-toast').forEach(t => t.remove());

  const t = document.createElement('div');
  t.className = 'gg-toast';
  t.textContent = message;
  Object.assign(t.style, {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    background: bgColor, /* configurable color */
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '8px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
    zIndex: 20000,
    opacity: '0',
    transition: 'opacity 180ms ease, transform 180ms ease',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    fontSize: '13px'
  });

  document.body.appendChild(t);

  // Position relative to anchor if provided and visible
  if (anchorEl instanceof Element) {
    const rect = anchorEl.getBoundingClientRect();
    // place toast above the icon centered horizontally
    // measure toast after insertion
    requestAnimationFrame(() => {
      const tw = t.offsetWidth;
      const th = t.offsetHeight;
      const left = Math.round(rect.left + (rect.width / 2) - (tw / 2));
      const top = Math.round(rect.top - th - 8); // 8px gap above icon
      // ensure toast stays within viewport
      const clampedLeft = Math.min(Math.max(left, 8), window.innerWidth - tw - 8);
      const finalTop = top < 8 ? rect.bottom + 8 : top; // if not enough space above, show below icon
      Object.assign(t.style, {
        left: clampedLeft + 'px',
        top: finalTop + 'px',
        transform: 'none'
      });
      // show
      requestAnimationFrame(()=> t.style.opacity = '1');
    });
  } else {
    // fallback: bottom-right
    Object.assign(t.style, {
      right: '20px',
      left: 'auto',
      bottom: '90px',
      top: 'auto',
      transform: 'none'
    });
    requestAnimationFrame(()=> t.style.opacity = '1');
  }

  // hide after duration
  setTimeout(()=> {
    t.style.opacity = '0';
    t.addEventListener('transitionend', ()=> t.remove(), { once: true });
  }, duration);
}

// Builds productList.name and adds simple name search for both search bars
  document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.product-card'));
    const names = cards.map(c => (c.querySelector('.product-title')?.textContent || '').trim());

    window.productList = {
      name: names,
      items: cards.map((el, i) => ({ el, name: names[i], id: el.dataset.id || null }))
    };

    function filterByName(query) {
      const q = (query || '').trim().toLowerCase();
      cards.forEach(card => {
        const title = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
        card.style.display = q === '' || title.includes(q) ? '' : 'none';
      });
    }

    // Wire all .search-bar inputs + buttons (mobile + desktop)
    document.querySelectorAll('.search-bar').forEach(bar => {
      const input = bar.querySelector('input[type="text"]');
      const btn = bar.querySelector('button[type="submit"]');
      if (!input) return;
      input.addEventListener('input', (e) => filterByName(e.target.value));
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          filterByName(input.value);
        });
      }
    });

    // Expose helper for console or other scripts
    window.filterProductsByName = filterByName;
  });

