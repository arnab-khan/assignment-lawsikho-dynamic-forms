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
    const fields = this.utilsService.ascendingSort(this.formInformation, 'sequence').reduce((addedValue: { [x: string]: any }, fieldInformation: FormInformation) => {
      const isMandatory = fieldInformation?.validation?.mandatory?.value;
      const pattern = fieldInformation?.validation?.pattern?.value;
      return {
        ...addedValue, ...{
          [fieldInformation.formControlName]: [
            null,
            [
              isMandatory && Validators.required,
              pattern && Validators.pattern(pattern)
            ].filter(validetion => validetion)
          ]
        }
      };
    }, {})
    this.formGroup = this.formBuilder.group(fields);
  }

  submit() {
    console.log('Form value', this.formGroup?.value);

  }

  isFormControl(control: AbstractControl | null): control is FormControl {
    return control instanceof FormControl;
  }

  upload(event: { target: { files: Blob[]; }; }) {
    const file = event.target.files[0];
    this.getImageSrc(file);
    const formData = new FormData();
    formData.append('file', file);

  }
  getImageSrc(file: Blob) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // this.uploadImageSrc = e.target.result;
    };
    reader.readAsDataURL(file);  //it read the content of the file and trigger the onload event handler once the reading operation is complete
  }

}
