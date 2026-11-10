(function(){
  var boxes=document.querySelectorAll('.pv-box');
  boxes.forEach(function(box){
    var v=box.querySelector('video'),btn=box.parentNode.querySelector('.pv-btn');
    if(!v)return;
    v.muted=true;
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){v.removeAttribute('autoplay');v.pause();v.setAttribute('controls','');if(btn)btn.style.display='none';return;}
    function setLabel(){if(btn)btn.textContent=v.muted?'🔇 소리 켜기':'🔊 소리 끄기';}
    if(btn){btn.addEventListener('click',function(){v.muted=!v.muted;if(!v.muted&&v.paused){var p=v.play();if(p&&p.catch)p.catch(function(){});}setLabel();
      if(window.gtag)gtag('event','video_sound',{video:v.getAttribute('data-name'),state:v.muted?'off':'on'});});setLabel();}
    var p=v.play();if(p&&p.catch)p.catch(function(){v.setAttribute('controls','');});
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting){var q=v.play();if(q&&q.catch)q.catch(function(){});}else{v.pause();}
      });},{threshold:.25}).observe(box);
    }
  });
})();
