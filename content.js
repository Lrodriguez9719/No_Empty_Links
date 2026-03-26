// Guard against being injected more than once into the same tab
if (!window.__ndlLoaded) {
  window.__ndlLoaded = true;

  browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'scanPage') {
      const count = scanPage();
      return Promise.resolve({ count });
    }
    if (message.action === 'clearHighlights') {
      clearHighlights();
      return Promise.resolve({ count: 0 });
    }
  });
}

function isDeadAnchor(el) {
  const href = el.getAttribute('href');
  return href === null || href.trim() === '' || href.trim() === '#';
}

function scanPage() {
  injectStyles();

  const dead = new Set();

  document.querySelectorAll('a').forEach(el => {
    if (isDeadAnchor(el)) dead.add(el);
  });

  document.querySelectorAll('.elementor-button').forEach(el => {
    if (el.tagName.toLowerCase() !== 'a') dead.add(el);
  });

  dead.forEach(el => {
    el.classList.add('ndl-dead');
    // Preserve the original title so we can restore it on clear
    if (!el.hasAttribute('data-ndl-original-title')) {
      el.setAttribute('data-ndl-original-title', el.getAttribute('title') ?? '');
    }
    el.setAttribute('title', 'Dead Link Detected');
  });

  return dead.size;
}

function clearHighlights() {
  document.querySelectorAll('.ndl-dead').forEach(el => {
    el.classList.remove('ndl-dead');
    const original = el.getAttribute('data-ndl-original-title');
    if (original) {
      el.setAttribute('title', original);
    } else {
      el.removeAttribute('title');
    }
    el.removeAttribute('data-ndl-original-title');
  });

  const styleTag = document.getElementById('ndl-styles');
  if (styleTag) styleTag.remove();
}

function injectStyles() {
  if (document.getElementById('ndl-styles')) return;
  const style = document.createElement('style');
  style.id = 'ndl-styles';
  style.textContent = `
    .ndl-dead {
      outline: 5px solid red !important;
      background-color: rgba(255, 0, 0, 0.2) !important;
    }
  `;
  document.head.appendChild(style);
}