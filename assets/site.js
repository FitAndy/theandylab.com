/* ============================================================
   THE ANDY LAB — shared site behaviour
   ============================================================ */
(function(){
  document.documentElement.classList.add('js');

  /* ---- nav: scrolled state + mobile toggle ---- */
  var nav = document.querySelector('nav');
  if(nav){
    var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});

    var toggle = nav.querySelector('.nav-toggle');
    var links  = nav.querySelector('.nav-links');
    if(toggle){
      toggle.addEventListener('click', function(){
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    if(links){
      links.addEventListener('click', function(e){
        if(e.target.closest('a')){ nav.classList.remove('open'); if(toggle) toggle.setAttribute('aria-expanded','false'); }
      });
    }
  }

  /* ---- scroll reveals ---- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal, .reveal-stagger'));
  if(revealEls.length){
    if(!('IntersectionObserver' in window)){
      revealEls.forEach(function(n){ n.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
      }, {threshold:0.08, rootMargin:'0px 0px -6% 0px'});
      revealEls.forEach(function(n){ io.observe(n); });
    }
  }

  /* ---- language toggle (persisted across pages) ---- */
  var KEY = 'tal_lang';
  var html = document.documentElement;
  var btns = document.querySelectorAll('.lang-switch button');
  function applyLang(lang){
    if(lang !== 'en' && lang !== 'es') lang = 'es';
    html.setAttribute('lang', lang);
    btns.forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-setlang') === lang); });
    try{ localStorage.setItem(KEY, lang); }catch(e){}
  }
  var saved; try{ saved = localStorage.getItem(KEY); }catch(e){}
  applyLang(saved || html.getAttribute('lang') || 'es');
  btns.forEach(function(b){
    b.addEventListener('click', function(){ applyLang(b.getAttribute('data-setlang')); });
  });

  /* ---- progress bar + back-to-top (long-read guide) ---- */
  var bar = document.querySelector('.progress-bar');
  var backTop = document.querySelector('.back-top');
  if(bar || backTop){
    var onDoc = function(){
      var doc = document.documentElement;
      var top = doc.scrollTop || document.body.scrollTop;
      var h = doc.scrollHeight - doc.clientHeight;
      var pct = h > 0 ? (top / h) * 100 : 0;
      if(bar) bar.style.width = pct + '%';
      if(backTop) backTop.classList.toggle('show', top > 450);
      // parallax on big section numerals
      document.querySelectorAll('[data-parallax]').forEach(function(el){
        var s = el.closest('section'); if(!s) return;
        var r = s.getBoundingClientRect();
        var off = (r.top + r.height/2 - window.innerHeight/2) * 0.06;
        el.style.transform = 'translateY(calc(-50% + ' + off + 'px))';
      });
    };
    onDoc();
    window.addEventListener('scroll', onDoc, {passive:true});
    if(backTop) backTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });
  }

  /* ---- mobile swipe carousels ---- */
  document.querySelectorAll('[data-swipe],.principles-grid,.action-grid,.lv-grid,.guide-grid,.pgrid').forEach(function(g){
    if(g.children.length<2) return;
    var vis=function(){return Array.prototype.filter.call(g.children,function(c){return c.offsetParent!==null||getComputedStyle(c).display!=='none';});};
    g.classList.add('swipe');
    var ctl=document.createElement('div'); ctl.className='swipe-ctl';
    ctl.innerHTML='<button type="button" aria-label="Previous">&#8249;</button><span class="swipe-count"></span><button type="button" aria-label="Next">&#8250;</button>';
    g.parentNode.insertBefore(ctl,g.nextSibling);
    var b=ctl.querySelectorAll('button'),cnt=ctl.querySelector('.swipe-count'),n=vis().length;
    function idx(){var w=vis()[0].getBoundingClientRect().width+14;return Math.min(n-1,Math.max(0,Math.round(g.scrollLeft/w)));}
    function upd(){n=vis().length;var i=idx();cnt.textContent=(i+1)+'/'+n;b[0].disabled=i===0;b[1].disabled=g.scrollLeft+g.clientWidth>=g.scrollWidth-4;}
    function go(d){var w=vis()[0].getBoundingClientRect().width+14;g.scrollTo({left:(idx()+d)*w,behavior:'smooth'});}
    b[0].onclick=function(){go(-1)};b[1].onclick=function(){go(1)};
    g.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);upd();
  });

  /* ---- sticky mobile CTA ---- */
  if(!document.body.classList.contains('theme-light')){
    var sb=document.createElement('div'); sb.className='sticky-cta';
    sb.innerHTML='<a href="https://calendly.com/hello-theandylab/30min" target="_blank" rel="noopener"><span data-lang="es">Reserva tu llamada gratis · 20 min</span><span data-lang="en">Book your free 20-min call</span></a>';
    document.body.appendChild(sb); document.body.classList.add('has-sticky');
    var st=function(){sb.classList.toggle('show',window.scrollY>window.innerHeight*0.7);};
    st(); window.addEventListener('scroll',st,{passive:true});
  }

  /* ---- collapsible tier details (mobile) ---- */
  document.querySelectorAll('.lv-tier').forEach(function(t){
    var kids=[].slice.call(t.children),subs=kids.filter(function(e){return e.classList.contains('lv-sub')}),btn=t.querySelector('.btn-p');
    if(!subs.length||!btn) return;
    var from=kids.indexOf(subs[subs.length-1])+1;while(kids[from]&&kids[from].classList.contains('lv-h'))from++;var to=kids.indexOf(btn),more=document.createElement('div');
    more.className='lv-more';
    kids.slice(from,to).forEach(function(e){more.appendChild(e)});
    t.insertBefore(more,btn);
    var b=document.createElement('button');b.type='button';b.className='lv-more-btn';
    function lbl(){var o=more.classList.contains('open'),es=document.documentElement.lang!=='en';b.textContent=o?(es?'Ver menos −':'Show less −'):(es?'Ver detalles +':'Show details +');}
    b.onclick=function(){more.classList.toggle('open');lbl()};lbl();
    t.insertBefore(b,btn);
    new MutationObserver(lbl).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  });

  /* ---- localised page title / description / aria ---- */
  var META={
   'index.html':['The Andy Lab','The Andy Lab — More muscle. Less guilt. Strength training and nutrition made for you, with criteria, not motivation.'],
   'manifesto.html':['The Andy Lab — Manifesto','The Andy Lab manifesto — the five principles everything I do is built on.'],
   'newsletter.html':['The Brain — Newsletter and guides — The Andy Lab','My brain, in your inbox. Muscle, food, and why your brain refuses to cooperate. Every week.'],
   'andy.html':['Andy — The Andy Lab','Economist. Colombian. Obsessed with understanding why people don’t do what they know they should.'],
   'guia-proteina.html':['Protein — The Andy Lab','Your brain has spent years overcomplicating something that fits in one multiplication. The complete protein guide, with the mechanism nobody explains.'],
   'proteina.html':['Protein — The Andy Lab','How much protein you need, where to get it, and how not to give up halfway.'],
   'suplementos.html':['Supplements — The Andy Lab','The short list for building muscle and losing fat. The ones that work, the ones that don’t, and why.'],
   'viaje.html':['Training and eating when you travel — The Andy Lab','The free guide I use myself when I travel. No gym, no guilt, no pretending to be an elite athlete in a hotel.'],
   'proteina-leadmagnet.html':['Protein Guide — The Andy Lab','Your exact protein number. My real sources. And why your brain says no on day three.']
  };
  var pg=(location.pathname.split('/').pop()||'index.html'),M=META[pg],T0=document.title;
  var dm=document.querySelector('meta[name="description"]'),D0=dm&&dm.content;
  function loc(lang){
    var en=lang==='en';
    if(M){document.title=en?M[0]:T0;if(dm)dm.setAttribute('content',en?M[1]:D0);}
    document.querySelectorAll('.nav-toggle').forEach(function(b){b.setAttribute('aria-label',en?'Menu':'Menú');});
    document.querySelectorAll('[aria-label="Volver arriba"],[aria-label="Back to top"]').forEach(function(b){b.setAttribute('aria-label',en?'Back to top':'Volver arriba');});
  }
  loc(html.getAttribute('lang'));
  new MutationObserver(function(){loc(html.getAttribute('lang'));}).observe(html,{attributes:true,attributeFilter:['lang']});
})();
