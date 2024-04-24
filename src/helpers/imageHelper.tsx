const URL = import.meta.env.VITE_APP_API_URL;

export function getImageSrc(imagen: string): string {
    if (imagen.startsWith("blob")) return imagen;
    else if (!imagen.startsWith(URL)) return URL + imagen;
    else return imagen;
}
