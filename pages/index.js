globalThis.projectStorage.setup().then(async () => {
  const tags = document.querySelector('textarea')
  const save = document.querySelector('button[name="save"]')

  globalThis.projectStorage.getProjects().then((projects) => tags.value = projects.join(','));

  save.addEventListener('click', async () => {
    console.log(tags.value.split(','))
    await globalThis.projectStorage.setProjects(tags.value.split(','));
  });
})
