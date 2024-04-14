const URL = import.meta.env.VITE_APP_API_URL;

export function getImageSrc(imagen) {
  try {
    new URL(imagen);
    return imagen;
  } catch (_) {
    if (!imagen.startsWith(URL)) {
      return URL + imagen;
    } else {
      return imagen;
    }
  }
}
