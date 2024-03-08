'use strict';


class ProjectStorage {

  async setup() {
    this.projects = (await browser.storage.local.get('projects')).projects || [];

    if (!this.projects) {
      await browser.storage.local.set({projects: []});
    }
  }

  async setProjects(projects) {
    await browser.storage.local.set({projects: projects});
  }

  async getProjects() {
    return (await browser.storage.local.get('projects'))?.projects || []
  }

  async removeProject(project) {
    await browser.storage.local.set({
      projects: await this.getProjects().filter((p) => p !== project)
    });
  }

}

globalThis.projectStorage = new ProjectStorage();
