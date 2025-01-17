import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormInformation } from '../../../interfaces/form-information';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-common-form',
  imports: [ReactiveFormsModule],
  templateUrl: './common-form.component.html',
  styleUrl: './common-form.component.scss'
})
export class CommonFormComponent implements OnChanges {

  @Input() formInformation: FormInformation[] = [];

  formGroup: FormGroup | undefined;
  passwordFieldsControll = [
    'password',
    'confirmPassword'
  ];
  clickedSubmitButton = false;

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilsService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['formInformation'] && this.formInformation?.length) {
      this.createForm();
    }
  }

  createForm() {
    // Creating and sorting form fields based on JSON(this.formInformation)
    const fields = this.utilsService.ascendingSort(this.formInformation, 'sequence').reduce((addedValue: { [x: string]: any }, fieldInformation: FormInformation) => {
      const isMandatory = fieldInformation?.validation?.mandatory?.value;
      const pattern = fieldInformation?.validation?.pattern?.value;
      const passwordMismatch = fieldInformation?.validation?.passwordMismatch?.value;
      return {
        ...addedValue, ...{
          [fieldInformation.formControlName]: [
            null, // field value null
            [ // adding validation conditionally
              isMandatory && Validators.required,
              pattern && Validators.pattern(pattern),
              passwordMismatch && this.utilsService.passwordMatchValidator(this.passwordFieldsControll[0], this.passwordFieldsControll[1])
            ].filter(validation => validation) // remove undefined or false validator
          ]
        }
      };
    }, {})
    this.formGroup = this.formBuilder.group(fields); // adding created form fields to formGroup
  }

  submit() {
    this.clickedSubmitButton = true;
    if (this.formGroup?.status == 'VALID') { // form is valid
      console.log('Form value', this.formGroup?.value);
      window.alert('Form is valid')
    } else { // form is invalid
      window.alert('Invalid form')
    }
  }

  isFormControl(control: AbstractControl | null): control is FormControl { // check if it is a FormControl
    return control instanceof FormControl;
  }

  imageUpload(event: Event, control: AbstractControl) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) { // only image file allow
        this.utilsService.createFileData(file).then(value => {
          control.patchValue(value);
        });
      } else { // not a image file
        alert('The selected file is not an image. Please upload a valid image file.');
        input.value = '';
      }
    }
  }

  updateOtherPasserWordField(formControlName: string) { // reset validation of password field if select confirm password field and vice verse
    const otherFieldName = this.passwordFieldsControll.find(element => element != formControlName); // if current field password then other field will be confirm password and vice verse
    if (otherFieldName) {
      this.formGroup?.get(otherFieldName)?.updateValueAndValidity();
    }
  }

}
