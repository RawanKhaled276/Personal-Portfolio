/* TYPING ANIMATION */
  const phrases = [
    "Full Stack Web Developer",
    "Frontend Developer",
    "Software Developer",
    "DEPI Trainee"
    
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;
  const typingEl = document.getElementById('typing-text');
  function type() {
    const current = phrases[phraseIdx];
    typingEl.textContent = deleting
      ? current.substring(0, charIdx--)
      : current.substring(0, charIdx++);
    if (!deleting && charIdx > current.length) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
    if (deleting && charIdx < 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();

  /* NAVBAR SCROLL */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    const backTop = document.getElementById('back-top');
    if (window.scrollY > 400) backTop.classList.add('show');
    else backTop.classList.remove('show');
    // active nav
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  /* MOBILE NAV */
  document.getElementById('menu-open').onclick = () => document.getElementById('mobile-nav').classList.add('open');
  document.getElementById('menu-close').onclick = () => document.getElementById('mobile-nav').classList.remove('open');
  document.querySelectorAll('.mobile-nav-link').forEach(a => {
    a.onclick = () => document.getElementById('mobile-nav').classList.remove('open');
  });

  /* SCROLL REVEAL */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  /* SKILL BAR ANIMATION */
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar').forEach(b => b.classList.add('animated'));
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('#skills .section-inner').forEach(s => barObs.observe(s));

  /* DARK/LIGHT TOGGLE */
  const toggle = document.getElementById('theme-toggle');
  toggle.onclick = () => {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');
    toggle.innerHTML = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  };

  /* CONTACT FORM */
  function handleFormSubmit() {
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const msg = document.getElementById('cf-msg').value.trim();
    if (!name || !email || !msg) {
      alert('Please fill in all required fields.');
      return;
    }
    const mailto = `mailto:rawankhaled461@gmail.com?subject=${encodeURIComponent(document.getElementById('cf-subject').value || 'Portfolio Contact')}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg)}`;
    window.location.href = mailto;
    document.getElementById('form-success').style.display = 'block';
  }