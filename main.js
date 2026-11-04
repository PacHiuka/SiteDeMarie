// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Contact form — Netlify Forms (fetch) avec fallback mailto
const form = document.getElementById('contactForm');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.classList.add('was-validated');
    return;
  }

  const btn = this.querySelector('button[type="submit"]');
  const successEl = document.getElementById('formSuccess');
  const errorEl = document.getElementById('formError');

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Envoi…';

  try {
    const data = new FormData(this);
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    });

    if (res.ok) {
      successEl.classList.remove('d-none');
      errorEl.classList.add('d-none');
      this.reset();
      this.classList.remove('was-validated');
    } else {
      throw new Error('Netlify response ' + res.status);
    }
  } catch {
    // Fallback mailto si Netlify Forms non disponible (dev local)
    const nom     = document.getElementById('nom').value.trim();
    const email   = document.getElementById('email').value.trim();
    const sujet   = document.getElementById('sujet').value;
    const message = document.getElementById('message').value.trim();
    const body    = `Nom : ${nom}\nEmail : ${email}\n\n${message}`;
    window.location.href =
      `mailto:mb.association21@gmail.com` +
      `?subject=${encodeURIComponent('[Site MB] ' + sujet)}` +
      `&body=${encodeURIComponent(body)}`;
    successEl.classList.remove('d-none');
    errorEl.classList.add('d-none');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-send"></i> Envoyer le message';
  }
});
