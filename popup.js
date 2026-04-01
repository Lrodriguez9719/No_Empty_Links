document.addEventListener('DOMContentLoaded', () => {
  const btnScan  = document.getElementById('btn-scan');
  const btnClear = document.getElementById('btn-clear');
  const result   = document.getElementById('result');
  const count    = document.getElementById('count');

  btnScan.addEventListener('click', async () => {
    btnScan.disabled = true;
    btnScan.textContent = 'Scanning…';

    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

      // Inject the polyfill first, then the content script
      // world: 'MAIN' is not needed; default ISOLATED world is correct for content scripts
      await browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['browser-polyfill.min.js']
      });
      await browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });

      const response = await browser.tabs.sendMessage(tab.id, { action: 'scanPage' });

      count.textContent = response.count;
      result.classList.remove('hidden');
      btnClear.disabled = false;

    } catch (err) {
      count.textContent = '!';
      result.textContent = 'Cannot scan this page.';
      result.classList.remove('hidden');
      console.error('[No Empty Links]', err);
    } finally {
      btnScan.disabled = false;
      btnScan.textContent = 'Scan Page';
    }
  });

  btnClear.addEventListener('click', async () => {
    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      await browser.tabs.sendMessage(tab.id, { action: 'clearHighlights' });

      result.classList.add('hidden');
      btnClear.disabled = true;
    } catch (err) {
      console.error('[No Empty Links]', err);
    }
  });
});