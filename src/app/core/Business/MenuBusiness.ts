import { MenuService } from './../services/MenuService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuModel } from '../model/MenuModel';
@Injectable()
export class MenuBusiness {
    constructor(private service: MenuService) { }

    GetMenus(): Observable<MenuModel[]> {
        return this.service.get('Menu/GetMenus');
    }
}
