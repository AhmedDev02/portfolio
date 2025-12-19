let selectedProject = null;

export function setSelectedProject(project) {
  selectedProject = project;
}

export function getSelectedProject() {
  return selectedProject;
}

export function clearSelectedProject() {
  selectedProject = null;
}
