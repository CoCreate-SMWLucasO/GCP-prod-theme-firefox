'use strict';
globalThis.productionObserver.setup(() => {
  if (document.readyState !== 'complete') {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has('project')) {
    return;
  }

  if (urlParams.get('project').endsWith('live')) {
    document.body.style.border = '10px solid red';
  } else {
    document.body.style.border = '';
  }


}).then(observer => observer.start());

document.addEventListener('unload', () => globalThis.productionObserver.stop());
