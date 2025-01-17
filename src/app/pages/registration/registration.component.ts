import { Component } from '@angular/core';
import { FormInformation } from '../../interfaces/form-information';
import { ApisService } from '../../shared/services/apis.service';
import { CommonFormComponent } from '../../shared/components/common-form/common-form.component';

@Component({
  selector: 'app-registration',
  imports: [CommonFormComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  formInformation: FormInformation[] = [];
  constructor(
    private apisService: ApisService
  ) { }

  ngOnInit(): void {
    this.getFormInformation();
  }

  getFormInformation() {
    this.apisService.getFormInformation('registration-form').subscribe({
      next: (data) => {
        // console.log('form information', data);
        this.formInformation = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
