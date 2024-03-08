'use strict';

class GoingToProductionObserver {

  _previousUrl = '';
  _observerConfig = {subtree: true, childList: true};

  async setup(mutationCallback) {
    this._observer = new MutationObserver(() => {
      if (window.location.href !== this._previousUrl) {
        this._previousUrl = window.location.href;
        mutationCallback();
      }
    });

    return this;
  }

  async start() {
    this._observer.observe(document, this._observerConfig);
    return this;
  }

  stop() {
    this._observer.disconnect();
    return this;
  }
}

globalThis.productionObserver = new GoingToProductionObserver()
