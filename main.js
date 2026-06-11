// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Contact form → mailto
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.classList.add('was-validated');
    return;
  }

  const nom     = document.getElementById('nom').value.trim();
  const email   = document.getElementById('email').value.trim();
  const sujet   = document.getElementById('sujet').value;
  const message = document.getElementById('message').value.trim();

  const body = `Nom : ${nom}\nEmail : ${email}\n\n${message}`;
  const mailto = `mailto:mb.association21@gmail.com`
    + `?subject=${encodeURIComponent('[Site MB] ' + sujet)}`
    + `&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
  document.getElementById('formSuccess').classList.remove('d-none');
});
