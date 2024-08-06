//projecService.js (path:D:\Soft Skills\New folder\backend\services\projectService.js)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const addProject = async (projectData) => {
  try {
    const formData = new FormData();
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('technologies', projectData.technologies);
    formData.append('link', projectData.link);
    if (projectData.image) {
      formData.append('image', projectData.image);
    }

    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to add project');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};
