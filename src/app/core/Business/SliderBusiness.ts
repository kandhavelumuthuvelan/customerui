import { SliderModel } from './../model/SliderModel';
import { SliderService } from './../services/SliderService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class SliderBusiness {
  constructor(private service: SliderService) {}

  GetSlider(): Observable<SliderModel[]> {
    return this.service.get('Slider/GetCustomerSlider');
  }
}
