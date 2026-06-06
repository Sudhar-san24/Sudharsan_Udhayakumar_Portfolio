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

  document.querySelectorAll('.download-cv').forEach((cvLink) => {
    cvLink.addEventListener('click', async (e) => {
      const href = cvLink.getAttribute('href');
      if (!href) return;
      const filename = cvLink.getAttribute('download') || href.split('/').pop() || 'Sudharsan_Resume.pdf';
      // On hosted sites, let the browser open/download the PDF directly
      if (location.protocol === 'http:' || location.protocol === 'https:') return;
      e.preventDefault();
      try {
        const res = await fetch(href);
        if (!res.ok) throw new Error('fetch failed');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (_) {
        window.open(href, '_blank', 'noopener');
      }
    });
  });
});

