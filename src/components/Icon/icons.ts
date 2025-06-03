import FileImage from '@/assets/icons/file-image.svg';
import File from '@/assets/icons/file.svg';
import Files from '@/assets/icons/files.svg';
import Folder from '@/assets/icons/folder.svg';
import FolderPlus from '@/assets/icons/folder-plus.svg';
import Star from '@/assets/icons/star.svg';
import Upload from '@/assets/icons/upload.svg';

export const ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  fileImage: FileImage,
  file: File,
  files: Files,
  folder: Folder,
  folderPlus: FolderPlus,
  star: Star,
  upload: Upload,
} as const;

export const ICON_SIZES = {
  small: {
    width: 14,
    height: 14,
  },
  medium: {
    width: 16,
    height: 16,
  },
  large: {
    width: 24,
    height: 24,
  },
} as const;
