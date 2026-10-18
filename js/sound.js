/**
 * LUCKZDEV // NEXUS PROTOCOL - HUD THEME AND WEB AUDIO SOUND ENGINE
 * Plays the supplied ambient theme and synthesizes responsive interface sound effects.
 */

let audioCtx = null;
let isSoundMuted = false;
let lastHackerLaughAt = 0;
let themeAudio = null;
let lastScrollSoundAt = 0;
let bootSoundPending = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function initSoundSystem() {
  isSoundMuted = localStorage.getItem('luckzdev_sound_muted') === 'true';
  themeAudio = document.getElementById('ambient-theme');
  if (themeAudio) {
    themeAudio.volume = 0.2;
    themeAudio.addEventListener('error', () => {
      console.error('Unable to load the HUD ambient theme audio.');
    });
  }
  updateSoundButtonUI();
  if (!isSoundMuted) playBackgroundTheme();

  const soundBtn = document.getElementById('btn-nav-sound');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isSoundMuted = !isSoundMuted;
      localStorage.setItem('luckzdev_sound_muted', isSoundMuted);
      updateSoundButtonUI();
      if (!isSoundMuted) unlockAmbientAudio();
      setThemeMuted(isSoundMuted);
      if (!isSoundMuted) playClickSound();
    });
  }

  document.addEventListener('pointerdown', unlockAmbientAudio);
  document.addEventListener('keydown', unlockAmbientAudio);
  document.addEventListener('touchstart', unlockAmbientAudio, { passive: true });
  document.addEventListener('wheel', unlockAmbientAudio, { passive: true });
  window.addEventListener('scroll', unlockAmbientAudioOnScroll, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (themeAudio) themeAudio.pause();
    } else if (!isSoundMuted) {
      playBackgroundTheme();
    }
  });
  bindInteractiveSounds();
}

function unlockAmbientAudioOnScroll(event) {
  if (!event.isTrusted) return;
  unlockAmbientAudio();
}

function unlockAmbientAudio() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    const shouldPlayBootSound = bootSoundPending;
    ctx.resume().then(() => {
      if (shouldPlayBootSound && !isSoundMuted && !document.hidden) playBootSoundNow(ctx);
    }).catch(error => {
      console.error('Unable to resume the HUD audio context.', error);
    });
  } else if (ctx && bootSoundPending) {
    playBootSoundNow(ctx);
  }
  playBackgroundTheme();
}

export function playBootSound() {
  bootSoundPending = true;
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state !== 'running') {
    return;
  }
  playBootSoundNow(ctx);
}

export function activateBootSound() {
  isSoundMuted = false;
  localStorage.setItem('luckzdev_sound_muted', 'false');
  updateSoundButtonUI();

  const ctx = getAudioContext();
  if (!ctx) {
    console.error('Web Audio is unavailable; unable to play the initialization sound.');
    return;
  }

  if (ctx.state === 'running') {
    playBootSoundNow(ctx);
  } else {
    ctx.resume().then(() => {
      playBootSoundNow(ctx);
    }).catch(error => {
      console.error('Unable to enable the portfolio initialization sound.', error);
    });
  }
  playBackgroundTheme();
}

function playBootSoundNow(ctx) {
  bootSoundPending = false;
  if (isSoundMuted || document.hidden || ctx.state !== 'running') return;

  try {
    const startAt = ctx.currentTime + 0.02;
    [
      { frequency: 220, offset: 0, duration: 0.22 },
      { frequency: 440, offset: 0.12, duration: 0.24 },
      { frequency: 660, offset: 0.28, duration: 0.36 }
    ].forEach(({ frequency, offset, duration }) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteStart = startAt + offset;

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.045, noteStart + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + duration);
    });
  } catch (error) {
    console.error('Unable to play the portfolio initialization sound.', error);
  }
}

function playBackgroundTheme() {
  if (!themeAudio || isSoundMuted || document.hidden) return;
  const playback = themeAudio.play();
  if (playback) {
    playback.catch(error => {
      if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
        console.error('Unable to play the HUD ambient theme audio.', error);
      }
    });
  }
}

function setThemeMuted(muted) {
  if (!themeAudio) return;
  if (muted) themeAudio.pause();
  else playBackgroundTheme();
}

export function bindInteractiveSounds() {
  const hoverElements = document.querySelectorAll('a, button, .project-card, .certificate-card, .clickable-node, .filter-btn');

  hoverElements.forEach(el => {
    // Avoid multiple bindings
    if (el._soundBound) return;
    el._soundBound = true;

    el.addEventListener('mouseenter', () => {
      playHoverSound();
    });

    el.addEventListener('click', () => {
      playClickSound();
    });
  });
}

export function playHoverSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch (e) {
    // Audio context not allowed or failed
  }
}

export function playClickSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.065);
  } catch (e) {
    // Audio context safe fallback
  }
}

export function playGlitchSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.5));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, ctx.currentTime);
    filter.Q.setValueAtTime(3.0, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {}
}

export function playHackerLaugh() {
  if (isSoundMuted || Date.now() - lastHackerLaughAt < 2500) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  lastHackerLaughAt = Date.now();

  try {
    const startAt = ctx.currentTime + 0.02;
    const syllables = [
      { offset: 0, duration: 0.16, pitch: 132 },
      { offset: 0.23, duration: 0.19, pitch: 116 },
      { offset: 0.51, duration: 0.15, pitch: 126 },
      { offset: 0.77, duration: 0.2, pitch: 108 }
    ];
    const endAt = startAt + 1.08;

    const voice = ctx.createOscillator();
    const formantLow = ctx.createBiquadFilter();
    const formantHigh = ctx.createBiquadFilter();
    const voiceGain = ctx.createGain();

    voice.type = 'sawtooth';
    voice.frequency.setValueAtTime(syllables[0].pitch, startAt);
    formantLow.type = 'peaking';
    formantLow.frequency.setValueAtTime(720, startAt);
    formantLow.Q.setValueAtTime(3.5, startAt);
    formantLow.gain.setValueAtTime(7, startAt);
    formantHigh.type = 'peaking';
    formantHigh.frequency.setValueAtTime(1250, startAt);
    formantHigh.Q.setValueAtTime(4, startAt);
    formantHigh.gain.setValueAtTime(5, startAt);
    voiceGain.gain.setValueAtTime(0.0001, startAt);

    voice.connect(formantLow);
    formantLow.connect(formantHigh);
    formantHigh.connect(voiceGain);
    voiceGain.connect(ctx.destination);

    const breathBuffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 1.1), ctx.sampleRate);
    const breathData = breathBuffer.getChannelData(0);
    for (let i = 0; i < breathData.length; i++) {
      breathData[i] = (Math.random() * 2 - 1) * 0.35;
    }

    const breath = ctx.createBufferSource();
    const breathFilter = ctx.createBiquadFilter();
    const breathGain = ctx.createGain();
    breath.buffer = breathBuffer;
    breathFilter.type = 'bandpass';
    breathFilter.frequency.setValueAtTime(1900, startAt);
    breathFilter.Q.setValueAtTime(0.7, startAt);
    breathGain.gain.setValueAtTime(0.0001, startAt);
    breath.connect(breathFilter);
    breathFilter.connect(breathGain);
    breathGain.connect(ctx.destination);

    for (const syllable of syllables) {
      const onset = startAt + syllable.offset;
      const peak = onset + 0.035;
      const release = onset + syllable.duration;
      voice.frequency.setValueAtTime(syllable.pitch, onset);
      voice.frequency.exponentialRampToValueAtTime(syllable.pitch * 0.82, release);
      voiceGain.gain.setValueAtTime(0.0001, onset);
      voiceGain.gain.exponentialRampToValueAtTime(0.075, peak);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, release);
      breathGain.gain.setValueAtTime(0.0001, onset);
      breathGain.gain.exponentialRampToValueAtTime(0.012, peak);
      breathGain.gain.exponentialRampToValueAtTime(0.0001, release);
    }

    voice.start(startAt);
    voice.stop(endAt);
    breath.start(startAt);
    breath.stop(endAt);
  } catch (e) {}
}

export function playModalSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

export function playRocketSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.95);
  } catch (e) {}
}

export function playScrollSound() {
  const now = Date.now();
  if (isSoundMuted || now - lastScrollSoundAt < 650) return;
  lastScrollSoundAt = now;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const oscillator = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(310, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.055);
    filter.type = 'highpass';
    filter.frequency.value = 240;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.012, ctx.currentTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.095);
  } catch (e) {}
}

function updateSoundButtonUI() {
  const btn = document.getElementById('btn-nav-sound');
  if (!btn) return;

  if (isSoundMuted) {
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    `;
    btn.setAttribute('title', 'HUD music and cyber sound effects are off. Click to turn them on.');
    btn.setAttribute('aria-label', 'Turn on HUD music and cyber sound effects');
    btn.setAttribute('aria-pressed', 'false');
  } else {
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
    `;
    btn.setAttribute('title', 'HUD music and cyber sound effects are on. If playback is blocked, tap anywhere to start.');
    btn.setAttribute('aria-label', 'Mute HUD music and cyber sound effects');
    btn.setAttribute('aria-pressed', 'true');
  }
}
