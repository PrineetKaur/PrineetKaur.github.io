// Typing effect
const types = ["Frontend Developer", "UI/UX Designer", "React Enthusiast", "Open Source Contributor"];
let tIndex = 0;
let charIndex = 0;
let forward = true;
const typedEl = document.getElementById('typed');
const cursor = document.querySelector('.cursor');

function tick() {
  const current = types[tIndex];
  if (forward) {
    charIndex++;
    if (charIndex > current.length) {
      forward = false;
      setTimeout(tick, 1000);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      forward = true;
      tIndex = (tIndex + 1) % types.length;
      setTimeout(tick, 200);
      return;
    }
  }
  typedEl.textContent = current.slice(0, charIndex);
  setTimeout(tick, forward ? 90 : 40);
}
if (typedEl) tick();

// Set year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling + active nav highlight
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('main .section, main .hero'));

function onScroll(){
  const scrollY = window.scrollY + 120;
  for (const link of navLinks) link.classList.remove('active');
  let found = false;
  for (const sec of sections){
    if (sec.offsetTop <= scrollY && (sec.offsetTop + sec.offsetHeight) > scrollY){
      const id = sec.id;
      const active = document.querySelector('.nav-link[href="#' + id + '"]');
      if (active){ active.classList.add('active'); found = true; }
      break;
    }
  }
  if (!found) navLinks[0].classList.add('active');
}
window.addEventListener('scroll', onScroll);
onScroll();

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if (href.length>1){
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Contact form (example - no backend). Replace action with your Formspree endpoint if desired.
document.getElementById('contactForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = "Sending...";
  const form = new FormData(this);

  // Example: try to POST to Formspree (replace URL with your own)
  try{
    const resp = await fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: form
    });
    if (resp.ok){
      status.textContent = "Thanks! Message sent.";
      this.reset();
    } else {
      status.textContent = "Could not send. Replace Formspree ID or handle server-side.";
    }
  }catch(err){
    status.textContent = "Preview mode: no real endpoint. Replace with Formspree or your backend.";
  }
});
