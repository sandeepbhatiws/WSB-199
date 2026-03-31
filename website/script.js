(() => {
  const container = document.getElementById('goo');
  const NUM = 6;
  const blobs = [];
  function rand(min, max){ return Math.random() * (max - min) + min }
  function makeBlob(opts = {}){
    const el = document.createElement('div');
    el.className = 'blob';
    if(opts.size === 'small') el.classList.add('small');
    if(opts.size === 'big') el.classList.add('big');
    const state = {
      el,
      x: rand(0.1,0.9) * (container.clientWidth||600),
      y: rand(0.1,0.9) * (container.clientHeight||300),
      vx: 0, vy:0,
      mass: rand(0.04,0.14),
      wobble: rand(0.8,1.2)
    };
    el.style.left = state.x + 'px';
    el.style.top = state.y + 'px';
    container.appendChild(el);
    blobs.push(state);
  }
  for(let i=0;i<NUM;i++){
    const size = i===0? 'big': (i>3? 'small': undefined);
    makeBlob({size});
  }
  let mouse = {x: container.clientWidth/2, y: container.clientHeight/2, active:false};
  function onMove(e){
    const rect = container.getBoundingClientRect();
    mouse.x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    mouse.y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
  }
  function onEnter(){ mouse.active = true }
  function onLeave(){ mouse.active = false }
  container.addEventListener('mousemove', onMove);
  container.addEventListener('touchmove', onMove, {passive:true});
  container.addEventListener('mouseenter', onEnter);
  container.addEventListener('mouseleave', onLeave);
  container.addEventListener('click', (e)=>{
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawn(x,y);
  });
  function spawn(x,y){
    const el = document.createElement('div');
    el.className = 'blob small';
    const state = { el, x, y, vx: rand(-1,1), vy: rand(-1,1), mass:0.07 };
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    container.appendChild(el);
    blobs.push(state);
    setTimeout(()=>{ el.remove(); const i = blobs.indexOf(state); if(i>-1) blobs.splice(i,1); }, 6000);
  }
  function step(){
    const cw = container.clientWidth, ch = container.clientHeight;
    for(const b of blobs){
      const tx = mouse.active ? mouse.x + (b.mass*200-100) : cw/2 + Math.sin(Date.now()*0.0004*b.wobble)*80;
      const ty = mouse.active ? mouse.y + (b.mass*120-60) : ch/2 + Math.cos(Date.now()*0.0005*b.wobble)*60;
      const ax = (tx - b.x) * (0.01 + b.mass*0.03);
      const ay = (ty - b.y) * (0.01 + b.mass*0.03);
      b.vx = b.vx*0.92 + ax;
      b.vy = b.vy*0.92 + ay;
      b.x += b.vx; b.y += b.vy;
      b.x = Math.max(-80, Math.min(cw+80, b.x));
      b.y = Math.max(-80, Math.min(ch+80, b.y));
      b.el.style.left = b.x + 'px';
      b.el.style.top = b.y + 'px';
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  window.addEventListener('resize', ()=>{ for(const b of blobs){ b.x = Math.min(container.clientWidth, b.x); b.y = Math.min(container.clientHeight, b.y); } });
})();
