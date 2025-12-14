(() => {
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const modalCap = document.getElementById('modalCap');

  const open = (src, cap) => {
    modalImg.src = src;
    modalImg.alt = cap || 'Screenshot';
    modalCap.textContent = cap || '';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const img = e.target.closest('figure.shot img');
    if (img) {
      const fig = img.closest('figure');
      const cap = fig?.querySelector('figcaption')?.textContent?.trim() || '';
      open(img.getAttribute('src'), cap);
      return;
    }
    if (e.target.matches('[data-close]')) close();
    if (e.target === modalImg) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  const btnPrint = document.getElementById('btnPrint');
  if (btnPrint) btnPrint.addEventListener('click', () => window.print());

  // Smooth scroll for sidebar links
  document.querySelectorAll('.sidebar__nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });
})();