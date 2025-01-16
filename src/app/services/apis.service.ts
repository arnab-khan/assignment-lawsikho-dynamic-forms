import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormInformation } from '../interfaces/form-information';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getFormInformation(path: string) {
    return this.httpClient.get<FormInformation[]>(`forms/${path}.json`);
  }
}
