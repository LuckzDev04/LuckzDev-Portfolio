/**
 * LUCKZDEV // NEXUS PROTOCOL - 3D CYBERNETIC COMMAND CENTER CANVAS
 * 3D Perspective Wireframe Horizon, Undulating Cyber Waves & Flowing Matrix Telemetry Streams.
 * Optimized for buttery 60 FPS, low CPU/GPU footprint, and battery preservation.
 */

export function initAtmosphereCanvas() {
  const canvas = document.getElementById('atmosphere-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mouse interaction coordinates
  let mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2
  };

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  // 1. Cyber Binary & Hex Stream Columns
  const streamCount = Math.floor(width / 70);
  const streams = [];
  const chars = '01010101ABCDEF7F9A0x';

  for (let i = 0; i < streamCount; i++) {
    streams.push({
      x: i * 70 + Math.random() * 20,
      y: Math.random() * height,
      speed: Math.random() * 1.5 + 0.5,
      char: chars[Math.floor(Math.random() * chars.length)],
      alpha: Math.random() * 0.25 + 0.05
    });
  }

  // 2. Floating Cyber Constellation Nodes
  const nodeCount = width < 768 ? 25 : 55;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '0, 229, 255' : '139, 92, 246'
    });
  }

  let isRunning = true;
  let animId;
  let waveTick = 0;
  let lastFrame = 0;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      cancelAnimationFrame(animId);
    } else {
      isRunning = true;
      loop();
    }
  });

  function loop(timestamp = 0) {
    if (!isRunning) return;
    if (timestamp - lastFrame < 32) {
      animId = requestAnimationFrame(loop);
      return;
    }
    lastFrame = timestamp;

    // Smooth pointer chase
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;
    waveTick += 0.02;

    ctx.clearRect(0, 0, width, height);

    // Dynamic Horizon Grid Height
    const horizonY = height * 0.62;

    // A. 3D Perspective Wireframe Horizon Grid
    ctx.lineWidth = 1;
    const gridCols = 16;
    const perspectiveOffset = (mouse.x - width / 2) * 0.08;

    // Longitudinal Perspective Lines
    for (let c = -gridCols; c <= gridCols; c++) {
      const xStart = width / 2 + c * 35 + perspectiveOffset * 0.5;
      const xEnd = width / 2 + c * 180 + perspectiveOffset * 2.5;

      ctx.beginPath();
      ctx.moveTo(xStart, horizonY);
      ctx.lineTo(xEnd, height);
      ctx.strokeStyle = `rgba(0, 229, 255, ${Math.max(0.02, 0.12 - Math.abs(c) * 0.006)})`;
      ctx.stroke();
    }

    // Transverse Cyber Waves (Horizontal Lines with depth curve)
    const waveCount = 9;
    for (let w = 1; w <= waveCount; w++) {
      const progress = w / waveCount;
      const y = horizonY + Math.pow(progress, 1.8) * (height - horizonY);
      const waveAlpha = progress * 0.18;

      ctx.beginPath();
      for (let x = 0; x <= width; x += 40) {
        const waveOffset = Math.sin(x * 0.015 + waveTick + w) * (3 * progress);
        if (x === 0) {
          ctx.moveTo(x, y + waveOffset);
        } else {
          ctx.lineTo(x, y + waveOffset);
        }
      }
      ctx.strokeStyle = `rgba(0, 229, 255, ${waveAlpha})`;
      ctx.stroke();
    }

    // B. Binary & Telemetry Stream Data
    ctx.font = '10px "JetBrains Mono", monospace';
    streams.forEach(s => {
      s.y += s.speed;
      if (s.y > height) {
        s.y = 0;
        s.x = Math.random() * width;
        s.char = chars[Math.floor(Math.random() * chars.length)];
      }

      ctx.fillStyle = `rgba(0, 229, 255, ${s.alpha})`;
      ctx.fillText(s.char, s.x, s.y);
    });

    // C. Constellation Nodes & Connecting Cyber Links
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0) n.x = width;
      if (n.x > width) n.x = 0;
      if (n.y < 0) n.y = height;
      if (n.y > height) n.y = 0;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color}, 0.6)`;
      ctx.fill();

      // Connecting links
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - dist / 100) * 0.15})`;
          ctx.stroke();
        }
      }
    }

    // D. Soft Interactive Pointer Radial Aura
    const radial = ctx.createRadialGradient(
      mouse.x, mouse.y, 10,
      mouse.x, mouse.y, 450
    );
    radial.addColorStop(0, 'rgba(0, 229, 255, 0.06)');
    radial.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
    radial.addColorStop(1, 'rgba(7, 10, 18, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    if (!prefersReduced) {
      animId = requestAnimationFrame(loop);
    }
  }

  loop();
}
