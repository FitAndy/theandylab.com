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
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if(revealEls.length){
    if(!('IntersectionObserver' in window)){
      revealEls.forEach(function(n){ n.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
      }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
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
})();
