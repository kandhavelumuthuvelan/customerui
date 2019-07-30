import { SearchService } from './services/SearchService';
import { SearchBusiness } from './Business/SearchBusiness';
import { RegisterBusiness } from './Business/RegisterBusiness';
import { LoginService } from './services/loginService';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from './services/service';
import { LoginBusiness } from './Business/LoginBusiness';
import { StoreModule } from '@ngrx/store';
import { tokenReducer } from './stateManager/reducer/reducer';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './services/registerService';
import { MenuService } from './services/MenuService';
import { MenuBusiness } from './Business/MenuBusiness';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, HttpClientModule,FormsModule,
    ReactiveFormsModule, StoreModule.forRoot({
    state: tokenReducer
  })],
  providers: [BaseService, LoginService, LoginBusiness, RegisterService,
    RegisterBusiness, SearchBusiness, SearchService, MenuService, MenuBusiness]
})
export class CoreModule { }
