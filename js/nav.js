(function () {
  const links = Array.from(document.querySelectorAll('.rail-link'));
  const sections = links.map(link => document.getElementById(link.dataset.target)).filter(Boolean);

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const id = this.dataset.target;
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if ('IntersectionObserver' in window && sections.length) {
    const options = { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.id;
          links.forEach(link => link.classList.toggle('active', link.dataset.target === activeId));
        }
      });
    }, options);

    sections.forEach(section => observer.observe(section));
  }

  const revealSections = Array.from(document.querySelectorAll('.story-section'));
  if ('IntersectionObserver' in window && revealSections.length) {
    const revealOptions = { root: null, rootMargin: '-10% 0px -10% 0px', threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealSections.forEach(section => revealObserver.observe(section));
  }

  // ── Dot ↔ project-list-item hover bridge ──────────────────
  const dots = Array.from(document.querySelectorAll('.project-dot'));
  dots.forEach(function(dot) {
    const project = dot.dataset.project;
    const item = document.querySelector('.project-list-item[href$="' + project + '"]');
    if (!item) return;

    // Dot hover → activate list item
    dot.addEventListener('mouseenter', function() {
      item.classList.add('dot-hovered');
    });
    dot.addEventListener('mouseleave', function() {
      item.classList.remove('dot-hovered');
    });

    // List item hover → activate dot
    item.addEventListener('mouseenter', function() {
      dot.classList.add('dot-active');
    });
    item.addEventListener('mouseleave', function() {
      dot.classList.remove('dot-active');
    });

    // Dot click → navigate to project page
    dot.addEventListener('click', function() {
      window.location.href = project;
    });
  });
})();
