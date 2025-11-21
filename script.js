/* -------------------------------
   HERO TYPING ANIMATION (Typed.js)
---------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const typedSpan = document.querySelector(".typed");

  if (typedSpan) {
    new Typed(".typed", {
      strings: typedSpan.getAttribute("data-typed-items").split(","),
      typeSpeed: 60,
      backSpeed: 40,
      smartBackspace: true,
      loop: true
    });
  }
});

/* Year in footer */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ------------------------------------------
   ACTIVE NAVIGATION ON SCROLL (works great)
------------------------------------------- */
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('main .section, main .hero'));

function onScroll(){
  const scrollY = window.scrollY + 120;

  navLinks.forEach(link => link.classList.remove('active'));

  for (const sec of sections) {
    if (sec.offsetTop <= scrollY && (sec.offsetTop + sec.offsetHeight) > scrollY){
      const id = sec.id;
      const active = document.querySelector('.nav-link[href="#' + id + '"]');
      if (active) active.classList.add('active');
      return;
    }
  }

  navLinks[0].classList.add('active');
}

window.addEventListener('scroll', onScroll);
onScroll();

/* ----------------------------------------------
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
----------------------------------------------- */
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

/* ----------------------------------------------
   CONTACT FORM — FORMSPREE COMPATIBLE
----------------------------------------------- */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", async function(e){
    e.preventDefault();

    const status = document.getElementById("formStatus");
    status.textContent = "Sending...";

    const formData = new FormData(this);

    try {
      const resp = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (resp.ok){
        status.textContent = "Message sent!";
        this.reset();
      } else {
        status.textContent = "Form error — check Formspree settings.";
      }
    } catch (err) {
      status.textContent = "Unable to send — no backend configured.";
    }
  });
}
