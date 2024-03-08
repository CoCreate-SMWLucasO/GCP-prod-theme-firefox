'use strict';


class ProjectStorage {

  _setupCalled = false;

  async setup() {
    await browser.storage.local.remove('projects');

    this.projects = (await browser.storage.local.get('projects')).projects || [];

    if (this.projects) {
      await browser.storage.local.set({projects: []});
    }

    this._setupCalled = true;
  }

  async addProject(project) {
    this.__assertSetupCalled();

    this.projects.push(project);
    await browser.storage.local.set({projects: this.projects});
  }

  getProjects() {
    this.__assertSetupCalled();

    return this.projects;
  }

  async removeProject(project) {
    this.__assertSetupCalled();

    this.projects = this.projects.filter((p) => p !== project);
    await browser.storage.local.set({projects: this.projects});
  }

  __assertSetupCalled() {
    if (!this._setupCalled) {
      throw new Error('You must call setup() before calling this method');
    }
  }

}

globalThis.projectStorage = new ProjectStorage();
