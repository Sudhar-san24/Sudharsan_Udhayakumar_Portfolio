document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', (!expanded).toString());
      links.classList.toggle('show');
    });
  }

  const cvLink = document.getElementById('download-cv');
  if (cvLink) {
    cvLink.addEventListener('click', async (e) => {
      const href = cvLink.getAttribute('href');
      if (!href) return;
      try {
        e.preventDefault();
        const res = await fetch(href, { method: 'HEAD', cache: 'no-cache' });
        if (!res.ok) {
          window.open(href, '_blank', 'noopener');
          return;
        }
        const a = document.createElement('a');
        a.href = href;
        a.download = href.split('/').pop() || 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (_) {
        window.open(href, '_blank', 'noopener');
      }
    });
  }
});

