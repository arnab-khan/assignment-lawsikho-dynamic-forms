import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormInformation } from '../../../interfaces/form-information';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['formInformation'] && this.formInformation?.length) {
      this.createForm();
    }
  }

  createForm() {
    const fields = this.formInformation.reduce((addedValue: { [x: string]: any }, fieldInformation: FormInformation) => {
      const isMandatory = fieldInformation?.validation?.mandatory?.value;
      const pattern = fieldInformation?.validation?.pattern?.value;
      return {
        ...addedValue, ...{
          [fieldInformation.formControlName]: [
            null,
            [
              isMandatory && Validators.required,
              pattern && Validators.pattern(pattern)
            ].filter(validetion=>validetion)
          ]
        }
      };
    }, {})
    this.formGroup = this.formBuilder.group(fields);
  }

  submit() {

  }

  isFormControl(control: AbstractControl | null): control is FormControl {
    return control instanceof FormControl;
  }

}
