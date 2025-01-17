import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  // ascending sort od an array of object based on a item's property value
  ascendingSort<T>(array: T[], orderKey: keyof T): T[] {
    return array.sort((a, b) =>
      (a[orderKey] > b[orderKey]) ? 1 : ((b[orderKey] > a[orderKey]) ? -1 : 0)
    );
  }

  // getting form data and url from uploaded file
  createFileData(file: Blob): Promise<{ formData: FormData; fileUrl: string }> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          formData: formData,
          fileUrl: reader.result as string,
        });
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file); // Read the file to generate its data URL
    });
  }

  // custom form field validetor if password and conform password valus do not match
  passwordMatchValidator(passwordControllName: string,confirmPasswordControllName:string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        // No parent available, skip validation
        return null;
      }

      const password = control.parent.get(passwordControllName)?.value;
      const confirmPassword = control.parent.get(confirmPasswordControllName)?.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

}
