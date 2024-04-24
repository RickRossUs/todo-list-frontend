export interface ImageUploaderProps {
  imagen: string | null;
  fileName: string;
  setFileName: (fileName: string) => void;
  setImage: (image: string) => void;
  register: any;
  errors: any;
}
