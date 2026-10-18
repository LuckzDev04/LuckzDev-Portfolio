/**
 * LUCKZDEV // NEXUS PROTOCOL - AI VOICE INTERFACE ENGINE
 * Recorded narration for a consistent voice across browsers and devices.
 */

import { activateBootSound } from './sound.js';

const BOOT_ANNOUNCEMENT = "Initializing portfolio systems. Loading project database. Establishing secure network simulation. Systems ready.";
const AI_GREETING_SCRIPT = "LuckzDev AI online. Welcome to the digital command center of Lucky Arlie T. Evangelista — LuckzDev. Computer Engineering student at ICCT Colleges, frontend developer, and aspiring network engineer. Systems online. All firewalls and simulation protocols synchronized. Behind every line of code lies an idea waiting to become reality. Explore the project blueprints, inspect the verified academic credentials, and examine the intelligence behind the network. Standing by for command.";
const bootAnnouncementAudio = new Audio(new URL('../assets/audio/boot-announcement.wav', import.meta.url));
const aiGreetingAudio = new Audio(new URL('../assets/audio/ai-greeting.wav', import.meta.url));
bootAnnouncementAudio.preload = 'auto';
aiGreetingAudio.preload = 'auto';

let isAudioEnabled = false;
let subtitleBar = null;
let voicePrompt = null;
let waveBars = [];
let bootVoicePlaying = false;
let bootVoicePending = false;
let bootVoiceStarted = false;
let bootVoiceFallbackHandler = null;
let bootVoiceFallbackTimer = 0;
let autoGreetingRequested = false;
let autoGreetingAttempted = false;
let autoGreetingStarted = false;
let greetingFallbackBound = false;
let greetingFallbackHandler = null;
let greetingPlayedManually = false;

export function initAudioSystem() {
  subtitleBar = document.getElementById('ai-voice-subtitles');
  voicePrompt = document.getElementById('ai-voice-prompt');
  waveBars = document.querySelectorAll('.wave-bar');

  // Bind audio control buttons
  const toggleBtn = document.getElementById('btn-nav-audio');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      toggleVoiceGreeting();
    });
  }
  const bootVoiceBtn = document.getElementById('btn-boot-voice');
  if (bootVoiceBtn) {
    bootVoiceBtn.setAttribute('aria-label', 'Enable sound and replay initialization announcement');
    bootVoiceBtn.addEventListener('click', () => {
      activateBootSound();
      playBootAnnouncement();
    });
  }

  window.addEventListener('portfolioBootComplete', () => {
    autoGreetingRequested = true;
    if (!bootVoicePlaying && !bootVoicePending) startAutomaticGreeting();
  }, { once: true });

  playBootAnnouncement();
}

export function playAIVoiceGreeting(isAutomatic = false) {
  hideVoicePrompt();
  if (!isAutomatic) {
    greetingPlayedManually = true;
    autoGreetingAttempted = true;
    autoGreetingStarted = true;
  }

  let hasStarted = false;
  let autoplayFallbackTimer = 0;
  bootAnnouncementAudio.pause();
  bootAnnouncementAudio.currentTime = 0;
  clearBootVoiceFallback();
  bootVoicePlaying = false;
  bootVoicePending = false;
  aiGreetingAudio.pause();
  aiGreetingAudio.currentTime = 0;

  aiGreetingAudio.onplay = () => {
    hasStarted = true;
    clearTimeout(autoplayFallbackTimer);
    isAudioEnabled = true;
    if (isAutomatic) {
      autoGreetingStarted = true;
      clearAutomaticGreetingFallback();
    }
    startWaveAnimation();
    showSubtitleText(AI_GREETING_SCRIPT, 0);
    updateAudioButtonState(true);
  };

  aiGreetingAudio.onended = () => {
    clearTimeout(autoplayFallbackTimer);
    isAudioEnabled = false;
    stopWaveAnimation();
    hideSubtitleText();
    updateAudioButtonState(false);
  };

  aiGreetingAudio.onerror = () => {
    clearTimeout(autoplayFallbackTimer);
    isAudioEnabled = false;
    stopWaveAnimation();
    hideSubtitleText();
    updateAudioButtonState(false);
    console.error('Unable to load or play the recorded AI voice greeting.', aiGreetingAudio.error);
    if (isAutomatic && !autoGreetingStarted) armAutomaticGreetingFallback();
  };

  aiGreetingAudio.currentTime = 0;
  aiGreetingAudio.play().catch(error => {
    isAudioEnabled = false;
    stopWaveAnimation();
    hideSubtitleText();
    updateAudioButtonState(false);
    if (error.name === 'NotAllowedError' && isAutomatic) {
      armAutomaticGreetingFallback();
      return;
    }
    console.error('Unable to play the recorded AI voice greeting.', error);
    if (isAutomatic && !autoGreetingStarted) armAutomaticGreetingFallback();
  });

  if (isAutomatic) {
    autoplayFallbackTimer = window.setTimeout(() => {
      if (!hasStarted && !autoGreetingStarted) armAutomaticGreetingFallback();
    }, 1800);
  }
}

export function stopAIVoiceGreeting() {
  hideVoicePrompt();
  aiGreetingAudio.pause();
  aiGreetingAudio.currentTime = 0;
  isAudioEnabled = false;
  stopWaveAnimation();
  hideSubtitleText();
  updateAudioButtonState(false);
}

export function toggleVoiceGreeting() {
  clearAutomaticGreetingFallback();
  if (isAudioEnabled) {
    stopAIVoiceGreeting();
  } else {
    playAIVoiceGreeting();
  }
}

function playBootAnnouncement() {
  aiGreetingAudio.pause();
  aiGreetingAudio.currentTime = 0;
  bootAnnouncementAudio.pause();
  bootAnnouncementAudio.currentTime = 0;
  bootVoicePending = true;
  bootVoiceStarted = false;
  bootAnnouncementAudio.onplay = () => {
    bootVoiceStarted = true;
    bootVoicePending = false;
    clearBootVoiceFallback();
    bootVoicePlaying = true;
    startWaveAnimation();
    showSubtitleText(BOOT_ANNOUNCEMENT, 0);
  };
  bootAnnouncementAudio.onended = () => {
    bootVoicePlaying = false;
    bootVoicePending = false;
    stopWaveAnimation();
    hideSubtitleText();
    if (autoGreetingRequested) startAutomaticGreeting();
  };
  bootAnnouncementAudio.onerror = () => {
    bootVoicePlaying = false;
    bootVoicePending = false;
    clearBootVoiceFallback();
    stopWaveAnimation();
    hideSubtitleText();
    console.error('Unable to load or play the recorded boot announcement.', bootAnnouncementAudio.error);
    if (autoGreetingRequested) startAutomaticGreeting();
  };

  bootAnnouncementAudio.play().catch(error => {
    if (error.name === 'NotAllowedError' && !bootVoiceStarted) {
      bootVoicePending = true;
      armBootVoiceFallback();
      return;
    }
    bootVoicePending = false;
    clearBootVoiceFallback();
    stopWaveAnimation();
    hideSubtitleText();
    console.error('Unable to play the recorded boot announcement.', error);
    if (autoGreetingRequested) startAutomaticGreeting();
  });

  bootVoiceFallbackTimer = window.setTimeout(() => {
    if (!bootVoiceStarted) armBootVoiceFallback();
  }, 1800);
}

function armBootVoiceFallback() {
  if (bootVoiceFallbackHandler || bootVoiceStarted) return;
  bootVoiceFallbackHandler = () => {
    clearBootVoiceFallback();
    playBootAnnouncement();
  };
  document.addEventListener('pointerdown', bootVoiceFallbackHandler, { once: true });
  document.addEventListener('keydown', bootVoiceFallbackHandler, { once: true });
}

function clearBootVoiceFallback() {
  clearTimeout(bootVoiceFallbackTimer);
  bootVoiceFallbackTimer = 0;
  if (bootVoiceFallbackHandler) {
    document.removeEventListener('pointerdown', bootVoiceFallbackHandler);
    document.removeEventListener('keydown', bootVoiceFallbackHandler);
    bootVoiceFallbackHandler = null;
  }
}

function startAutomaticGreeting() {
  if (autoGreetingAttempted || greetingPlayedManually) return;
  autoGreetingAttempted = true;
  playAIVoiceGreeting(true);
}

function armAutomaticGreetingFallback() {
  if (greetingFallbackBound || autoGreetingStarted) return;
  greetingFallbackBound = true;
  showVoicePrompt();

  greetingFallbackHandler = event => {
    const isVoiceControl = event.target.closest?.('#btn-nav-audio, #btn-boot-voice');
    clearAutomaticGreetingFallback();
    autoGreetingStarted = true;
    if (!isVoiceControl) playAIVoiceGreeting();
  };
  document.addEventListener('pointerdown', greetingFallbackHandler, { once: true });
  document.addEventListener('keydown', greetingFallbackHandler, { once: true });
}

function clearAutomaticGreetingFallback() {
  if (greetingFallbackHandler) {
    document.removeEventListener('pointerdown', greetingFallbackHandler);
    document.removeEventListener('keydown', greetingFallbackHandler);
    greetingFallbackHandler = null;
  }
  greetingFallbackBound = false;
}

function showVoicePrompt() {
  if (!voicePrompt) voicePrompt = document.getElementById('ai-voice-prompt');
  voicePrompt?.classList.remove('hidden');
}

function hideVoicePrompt() {
  if (!voicePrompt) voicePrompt = document.getElementById('ai-voice-prompt');
  voicePrompt?.classList.add('hidden');
}

function startWaveAnimation() {
  const bars = document.querySelectorAll('.wave-bar');
  bars.forEach(b => b.classList.add('animating'));
}

function stopWaveAnimation() {
  const bars = document.querySelectorAll('.wave-bar');
  bars.forEach(b => b.classList.remove('animating'));
}

function showSubtitleText(text, duration = 8000) {
  if (!subtitleBar) subtitleBar = document.getElementById('ai-voice-subtitles');
  if (!subtitleBar) return;

  const textEl = subtitleBar.querySelector('.subtitle-content');
  if (textEl) textEl.textContent = text;

  subtitleBar.classList.remove('hidden');

  if (duration) {
    clearTimeout(subtitleBar._timer);
    subtitleBar._timer = setTimeout(() => {
      hideSubtitleText();
    }, duration);
  }
}

function hideSubtitleText() {
  if (!subtitleBar) subtitleBar = document.getElementById('ai-voice-subtitles');
  if (subtitleBar) {
    subtitleBar.classList.add('hidden');
  }
}

function updateAudioButtonState(isPlaying) {
  const btn = document.getElementById('btn-nav-audio');
  if (!btn) return;

  if (isPlaying) {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
    `;
    btn.setAttribute('title', 'Mute AI Voice');
    btn.setAttribute('aria-label', 'Stop LUCKZDEV AI Greeting');
    btn.setAttribute('aria-pressed', 'true');
  } else {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    `;
    btn.setAttribute('title', 'Play AI Voice Greeting');
    btn.setAttribute('aria-label', 'Play LUCKZDEV AI Greeting');
    btn.setAttribute('aria-pressed', 'false');
  }
}
