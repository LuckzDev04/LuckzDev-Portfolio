/**
 * LUCKZDEV // NEXUS PROTOCOL - APPLICATION ORCHESTRATOR
 * Developer: Lucky Arlie T. Evangelista (LuckzDev)
 */

import { PROFILE_DATA, SOCIAL_LINKS, PROJECTS_DATA, SKILLS_DATA, CERTIFICATES_DATA, TIMELINE_DATA } from './data.js';
import { initAtmosphereCanvas } from './particles.js';
import { initCustomCursor } from './cursor.js';
import { initAudioSystem } from './audio.js';
import { initNetworkSimulator } from './network.js';
import { triggerRocketLaunch } from './rocket.js';
import { initSoundSystem, playBootSound, playGlitchSound, playHackerLaugh, playModalSound, playRocketSound } from './sound.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas Atmosphere, Custom Cursor & Procedural Audio Engine
  initAtmosphereCanvas();
  initCustomCursor();
  initAudioSystem();
  initSoundSystem();

  // 2. Setup System Boot Initialization Sequence
  setupSystemBootSequence();

  // 3. Render Portfolio Components
  renderHeroRoleRotator();
  renderAboutSection();
  renderProjectsSection();
  renderSkillsSection();
  renderTimelineSection();
  renderCertificatesSection();
  renderContactSection();
  renderFooter();

  // 4. Navigation & System Clock
  setupNavigation();
  setupSystemClock();

  // 5. Initialize Cisco Network Simulation
  initNetworkSimulator();

  // 6. Bind Signature Rocket Interaction
  setupRocketButton();

  // 7. Advanced Interactive Cyber Systems: Hacker Glitch, 3D Gyro Card Tilt & Scroll HUD
  setupPortraitGlitchSystem();
  setup3DCardTilt();
  setupScrollDepthHUD();
  setupScrollEffects();
  setupMobileCarouselControls();

  // Notify listeners that initial DOM content is ready
  window.dispatchEvent(new CustomEvent('contentUpdated'));
});

/**
 * CINEMATIC SYSTEM BOOT SEQUENCE
 */
function setupSystemBootSequence() {
  const bootOverlay = document.getElementById('system-boot-overlay');
  const terminalOutput = document.getElementById('boot-terminal-output');
  const progressFill = document.getElementById('boot-progress-fill');
  const progressPercent = document.getElementById('boot-progress-percent');
  const skipBtn = document.getElementById('btn-skip-boot');

  if (!bootOverlay) return;
  playBootSound();

  const terminalMessages = [
    { text: "LUCKZDEV PORTFOLIO | VERSION 2.4", class: "accent", delay: 200 },
    { text: "Loading portfolio components...", class: "", delay: 450 },
    { text: "Preparing the visual experience...", class: "cyan", delay: 500 },
    { text: "Loading profile: Lucky Arlie T. Evangelista...", class: "", delay: 550 },
    { text: "Preparing project and skills showcases...", class: "", delay: 600 },
    { text: "Loading networking demonstrations...", class: "", delay: 550 },
    { text: "Portfolio ready. Welcome.", class: "success", delay: 600 }
  ];

  let currentMsgIndex = 0;
  let totalBootTime = 3800; // Fast and respectful, not an artificial blocker
  let startTime = Date.now();
  let bootInterval;
  let bootCompleted = false;

  function typeNextMessage() {
    if (currentMsgIndex >= terminalMessages.length) return;
    const msg = terminalMessages[currentMsgIndex];
    const line = document.createElement('div');
    line.className = `terminal-line ${msg.class || ''}`;
    line.innerHTML = `<span style="color: #64748B;">></span> ${msg.text}`;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    currentMsgIndex++;

    if (currentMsgIndex < terminalMessages.length) {
      setTimeout(typeNextMessage, msg.delay);
    }
  }

  // Progress Bar Increment
  bootInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(100, Math.floor((elapsed / totalBootTime) * 100));

    if (progressFill) progressFill.style.width = `${progress}%`;
    if (progressPercent) progressPercent.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(bootInterval);
      setTimeout(completeBootSequence, 500);
    }
  }, 50);

  // Start message typewriter
  setTimeout(typeNextMessage, 300);

  // Skip Intro Button
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      completeBootSequence();
    });
  }

  function completeBootSequence() {
    if (bootCompleted) return;
    bootCompleted = true;
    clearInterval(bootInterval);
    bootOverlay.classList.add('boot-completed');
    sessionStorage.setItem('luckzdev_boot_completed', 'true');
    window.dispatchEvent(new CustomEvent('portfolioBootComplete'));
    // Trigger identity reveal scanline effect on portrait
    triggerPortraitGlitchReveal();
  }

  // Allow re-triggering boot sequence
  window.replaySystemBoot = function() {
    sessionStorage.removeItem('luckzdev_boot_completed');
    bootOverlay.classList.remove('boot-completed');
    terminalOutput.innerHTML = '';
    currentMsgIndex = 0;
    startTime = Date.now();
    bootCompleted = false;
    playBootSound();
    setTimeout(typeNextMessage, 300);
  };
}

/**
 * IDENTITY REVEAL TRANSITION
 */
function triggerPortraitGlitchReveal() {
  const portraitFrame = document.querySelector('.portrait-cyber-frame');
  if (!portraitFrame) return;

  portraitFrame.style.animation = 'none';
  void portraitFrame.offsetWidth;
  portraitFrame.style.boxShadow = '0 0 50px rgba(0, 229, 255, 0.6)';

  setTimeout(() => {
    portraitFrame.style.boxShadow = '0 0 35px rgba(0, 229, 255, 0.12)';
  }, 900);
}

/**
 * HERO ROLE ROTATOR
 */
function renderHeroRoleRotator() {
  const target = document.getElementById('hero-rotating-role');
  if (!target) return;

  const roles = PROFILE_DATA.rolesRotating;
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();
}

/**
 * ABOUT SECTION: PILLARS & WORKFLOW
 */
function renderAboutSection() {
  const pillarsGrid = document.getElementById('about-pillars-grid');
  if (pillarsGrid) {
    pillarsGrid.innerHTML = PROFILE_DATA.pillars.map(p => `
      <div class="pillar-card">
        <div class="pillar-icon-box">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" />
            <line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" />
            <line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" />
            <line x1="20" y1="14" x2="23" y2="14" />
            <line x1="1" y1="9" x2="4" y2="9" />
            <line x1="1" y1="14" x2="4" y2="14" />
          </svg>
        </div>
        <h3 class="pillar-title">${p.title}</h3>
        <p class="pillar-desc">${p.desc}</p>
      </div>
    `).join('');
  }

  const workflowFlex = document.getElementById('workflow-steps-flex');
  if (workflowFlex) {
    workflowFlex.innerHTML = PROFILE_DATA.workflowSteps.map(s => `
      <div class="workflow-step-node">
        <div class="workflow-step-num font-mono">Step ${s.step}</div>
        <div class="workflow-step-name">${s.name}</div>
        <p class="workflow-step-desc">${s.desc}</p>
      </div>
    `).join('');
  }
}

/**
 * PROJECTS SECTION: CARDS & MODAL
 */
function renderProjectsSection() {
  const grid = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderCards(filter = 'all') {
    if (!grid) return;

    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.categoryFilter === filter);

    grid.innerHTML = filtered.map(p => `
      <div class="project-card" data-project-id="${p.id}">
        <div class="project-thumb-wrap">
          <img src="${p.image}" alt="${p.title}" class="project-thumb-img" loading="lazy" />
          <div class="project-badge-overlay">${p.statusBadge}</div>
        </div>
        <div class="project-body">
          <div class="project-cat-tag">${p.category}</div>
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-overview">${p.shortOverview}</p>
          <div class="project-tech-tags">
            ${p.techStack.map(t => `<span class="tech-tag"><span class="tech-tag-icon" aria-hidden="true">${getSkillGlyph(t)}</span>${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            <span class="project-repository-status">${p.repositoryUrl ? 'SOURCE AVAILABLE' : 'REPOSITORY COMING SOON'}</span>
            <button class="btn-cyber btn-secondary btn-sm btn-open-project" data-id="${p.id}">
              VIEW PROJECT
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Button clicks bubble to the card, so bind only once per card.
    document.querySelectorAll('.project-card').forEach(card => {
      if (card._projectOpenBound) return;
      card._projectOpenBound = true;
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const id = card.dataset.projectId;
        if (id) openProjectModal(id);
      });
    });

    window.dispatchEvent(new CustomEvent('contentUpdated'));
  }

  renderCards('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter);
    });
  });

  setupProjectModal();
}

/**
 * PROJECT DETAIL MODAL
 */
function setupProjectModal() {
  const modal = document.getElementById('project-detail-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function openProjectModal(projectId) {
  playModalSound();
  const modal = document.getElementById('project-detail-modal');
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!modal || !project) return;

  document.getElementById('modal-project-tag').textContent = project.statusBadge;
  document.getElementById('modal-project-title').textContent = project.title;

  const body = document.getElementById('modal-project-content');
  body.innerHTML = `
    <div style="margin-bottom: 24px;">
      <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border-tech); max-height: 380px; object-fit: contain; background: var(--bg-navy);" />
    </div>
    
    <div style="background: rgba(0, 229, 255, 0.05); border-left: 3px solid var(--cyan); padding: 14px 18px; border-radius: 4px; margin-bottom: 24px;">
      <h4 style="color: var(--cyan); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 4px;">PROJECT OVERVIEW</h4>
      <p style="color: #CBD5E1; font-size: 0.9rem;">${project.shortOverview}</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
      <div>
        <h4 style="color: #8B5CF6; font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 8px;">PROBLEM ADDRESSED</h4>
        <p style="color: #94A3B8; font-size: 0.85rem; line-height: 1.6;">${project.problemAddressed}</p>
      </div>
      <div>
        <h4 style="color: #39FF88; font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 8px;">MY CONTRIBUTION</h4>
        <p style="color: #94A3B8; font-size: 0.85rem; line-height: 1.6;">${project.contribution}</p>
      </div>
    </div>

    <div style="margin-bottom: 24px;">
      <h4 style="color: #EAF2FF; font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 12px;">KEY PLANNED FEATURES & SPECIFICATIONS</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
        ${project.keyFeatures.map(f => `
          <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.85rem; color: #CBD5E1;">
            <span style="color: var(--cyan); font-family: var(--font-mono); font-weight: bold;">[+]</span>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="background: rgba(11, 18, 32, 0.8); border: 1px solid var(--border-tech); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 24px;">
      <h4 style="color: var(--cyan); font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 8px;">SYSTEM WORKFLOW</h4>
      <p style="font-family: var(--font-mono); font-size: 0.78rem; color: #39FF88; letter-spacing: 0.5px;">${project.workflow}</p>
    </div>

    <div style="margin-bottom: 24px;">
      <h4 style="color: #94A3B8; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 8px;">TECHNOLOGY SPECIFICATION</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${project.techStack.map(t => `<span class="tech-tag" style="background: rgba(0, 229, 255, 0.1); border-color: rgba(0, 229, 255, 0.3); color: #00E5FF;">${t}</span>`).join('')}
      </div>
    </div>

    <div class="project-repository-panel">
      <span class="project-repository-status">${project.repositoryUrl ? 'PUBLIC REPOSITORY' : 'GITHUB REPOSITORY · COMING SOON'}</span>
      ${project.repositoryUrl
        ? `<a class="btn-cyber btn-secondary btn-sm" href="${project.repositoryUrl}" target="_blank" rel="noopener noreferrer">VIEW SOURCE ON GITHUB</a>`
        : '<span class="project-repository-note">A repository link will appear here once the project source is published.</span>'}
    </div>

    <div style="border-top: 1px solid var(--border-subtle); padding-top: 14px; font-family: var(--font-mono); font-size: 0.72rem; color: #64748B;">
      * Disclaimer: ${project.statusDisclaimer}
    </div>
  `;

  modal.classList.remove('open');
  void modal.offsetWidth;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * SKILLS & TECH STACK SECTION
 */
function renderSkillsSection() {
  const container = document.getElementById('skills-categories-grid');
  if (!container) return;

  container.innerHTML = SKILLS_DATA.map(cat => `
    <div class="skill-category-card">
      <div class="skill-category-header">
        <span class="skill-category-icon" aria-hidden="true">${getCategoryGlyph(cat.icon)}</span>
        <h3 class="skill-category-title font-display">${cat.category}</h3>
      </div>
      <div class="skill-items-list">
        ${cat.skills.map(s => `
          <div class="skill-item-row">
            <div class="skill-item-top">
              <span class="skill-item-identity">
                <span class="skill-icon" aria-hidden="true">${getSkillGlyph(s.name)}</span>
                <span class="skill-item-name">${s.name}</span>
              </span>
              <span class="skill-item-level">${s.level}</span>
            </div>
            <div class="skill-item-desc">${s.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  const telemetry = document.getElementById('skills-telemetry');
  if (!telemetry) return;
  const categories = SKILLS_DATA.map(category => ({
    label: category.category,
    shortLabel: category.category
      .replace(' Development', '')
      .replace(' & Creative Design', '')
      .replace(' & Scripting', '')
      .replace(' & Leadership', '')
      .replace('AI-Assisted', 'AI')
      .replace('Collaboration', 'Team'),
    count: category.skills.length
  }));
  const maximum = Math.max(...categories.map(category => category.count));
  const total = categories.reduce((sum, category) => sum + category.count, 0);

  telemetry.innerHTML = `
    <div class="skills-telemetry-header">
      <div>
        <span class="telemetry-kicker">LIVE INVENTORY GRAPH</span>
        <h3>Toolkit Index by Domain</h3>
      </div>
      <span class="telemetry-status"><span class="status-beacon"></span> INDEXED ${total} ITEMS</span>
    </div>
    <div class="telemetry-chart" role="img" aria-label="${categories.map(category => `${category.label}: ${category.count} items`).join(', ')}">
      ${categories.map(category => `
        <div class="telemetry-bar-column">
          <span class="telemetry-count">${category.count}</span>
          <div class="telemetry-bar-track">
            <span class="telemetry-bar" style="--bar-height: ${Math.round((category.count / maximum) * 100)}%"></span>
          </div>
          <span class="telemetry-label">${category.shortLabel}</span>
        </div>
      `).join('')}
    </div>
    <div class="telemetry-footer"><span>DATA SOURCE: CURRENT SKILLS INVENTORY</span><span>SCAN COMPLETE</span></div>
  `;
  requestAnimationFrame(() => telemetry.classList.add('is-loaded'));
}

function getCategoryGlyph(icon) {
  const glyphs = {
    code: '&lt;/&gt;',
    smartphone: 'M',
    figma: 'F',
    sparkles: '*',
    cpu: 'CPU',
    network: 'NET',
    users: 'TEAM'
  };
  return `<span>${glyphs[icon] || 'SYS'}</span>`;
}

function getSkillGlyph(name) {
  const label = name.toLowerCase();
  if (label.includes('html')) return '5';
  if (label.includes('css')) return '3';
  if (label.includes('javascript')) return 'JS';
  if (label.includes('python')) return 'Py';
  if (label.includes('flutter')) return 'F';
  if (label.includes('dart')) return 'D';
  if (label.includes('figma')) return 'F';
  if (label.includes('copilot')) return 'CP';
  if (label.includes('chatgpt') || label.includes('claude')) return 'AI';
  if (label.includes('gemini')) return 'G';
  if (label.includes('cisco') || label.includes('network') || label.includes('routing') ||
      label.includes('vlan') || label.includes('ipv4')) return 'NET';
  if (label.includes('git')) return 'G';
  if (label.includes('sensor') || label.includes('microcontroller') ||
      label.includes('actuator') || label.includes('power')) return 'HW';
  if (label.includes('ui') || label.includes('wireframe') || label.includes('user experience')) return 'UX';
  return '</>';
}

/**
 * TIMELINE JOURNEY SECTION
 */
function renderTimelineSection() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = `
    <div class="timeline-line"></div>
    ${TIMELINE_DATA.map(t => `
      <div class="timeline-card">
        <div class="timeline-dot"></div>
        <div class="timeline-card-header">
          <span class="timeline-period">${t.period}</span>
          <span class="timeline-tag">${t.tag}</span>
        </div>
        <h3 class="timeline-title">${t.title}</h3>
        <p class="timeline-desc">${t.desc}</p>
      </div>
    `).join('')}
  `;
}

/**
 * CERTIFICATES GALLERY & LIGHTBOX
 */
function renderCertificatesSection() {
  const grid = document.getElementById('certificates-grid');
  if (!grid) return;

  grid.innerHTML = CERTIFICATES_DATA.map(cert => `
    <div class="certificate-card" data-cert-id="${cert.id}">
      <div class="cert-image-preview-wrap">
        <img src="${cert.preview}" data-original-src="${cert.image}" alt="${cert.title}" class="cert-preview-img" loading="eager" decoding="async" />
        <span class="cert-image-error-message" hidden>PREVIEW UNAVAILABLE · SELECT TO OPEN DOCUMENT</span>
        <span class="cert-badge-tag">${cert.verifiedBadge}</span>
      </div>
      <div class="cert-body">
        <div class="cert-issuer">${cert.issuer}</div>
        <h4 class="cert-title">${cert.title}</h4>
        <div class="cert-date">${cert.date}</div>
        <div class="cert-click-prompt">
          <span>RECORD ID: ${cert.certificateId}</span>
          <span style="color: var(--cyan);">INSPECT &rarr;</span>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.cert-preview-img').forEach(image => {
    image.addEventListener('error', () => {
      const originalSrc = image.dataset.originalSrc;
      if (!image.dataset.usedOriginal && originalSrc) {
        image.dataset.usedOriginal = 'true';
        console.warn(`Certificate preview failed to load; using the original image: ${originalSrc}`);
        image.src = originalSrc;
        return;
      }

      image.hidden = true;
      image.closest('.cert-image-preview-wrap')
        ?.querySelector('.cert-image-error-message')?.removeAttribute('hidden');
      console.error(`Certificate image failed to load: ${image.currentSrc || image.src}`);
    });
  });

  // Lightbox Trigger
  document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.certId;
      openCertLightbox(id);
    });
  });

  setupCertLightbox();
}

let currentCertIdx = 0;

function setupCertLightbox() {
  const lightbox = document.getElementById('certificate-lightbox-modal');
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('.modal-close-btn');

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    const imgEl = document.getElementById('lightbox-cert-image');
    if (imgEl) {
      imgEl.style.transform = 'scale(1)';
      imgEl.dataset.zoomed = 'false';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentCertIdx = (currentCertIdx - 1 + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length;
      openCertLightbox(CERTIFICATES_DATA[currentCertIdx].id);
    } else if (e.key === 'ArrowRight') {
      currentCertIdx = (currentCertIdx + 1) % CERTIFICATES_DATA.length;
      openCertLightbox(CERTIFICATES_DATA[currentCertIdx].id);
    }
  });
}

function openCertLightbox(certId) {
  playModalSound();
  const lightbox = document.getElementById('certificate-lightbox-modal');
  const index = CERTIFICATES_DATA.findIndex(c => c.id === certId);
  if (index === -1) return;
  currentCertIdx = index;
  const cert = CERTIFICATES_DATA[currentCertIdx];

  document.getElementById('lightbox-cert-tag').textContent = `${cert.verifiedBadge} | ${currentCertIdx + 1} of ${CERTIFICATES_DATA.length}`;
  document.getElementById('lightbox-cert-title').textContent = cert.title;

  const imgEl = document.getElementById('lightbox-cert-image');
  imgEl.dataset.certId = cert.id;
  imgEl.dataset.currentSource = 'preview';
  imgEl.onerror = () => {
    if (imgEl.dataset.certId !== cert.id) return;
    if (imgEl.dataset.currentSource === 'original') {
      console.warn(`Full-resolution certificate failed to load; keeping its preview visible: ${cert.image}`);
      imgEl.dataset.currentSource = 'preview';
      imgEl.src = cert.preview;
      return;
    }
    imgEl.classList.add('cert-image-unavailable');
    console.error(`Certificate preview failed to load: ${cert.preview}`);
  };
  imgEl.classList.remove('cert-image-unavailable');
  imgEl.src = cert.preview;
  imgEl.alt = cert.title;
  imgEl.style.transform = 'scale(1)';
  imgEl.style.transition = 'transform 0.3s ease';
  imgEl.style.cursor = 'zoom-in';
  imgEl.dataset.zoomed = 'false';

  imgEl.onclick = () => {
    const isZoomed = imgEl.dataset.zoomed === 'true';
    if (isZoomed) {
      imgEl.style.transform = 'scale(1)';
      imgEl.style.cursor = 'zoom-in';
      imgEl.dataset.zoomed = 'false';
    } else {
      imgEl.style.transform = 'scale(1.4)';
      imgEl.style.cursor = 'zoom-out';
      imgEl.dataset.zoomed = 'true';
    }
  };

  const details = document.getElementById('lightbox-cert-details');
  details.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
      <div style="display: flex; gap: 8px;">
        <button id="btn-cert-nav-prev" class="btn-cyber btn-secondary btn-sm" title="Previous document (ArrowLeft)">&larr; PREV</button>
        <button id="btn-cert-nav-next" class="btn-cyber btn-secondary btn-sm" title="Next document (ArrowRight)">NEXT &rarr;</button>
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #00E5FF;">
        DOCUMENT ${currentCertIdx + 1} / ${CERTIFICATES_DATA.length} (CLICK IMAGE TO ZOOM)
      </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
      <div>
        <span style="color: #64748B; font-family: var(--font-mono); font-size: 0.72rem; display: block;">ISSUING BODY</span>
        <strong style="color: #00E5FF; font-size: 0.85rem;">${cert.issuer}</strong>
        <div style="color: #94A3B8; font-size: 0.75rem;">${cert.subIssuer}</div>
      </div>
      <div>
        <span style="color: #64748B; font-family: var(--font-mono); font-size: 0.72rem; display: block;">DATE / ACADEMIC PERIOD</span>
        <strong style="color: #EAF2FF; font-size: 0.85rem;">${cert.date}</strong>
      </div>
      <div>
        <span style="color: #64748B; font-family: var(--font-mono); font-size: 0.72rem; display: block;">RECORD / CERTIFICATE ID</span>
        <strong style="color: #39FF88; font-family: var(--font-mono); font-size: 0.82rem;">${cert.certificateId}</strong>
      </div>
    </div>
    <div style="background: rgba(11, 18, 32, 0.7); border: 1px solid var(--border-subtle); padding: 12px; border-radius: var(--radius-sm); margin-bottom: 12px;">
      <p style="font-size: 0.84rem; color: #CBD5E1; line-height: 1.6;">${cert.summary}</p>
    </div>
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px;">
      <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #8B5CF6;">OFFICIAL / AUTHORIZED SIGNATORY: ${cert.officer}</span>
      <a href="${cert.image}" target="_blank" download class="btn-cyber btn-secondary btn-sm">
        DOWNLOAD DOCUMENT
      </a>
    </div>
  `;

  document.getElementById('btn-cert-nav-prev').onclick = () => {
    currentCertIdx = (currentCertIdx - 1 + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length;
    openCertLightbox(CERTIFICATES_DATA[currentCertIdx].id);
  };
  document.getElementById('btn-cert-nav-next').onclick = () => {
    currentCertIdx = (currentCertIdx + 1) % CERTIFICATES_DATA.length;
    openCertLightbox(CERTIFICATES_DATA[currentCertIdx].id);
  };

  lightbox.classList.remove('open');
  void lightbox.offsetWidth;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';

  const fullResolutionImage = new Image();
  fullResolutionImage.onload = () => {
    if (imgEl.dataset.certId !== cert.id || !lightbox.classList.contains('open')) return;
    imgEl.dataset.currentSource = 'original';
    imgEl.src = cert.image;
  };
  fullResolutionImage.onerror = () => {
    console.warn(`Unable to load full-resolution certificate; its preview will remain visible: ${cert.image}`);
  };
  fullResolutionImage.src = cert.image;
}

/**
 * CONTACT SECTION: SOCIAL LINKS & EMAIL COPY
 */
function renderContactSection() {
  const pillsWrap = document.getElementById('contact-social-pills');
  if (pillsWrap) {
    pillsWrap.innerHTML = SOCIAL_LINKS.map(s => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-pill" style="border-left: 2px solid ${s.color};">
        <span class="social-pill-icon" aria-hidden="true">${getSocialIcon(s.icon)}</span>
        <span>${s.name}</span>
        <span class="social-pill-username">${s.username}</span>
      </a>
    `).join('');
  }

  function getSocialIcon(icon) {
    const paths = {
      github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
      linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
      facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
      instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1"/>',
      tiktok: '<path d="M14 3v11.2a4.3 4.3 0 1 1-3-4.1V7a7.4 7.4 0 1 0 7 7.2V8.8a8 8 0 0 0 4 1.1V6.5A4.8 4.8 0 0 1 17 3z"/>',
      mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[icon] || paths.mail}</svg>`;
  }

  // Copy Email Button
  const copyBtn = document.getElementById('btn-copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('luckyevangelista04@gmail.com').then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#39FF88" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          COPIED!
        `;
        copyBtn.style.borderColor = '#39FF88';
        copyBtn.style.color = '#39FF88';

        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2500);
      });
    });
  }

  // Functional Contact Form
  const form = document.getElementById('contact-nexus-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.innerHTML = 'TRANSMITTING MESSAGE...';
      submitBtn.disabled = true;

      // Construct mailto URL to launch default mail app with the formatted message
      const mailtoUrl = `mailto:luckyevangelista04@gmail.com?subject=${encodeURIComponent('[LUCKZDEV PORTFOLIO] ' + subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;

        const statusEl = document.getElementById('form-status-msg');
        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.innerHTML = `
            <div style="background: rgba(57, 255, 136, 0.1); border: 1px solid #39FF88; color: #39FF88; padding: 12px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.8rem;">
              [TRANSMISSION READY] Email client prepared for Lucky Arlie T. Evangelista. Thank you for connecting!
            </div>
          `;
        }

        submitBtn.innerHTML = 'MESSAGE TRANSMITTED';
        setTimeout(() => {
          submitBtn.innerHTML = 'TRANSMIT MESSAGE';
          submitBtn.disabled = false;
          form.reset();
        }, 4000);
      }, 700);
    });
  }
}

/**
 * FOOTER RENDERING
 */
function renderFooter() {
  const yearEl = document.getElementById('footer-copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playRocketSound();
      triggerRocketLaunch('#home');
    });
  }
}

/**
 * NAVIGATION, SMOOTH SCROLL & ACTIVE TRACKING
 */
function setupNavigation() {
  const nav = document.getElementById('nexus-nav');
  const links = document.querySelectorAll('.nav-link, .mobile-drawer-link');
  const mobileToggle = document.getElementById('btn-mobile-menu');
  const mobileDrawer = document.getElementById('mobile-drawer');

  function setActiveLink(id) {
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href')?.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;

      event.preventDefault();
      setActiveLink(targetId);
      playRocketSound();
      triggerRocketLaunch(`#${targetId}`);
      history.replaceState(null, '', `#${targetId}`);
    });
  });

  // Sticky nav background transition
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer on navigation link click
    links.forEach(l => {
      l.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section tracking via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveLink(id);
      }
    });
  }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

function setupScrollEffects() {
  const progress = document.getElementById('scroll-progress');
  let scrollFrame = 0;
  let previousScrollY = window.scrollY;
  let scrollDirection = 'down';

  function updateScrollProgress() {
    scrollFrame = 0;
    const currentScrollY = window.scrollY;
    if (currentScrollY !== previousScrollY) {
      scrollDirection = currentScrollY < previousScrollY ? 'up' : 'down';
      previousScrollY = currentScrollY;
    }
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressRatio = scrollableHeight > 0 ? Math.min(1, Math.max(0, currentScrollY / scrollableHeight)) : 0;
    if (progress) progress.style.transform = `scaleX(${progressRatio})`;
  }

  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollProgress);
  }, { passive: true });
  updateScrollProgress();

  setupSectionTelemetry();

  const revealSelector = '.section-header, .project-card, .skill-category-card, .timeline-card, .certificate-card, .contact-info-card, .contact-form-card';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('reveal-from-top', scrollDirection === 'up');
      entry.target.classList.toggle('reveal-from-bottom', scrollDirection === 'down');
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

  function observeRevealTargets() {
    document.querySelectorAll(revealSelector).forEach(element => {
      if (element.classList.contains('scroll-reveal')) return;
      element.classList.add('scroll-reveal');
      revealObserver.observe(element);
    });
  }

  observeRevealTargets();
  document.body.classList.add('scroll-effects-ready');
  window.addEventListener('contentUpdated', observeRevealTargets);
}

function setupMobileCarouselControls() {
  const carousels = [
    ['projects-grid', 'projects'],
    ['about-pillars-grid', 'core systems'],
    ['workflow-steps-flex', 'workflow'],
    ['skills-categories-grid', 'skill domains'],
    ['timeline-container', 'timeline'],
    ['certificates-grid', 'certificates']
  ];

  carousels.forEach(([id, label]) => {
    const rail = document.getElementById(id);
    if (!rail || rail.nextElementSibling?.classList.contains('carousel-controls')) return;
    rail.classList.add('carousel-rail');

    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    controls.setAttribute('aria-label', `${label} carousel controls`);
    controls.innerHTML = `
      <button class="carousel-arrow" type="button" data-direction="-1" aria-label="Scroll ${label} left" aria-controls="${id}" disabled>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button class="carousel-arrow" type="button" data-direction="1" aria-label="Scroll ${label} right" aria-controls="${id}" disabled>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    `;
    rail.after(controls);

    const arrows = [...controls.querySelectorAll('.carousel-arrow')];
    let updateFrame = 0;
    let settleTimer = 0;
    let lastScrollLeft = rail.scrollLeft;
    let activeCard = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function updateArrows() {
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      arrows[0].disabled = rail.scrollLeft <= 1;
      arrows[1].disabled = maxScroll <= 1 || rail.scrollLeft >= maxScroll - 1;
      controls.hidden = maxScroll <= 1;

      if (rail.scrollLeft === lastScrollLeft) return;
      lastScrollLeft = rail.scrollLeft;
    }

    function updateActiveCard(animate = true) {
      const previousCard = activeCard;
      const railBounds = rail.getBoundingClientRect();
      const railCenter = railBounds.left + railBounds.width / 2;
      activeCard = [...rail.children].reduce((nearest, card) => {
        const bounds = card.getBoundingClientRect();
        const distance = Math.abs(bounds.left + bounds.width / 2 - railCenter);
        return !nearest || distance < nearest.distance ? { card, distance } : nearest;
      }, null)?.card || null;
      if (previousCard && previousCard !== activeCard) {
        previousCard.classList.remove('is-current', 'is-arriving', 'is-scanning');
      }
      if (activeCard) {
        activeCard.classList.add('is-current');
        if (animate && !reducedMotion && previousCard !== activeCard) {
          const transitionClass = id === 'projects-grid' ? 'is-scanning' : 'is-arriving';
          activeCard.classList.add(transitionClass);
          const arrivingCard = activeCard;
          window.setTimeout(() => arrivingCard.classList.remove('is-arriving', 'is-scanning'), 780);
        }
      }
    }

    function scheduleArrowUpdate() {
      if (updateFrame) return;
      updateFrame = window.requestAnimationFrame(() => {
        updateFrame = 0;
        updateArrows();
      });
    }

    arrows.forEach(button => {
      button.addEventListener('click', () => {
        const firstCard = rail.firstElementChild;
        const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
        const step = (firstCard?.getBoundingClientRect().width || rail.clientWidth * 0.8) + gap;
        rail.scrollBy({
          left: Number(button.dataset.direction) * step,
          behavior: reducedMotion ? 'auto' : 'smooth'
        });
      });
    });

    rail.addEventListener('scroll', () => {
      scheduleArrowUpdate();
      clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        updateActiveCard();
      }, 110);
    }, { passive: true });
    window.addEventListener('resize', scheduleArrowUpdate, { passive: true });
    window.addEventListener('contentUpdated', () => {
      scheduleArrowUpdate();
      updateActiveCard(false);
    });
    updateArrows();
    updateActiveCard(false);
  });
}

function setupSectionTelemetry() {
  const sections = [...document.querySelectorAll('main section[id]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  sections.forEach(section => {
    const header = section.querySelector('.section-header');
    if (!header || header.querySelector('.section-telemetry')) return;

    const telemetry = document.createElement('div');
    telemetry.className = 'section-telemetry';
    telemetry.setAttribute('aria-hidden', 'true');
    telemetry.innerHTML = `
      <span class="section-telemetry-status">${reducedMotion ? 'NODE ONLINE' : 'NODE STANDBY'}</span>
      <span class="section-telemetry-graph">${Array.from({ length: 8 }, (_, index) =>
        `<span style="--bar-height: ${6 + ((index * 7) % 11)}px; --bar-delay: ${index * 45}ms;"></span>`
      ).join('')}</span>
      <span class="section-telemetry-track"><span></span></span>
    `;
    header.appendChild(telemetry);

    if (reducedMotion || !('IntersectionObserver' in window)) {
      section.classList.add('section-online');
    }
  });

  if (reducedMotion || !('IntersectionObserver' in window)) return;

  const initializationTimers = new WeakMap();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const section = entry.target;
      const status = section.querySelector('.section-telemetry-status');
      clearTimeout(initializationTimers.get(section));

      if (!entry.isIntersecting) {
        section.classList.remove('section-initializing', 'section-online');
        if (status) status.textContent = 'NODE STANDBY';
        return;
      }

      section.classList.remove('section-online');
      section.classList.add('section-initializing');
      if (status) status.textContent = 'INITIALIZING NODE';
      initializationTimers.set(section, window.setTimeout(() => {
        if (!section.classList.contains('section-initializing')) return;
        section.classList.remove('section-initializing');
        section.classList.add('section-online');
        if (status) status.textContent = 'NODE ONLINE';
      }, 650));
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

  sections.forEach(section => observer.observe(section));
}

/**
 * LIVE SYSTEM CLOCK
 */
function setupSystemClock() {
  const clockEl = document.getElementById('nexus-system-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds} UTC+8`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * SIGNATURE ROCKET LAUNCH BUTTON
 */
function setupRocketButton() {
  const exploreBtn = document.getElementById('btn-hero-explore');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playRocketSound();
      triggerRocketLaunch('#projects');
    });
  }

  const contactBtn = document.getElementById('btn-hero-contact');
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playRocketSound();
      triggerRocketLaunch('#contact');
    });
  }
}

/**
 * ANONYMOUS HACKER MASK BIOMETRIC GLITCH SYSTEM
 */
function setupPortraitGlitchSystem() {
  const container = document.getElementById('portrait-image-container');
  const statusLabel = document.getElementById('portrait-status-label');
  const toggleBtn = document.getElementById('btn-toggle-hacker-glitch');
  if (!container) return;

  function triggerGlitchFlicker() {
    container.classList.add('glitching');
    playGlitchSound();
    if (statusLabel) {
      statusLabel.textContent = 'DISGUISE: ANONYMOUS_HACKER';
      statusLabel.style.color = '#FF3CAC';
    }

    setTimeout(() => {
      container.classList.remove('glitching');
      if (statusLabel && !container.classList.contains('disguise-active')) {
        statusLabel.textContent = 'IDENTITY: VERIFIED';
        statusLabel.style.color = '#00E5FF';
      }
    }, 600);
  }

  // Periodic subtle biometric glitch every 7 seconds
  setInterval(() => {
    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      triggerGlitchFlicker();
    }
  }, 7000);

  // Trigger glitch on portrait hover
  container.addEventListener('mouseenter', () => {
    triggerGlitchFlicker();
    playHackerLaugh();
  });

  // Toggle button for persistent disguise override
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDisguised = container.classList.toggle('disguise-active');
      playGlitchSound();

      if (isDisguised) {
        toggleBtn.textContent = 'DISGUISE ACTIVE | CLICK TO RESTORE';
        toggleBtn.style.borderColor = '#FF3CAC';
        toggleBtn.style.color = '#FF3CAC';
        if (statusLabel) {
          statusLabel.textContent = 'ANONYMOUS MASK: ACTIVE';
          statusLabel.style.color = '#FF3CAC';
        }
      } else {
        toggleBtn.textContent = '[OVERRIDE: HACKER GLITCH PROTOCOL]';
        toggleBtn.style.borderColor = '';
        toggleBtn.style.color = '';
        if (statusLabel) {
          statusLabel.textContent = 'IDENTITY: VERIFIED';
          statusLabel.style.color = '#00E5FF';
        }
      }
    });
  }
}

/**
 * 3D GYRO PERSPECTIVE CARD TILT ENGINE
 */
function setup3DCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function bindTiltToCards() {
    const cards = document.querySelectorAll('.project-card, .certificate-card, .pillar-card');

    cards.forEach(card => {
      if (card._tiltBound) return;
      card._tiltBound = true;
      card.classList.add('tilt-card');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  bindTiltToCards();
  window.addEventListener('contentUpdated', bindTiltToCards);
}

/**
 * SCROLL DEPTH TELEMETRY HUD
 */
function setupScrollDepthHUD() {
  const percentEl = document.getElementById('hud-scroll-percent');
  if (!percentEl) return;
  const activeNodeEl = document.getElementById('hud-active-section');
  const sections = [...document.querySelectorAll('main section[id]')];

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
      percentEl.textContent = `${scrollPercent}%`;
    }
    if (activeNodeEl) {
      const marker = window.innerHeight * 0.4;
      const activeSection = sections.filter(section => section.getBoundingClientRect().top <= marker).pop() || sections[0];
      if (activeSection) activeNodeEl.textContent = activeSection.id.replace(/-/g, ' ').toUpperCase();
    }
  }, { passive: true });
  window.dispatchEvent(new Event('scroll'));
}
