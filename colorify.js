'use strict';

globalThis.projectStorage.setup().then(async () => {
  await globalThis.projectStorage.addProject('live');
  await globalThis.projectStorage.addProject('production');
}).then(() => globalThis.projectStorage.getProjects()).then(() => {
  globalThis.productionObserver.setup(() => {
    if (document.readyState !== 'complete') {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);

    if (!urlParams.has('project')) {
      return;
    }

    let noRelevantMappingDetected = true;
    globalThis.projectStorage.getProjects().map(project => {
      if (urlParams.get('project').search(project) !== -1) {
        document.body.style.border = '10px solid red';
        noRelevantMappingDetected = false;
      }
    });

    if (noRelevantMappingDetected) {
      document.body.style.border = '';
    }

  }).then(observer => observer.start());
  document.addEventListener('unload', () => globalThis.productionObserver.stop());
});
