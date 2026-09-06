const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getImageUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("blob:")) {
    return path;
  }
  return `${API_BASE_URL}${path}`;
};
