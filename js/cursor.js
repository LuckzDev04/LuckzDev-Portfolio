/**
 * LUCKZDEV // NEXUS PROTOCOL - INTERACTIVE CURSOR ENGINE
 * Reactive cyber cursor with contextual labels, particle spark bursts, and hover magnetism.
 * Auto-disables on touch screens and prefers-reduced-motion.
 */

export function initCustomCursor() {
  // Disable if touch screen or reduced motion is preferred
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReduced) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = `
    <div class="cursor-dot"></div>
    <div class="cursor-ring"></div>
    <div class="cursor-badge">ACCESS</div>
  `;
  document.body.appendChild(cursor);

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  const badge = cursor.querySelector('.cursor-badge');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovered = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  }, { passive: true });

  // Smooth ring tracking loop
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;

    const ringDx = ringX - mouseX;
    const ringDy = ringY - mouseY;
    ring.style.transform = `translate(${ringDx}px, ${ringDy}px) ${isHovered ? 'scale(1.18) rotate(45deg)' : 'scale(1) rotate(0deg)'}`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Setup contextual labels for interactive elements
  function setupHoverListeners() {
    const interactables = document.querySelectorAll('a, button, .project-card, .certificate-card, .clickable-node, input, textarea');

    interactables.forEach((el) => {
      if (el._cursorBound) return;
      el._cursorBound = true;

      el.addEventListener('mouseenter', () => {
        isHovered = true;
        cursor.classList.add('active');

        // Contextual label determination
        let label = 'ACCESS';
        const href = el.getAttribute('href');
        if (el.tagName === 'A' && href && href.startsWith('mailto:')) {
          label = 'EMAIL';
        } else if (el.closest('.project-card') || el.classList.contains('btn-explore')) {
          label = 'EXPLORE';
        } else if (el.closest('.certificate-card')) {
          label = 'INSPECT';
        } else if (el.tagName === 'A' && el.getAttribute('target') === '_blank') {
          label = 'EXTERNAL';
        } else if (el.classList.contains('btn-contact')) {
          label = 'TRANSMIT';
        } else if (el.classList.contains('modal-close-btn')) {
          label = 'CLOSE';
        }

        badge.textContent = label;
        cursor.classList.add('show-badge');
      });

      el.addEventListener('mouseleave', () => {
        isHovered = false;
        cursor.classList.remove('active');
        cursor.classList.remove('show-badge');
      });
    });
  }

  // Click pulse animation
  window.addEventListener('mousedown', () => {
    ring.style.transform += ' scale(0.8)';
  });

  window.addEventListener('mouseup', () => {
    ring.style.transform = ring.style.transform.replace(' scale(0.8)', '');
  });

  setupHoverListeners();

  // Re-run listener setup when dynamic content renders
  window.addEventListener('contentUpdated', setupHoverListeners);
}
