/**
 * LUCKZDEV // NEXUS PROTOCOL - SIGNATURE ROCKET LAUNCH ENGINE
 * Initiates an upward cyber rocket launch with cyan & violet particle exhaust and warp ripple.
 * Gracefully degrades when prefers-reduced-motion is active.
 */

export function triggerRocketLaunch(targetId = '#projects') {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Find target element
  const targetElement = document.querySelector(targetId);

  if (prefersReduced) {
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  // Visual Warp Ripple
  let ripple = document.querySelector('.screen-warp-ripple');
  if (!ripple) {
    ripple = document.createElement('div');
    ripple.className = 'screen-warp-ripple';
    document.body.appendChild(ripple);
  }
  ripple.classList.add('warp-active');

  // Create Rocket Launch Entity
  const rocket = document.createElement('div');
  rocket.style.position = 'fixed';
  rocket.style.bottom = '10%';
  rocket.style.left = '50%';
  rocket.style.transform = 'translate(-50%, 0) scale(1)';
  rocket.style.zIndex = '999999';
  rocket.style.pointerEvents = 'none';
  rocket.style.transition = 'transform 1.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1.3s ease';

  rocket.innerHTML = `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
      <!-- Futuristic Cyber Rocket SVG -->
      <svg width="44" height="60" viewBox="0 0 44 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 14px #00E5FF);">
        <!-- Main Fuselage -->
        <path d="M22 2 C16 15 12 30 12 44 L32 44 C32 30 28 15 22 2 Z" fill="#0B1220" stroke="#00E5FF" stroke-width="2"/>
        <!-- Cockpit Glass -->
        <polygon points="22,12 17,26 27,26" fill="#00E5FF" opacity="0.8"/>
        <!-- Left Wing -->
        <path d="M12 32 L2 48 L12 45 Z" fill="#8B5CF6" stroke="#00E5FF" stroke-width="1.5"/>
        <!-- Right Wing -->
        <path d="M32 32 L42 48 L32 45 Z" fill="#8B5CF6" stroke="#00E5FF" stroke-width="1.5"/>
        <!-- Engine Thruster Nozzle -->
        <rect x="18" y="44" width="8" height="6" fill="#FF3CAC"/>
      </svg>
      <!-- Dual Plasma Flame Exhaust -->
      <div style="width: 10px; height: 90px; background: linear-gradient(180deg, #00E5FF, #8B5CF6, transparent); border-radius: 5px; box-shadow: 0 0 20px #00E5FF; animation: pulse-glow 0.1s infinite alternate;"></div>
    </div>
  `;

  document.body.appendChild(rocket);

  // Spawn trail micro-sparks
  const sparkInterval = setInterval(() => {
    const spark = document.createElement('div');
    spark.style.position = 'fixed';
    const rect = rocket.getBoundingClientRect();
    spark.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 20}px`;
    spark.style.top = `${rect.bottom - 20}px`;
    spark.style.width = `${Math.random() * 6 + 2}px`;
    spark.style.height = spark.style.width;
    spark.style.borderRadius = '50%';
    spark.style.backgroundColor = Math.random() > 0.5 ? '#00E5FF' : '#FF3CAC';
    spark.style.boxShadow = '0 0 10px #00E5FF';
    spark.style.pointerEvents = 'none';
    spark.style.zIndex = '999998';
    spark.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
    document.body.appendChild(spark);

    requestAnimationFrame(() => {
      spark.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${Math.random() * 50 + 20}px) scale(0)`;
      spark.style.opacity = '0';
    });

    setTimeout(() => spark.remove(), 400);
  }, 40);

  // Animate Rocket Soaring Upwards
  requestAnimationFrame(() => {
    rocket.style.transform = 'translate(-50%, -120vh) scale(1.15)';
    rocket.style.opacity = '0.9';
  });

  // Smooth scroll page synchronously with the ascent
  setTimeout(() => {
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 350);

  // Clean up
  setTimeout(() => {
    clearInterval(sparkInterval);
    ripple.classList.remove('warp-active');
    rocket.remove();
  }, 1400);
}
