import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../shared/services/apis.service';
import { CommonFormComponent } from '../../shared/components/common-form/common-form.component';
import { FormInformation } from '../../interfaces/form-information';

@Component({
  selector: 'app-login',
  imports: [CommonFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  formInformation: FormInformation[] = [];
  constructor(
    private apisService: ApisService
  ) { }

  ngOnInit(): void {
    this.getFormInformation();
  }

  getFormInformation() {
    this.apisService.getFormInformation('login').subscribe({
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
