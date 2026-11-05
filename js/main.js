// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Contact form — Web3Forms
const form = document.getElementById('contactForm');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.classList.add('was-validated');
    return;
  }

  const btn      = this.querySelector('button[type="submit"]');
  const successEl = document.getElementById('formSuccess');
  const errorEl   = document.getElementById('formError');

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Envoi…';

  // Construire le payload Web3Forms
  const nom     = document.getElementById('nom').value.trim();
  const email   = document.getElementById('email').value.trim();
  const sujet   = document.getElementById('sujet').value;
  const message = document.getElementById('message').value.trim();

  const payload = {
    access_key:  this.querySelector('[name="access_key"]').value,
    subject:     this.querySelector('[name="subject"]').value,
    from_name:   this.querySelector('[name="from_name"]').value,
    botcheck:    this.querySelector('[name="botcheck"]').checked,
    name:        nom,
    email:       email,
    sujet:       sujet,
    message:     message,
  };

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body:    JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.success) {
      successEl.classList.remove('d-none');
      errorEl.classList.add('d-none');
      this.reset();
      this.classList.remove('was-validated');
    } else {
      throw new Error(data.message || 'Erreur Web3Forms');
    }
  } catch (err) {
    errorEl.classList.remove('d-none');
    successEl.classList.add('d-none');
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-send"></i> Envoyer le message';
  }
});
