(function(){
  const productsEl = document.getElementById('products');
  const cartBtn = document.getElementById('cartBtn');
  const cartCount = document.getElementById('cartCount');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const clearBtn = document.getElementById('clearCart');
  const modalRoot = document.getElementById('modalRoot');

  let products = [];
  function loadProducts(){
    fetch('products.json').then(r=>r.json()).then(data=>{ products=data; renderProducts(); updateCartUI(); }).catch(err=>{ products=[]; console.error(err) });
  }

  function renderProducts(){
    productsEl.innerHTML = '';
    for(const p of products){
      const card = document.createElement('div'); card.className='card';
      const img = document.createElement('img'); img.src = p.img; img.alt = p.name;
      const h3 = document.createElement('h3'); h3.textContent = p.name;
      const desc = document.createElement('p'); desc.textContent = p.desc;
      const price = document.createElement('div'); price.className='price'; price.textContent = `$${p.price.toFixed(2)}`;
      const meta = document.createElement('div'); meta.className='meta';
      const view = document.createElement('button'); view.className='btn secondary'; view.textContent='Quick view';
      view.addEventListener('click', ()=> openModal(p));
      const add = document.createElement('button'); add.className='btn'; add.textContent='Add to cart';
      add.addEventListener('click', ()=>{ addToCart(p.id); add.classList.add('added'); setTimeout(()=> add.classList.remove('added'),400); });
      meta.appendChild(view); meta.appendChild(add);
      card.appendChild(img); card.appendChild(h3); card.appendChild(desc); card.appendChild(price); card.appendChild(meta);
      productsEl.appendChild(card);
    }
  }

  function openModal(p){
    modalRoot.innerHTML = '';
    const wrap = document.createElement('div'); wrap.className='modal';
    const panel = document.createElement('div'); panel.className='panel';
    const img = document.createElement('img'); img.src = p.img; img.alt = p.name;
    const info = document.createElement('div'); info.className='info';
    const h = document.createElement('h2'); h.textContent = p.name; h.style.marginTop='0';
    const d = document.createElement('p'); d.textContent = p.desc;
    const pr = document.createElement('div'); pr.className='price'; pr.textContent = `$${p.price.toFixed(2)}`;
    const add = document.createElement('button'); add.className='btn'; add.textContent='Add to cart'; add.style.marginTop='12px'; add.addEventListener('click', ()=>{ addToCart(p.id); });
    const close = document.createElement('button'); close.className='close'; close.textContent='✕'; close.addEventListener('click', ()=> { wrap.remove(); });
    info.appendChild(h); info.appendChild(d); info.appendChild(pr); info.appendChild(add);
    panel.appendChild(img); panel.appendChild(info); wrap.appendChild(panel); wrap.appendChild(close);
    modalRoot.appendChild(wrap);
  }

  function getCart(){ try{ return JSON.parse(localStorage.getItem('cart')||'[]') }catch(e){ return [] } }
  function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }

  function addToCart(id){
    const c = getCart();
    const entry = c.find(x=>x.id===id);
    if(entry) entry.qty++;
    else c.push({id, qty:1});
    saveCart(c); updateCartUI();
  }
  function removeFromCart(id){
    let c = getCart(); c = c.filter(x=>x.id!==id); saveCart(c); updateCartUI();
  }
  function setQty(id,qty){ const c = getCart(); const e = c.find(x=>x.id===id); if(e) e.qty = qty; saveCart(c); updateCartUI(); }

  function updateCartUI(){
    const c = getCart();
    const totalItems = c.reduce((s,it)=>s+it.qty,0);
    cartCount.textContent = totalItems;
    cartItemsEl.innerHTML = '';
    let total = 0;
    for(const it of c){
      const p = products.find(x=>x.id===it.id) || {name:'Item',price:0,img:''};
      total += p.price * it.qty;
      const row = document.createElement('div'); row.className='drawer-item';
      const img = document.createElement('img'); img.src = p.img; img.alt = p.name;
      const meta = document.createElement('div'); meta.style.flex='1';
      const name = document.createElement('div'); name.textContent = p.name;
      const qty = document.createElement('input'); qty.type='number'; qty.min='1'; qty.value = it.qty; qty.style.width='56px';
      qty.addEventListener('change', ()=>{ setQty(it.id, Math.max(1, parseInt(qty.value)||1)); });
      const rem = document.createElement('button'); rem.className='btn secondary'; rem.textContent='Remove'; rem.addEventListener('click', ()=> removeFromCart(it.id));
      meta.appendChild(name); meta.appendChild(qty);
      row.appendChild(img); row.appendChild(meta); row.appendChild(rem);
      cartItemsEl.appendChild(row);
    }
    cartTotalEl.textContent = total.toFixed(2);
  }

  cartBtn.addEventListener('click', ()=>{
    const shown = !cartDrawer.classList.contains('hidden');
    if(shown){ cartDrawer.classList.add('hidden'); cartDrawer.setAttribute('aria-hidden','true'); } else { cartDrawer.classList.remove('hidden'); cartDrawer.setAttribute('aria-hidden','false'); }
  });
  clearBtn.addEventListener('click', ()=>{ localStorage.removeItem('cart'); updateCartUI(); });

  loadProducts();
})();
