import { CareerModel, CareerApplyModel } from './../model/CareerModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CareerService } from '../services/CareerService';

@Injectable()
export class CareerBusiness {
    constructor(private service: CareerService) { }

    GetCareer(page: number): Observable<CareerModel[]> {
        return this.service.post(`Career/GetCareer/${page}`);
    }

    GetCareerDetail(id: string): Observable<CareerModel> {
        return this.service.get<any>(`Career/GetCareerDetail/${id}`);
    }

    CareerApply(data: CareerApplyModel): Observable<any> {
        return this.service.post<any>('Career/CareerApply', (data));
    }
}
