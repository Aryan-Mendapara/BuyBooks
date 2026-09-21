const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export function getImageUrl(image) {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;

  const normalizedImage = image.startsWith("/") ? image : `/${image}`;
  return `${backendUrl}${normalizedImage}`;
}
