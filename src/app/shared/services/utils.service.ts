import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  ascendingSort<T>(array: T[], orderKey: keyof T): T[] {
    return array.sort((a, b) =>
      (a[orderKey] > b[orderKey]) ? 1 : ((b[orderKey] > a[orderKey]) ? -1 : 0)
    );
  }

  async blobFileExtract(file:Blob) {
    const formData = new FormData();
    formData.append('file', file);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      return new Promise((resolve) => {
        resolve(formData);
      });
    };
    reader.readAsDataURL(file);  //it read the content of the file and trigger the onload event handler once the reading operation is complete
  }

}
