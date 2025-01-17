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
    const fields = this.utilsService.ascendingSort(this.formInformation, 'sequence').reduce((addedValue: { [x: string]: any }, fieldInformation: FormInformation) => {
      const isMandatory = fieldInformation?.validation?.mandatory?.value;
      const pattern = fieldInformation?.validation?.pattern?.value;
      const passwordMismatch = fieldInformation?.validation?.passwordMismatch?.value;
      return {
        ...addedValue, ...{
          [fieldInformation.formControlName]: [
            null,
            [
              isMandatory && Validators.required,
              pattern && Validators.pattern(pattern),
              passwordMismatch && this.utilsService.passwordMatchValidator(this.passwordFieldsControll[0], this.passwordFieldsControll[1])
            ].filter(validetion => validetion)
          ]
        }
      };
    }, {})
    this.formGroup = this.formBuilder.group(fields);
  }

  submit() {
    this.clickedSubmitButton=true;
    if (this.formGroup?.status == 'VALID') {
      console.log('Form value', this.formGroup?.value);
    } else {
      window.alert('Invalid form')
    }
  }

  isFormControl(control: AbstractControl | null): control is FormControl {
    return control instanceof FormControl;
  }

  upload(event: Event, control: AbstractControl) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.utilsService.createFileData(file).then(value => {
        control.patchValue(value);
      });
    }
  }

  updateOtherPasserWordField(formControlName: string) {
    const otherFieldName = this.passwordFieldsControll.find(element => element != formControlName);
    if (otherFieldName) {
      this.formGroup?.get(otherFieldName)?.updateValueAndValidity();
    }
  }

}
