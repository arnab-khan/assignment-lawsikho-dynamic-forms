import { Component } from '@angular/core';
import { FormInformation } from '../../interfaces/form-information';
import { CommonFormComponent } from '../../shared/components/common-form/common-form.component';
import { ApisService } from '../../shared/services/apis.service';

@Component({
  selector: 'app-user-details',
  imports: [CommonFormComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  formInformation: FormInformation[] = [];
  constructor(
    private apisService: ApisService
  ) { }

  ngOnInit(): void {
    this.getFormInformation();
  }

  getFormInformation() {
    this.apisService.getFormInformation('user-details').subscribe({
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
