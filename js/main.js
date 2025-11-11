// Replace with the owner's whatsapp number in international format (no plus signs in wa.me link)
const OWNER_WA_NUMBER = '256778348461'; // e.g. '256778348461'

// Small utilities
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Nav toggle for mobile
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', ()=> document.body.classList.toggle('nav-open'));

// Close nav when clicking outside or when scrolling
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.main-nav');
  const isClickInside = nav.contains(e.target) || navToggle.contains(e.target);
  if (!isClickInside && document.body.classList.contains('nav-open')) {
    document.body.classList.remove('nav-open');
  }
});

window.addEventListener('scroll', () => {
  if (document.body.classList.contains('nav-open')) {
    document.body.classList.remove('nav-open');
  }
});


// About carousel (auto scroll right-to-left with indicators)
(function initCarousel(){
  const track = document.getElementById('aboutCarousel');
  const indicators = document.getElementById('aboutIndicators');
  if(!track) return;
  const slides = Array.from(track.children);
  let idx=0;

  slides.forEach((s,i)=>{
    const btn = document.createElement('button');
    btn.addEventListener('click', ()=>{ idx=i; update(); });
    indicators.appendChild(btn);
  });

  function update(){
    track.style.transform = `translateX(-${idx*100}%)`;
    Array.from(indicators.children).forEach((b,i)=> b.classList.toggle('active', i===idx));
  }

  // basics style for track to allow sliding
  track.style.transition='transform 0.9s cubic-bezier(.22,.9,.26,1)';
  track.style.width = `${slides.length * 100}%`;
  slides.forEach(s => s.style.minWidth='100%');

  update();
  setInterval(()=>{ idx = (idx+1) % slides.length; update(); }, 3800);
})();

// Inquiry form validation + open whatsapp with prefilled message
const form = document.getElementById('inquiryForm');
const waLink = document.getElementById('waLink');

// update wa link text
waLink.textContent = 'Chat Owner';
waLink.href = `https://wa.me/${OWNER_WA_NUMBER}`; //whatsapp link needed

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(!form.checkValidity()){
    form.reportValidity();
    return;
  }
  const name = encodeURIComponent(document.getElementById('name').value.trim());
  const phone = encodeURIComponent(document.getElementById('phone').value.trim());
  const cartype = encodeURIComponent(document.getElementById('cartype').value.trim());
  const message = encodeURIComponent(document.getElementById('message').value.trim());

  const text = `Hello, I am ${name} (${phone}). I am interested in: ${cartype}. Message: ${message}`;
  const waUrl = `https://wa.me/${OWNER_WA_NUMBER}?text=${text}`;
  // open whatsapp in new tab
  window.open(waUrl, '_blank');
});

// Quick CTA handlers
document.getElementById('getQuoteBtn').addEventListener('click', ()=>{
  document.getElementById('quoteCta').scrollIntoView({behavior:'smooth'});
});

// floating whatsapp quick open
document.getElementById('whatsappFloat').addEventListener('click', (e)=>{
  e.preventDefault();
  window.open(`https://wa.me/${OWNER_WA_NUMBER}`,'_blank'); //waiting for the original watsapp link
});

// Why Whatsapp btn
document.getElementById('whyWhatsapp').addEventListener('click', ()=>{
  window.open(`https://wa.me/${OWNER_WA_NUMBER}`,'_blank'); //waiting for original watsapp link
});

// small accessibility: keyboard submit for quoteCta
const quoteCta = document.getElementById('quoteCta');
quoteCta.addEventListener('click', ()=> document.getElementById('name').focus());

// smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (ev)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){ ev.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  })
});

// Scroll-to-top button logic
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
