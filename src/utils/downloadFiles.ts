
import { saveAs } from 'file-saver'
import html2canvas from "html2canvas";

export const downloadFiles = (data: any, filenames: any) => {
     saveAs(data, 'example.zip');
}

export const exportImage = async (format: 'jpeg' | 'png', element: HTMLElement, fileName: string) => {
     if (element) {
          try {
               const canvas = await html2canvas(element as HTMLElement);
               const dataURL = canvas.toDataURL(`image/${format}`);
               const link = document.createElement('a');
               link.href = dataURL;
               link.download = `${fileName}.${format}`;
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
          } catch (error) {
               console.error('Error exporting image:', error);
          }
     }
};
