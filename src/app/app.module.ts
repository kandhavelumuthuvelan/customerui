import 'hammerjs';
import { SearchComponent } from './core/search/search.component';
import { QuickCartComponent } from './core/quick-cart/quick-cart.component';
import { MenuComponent } from './core/menu/menu.component';
import { CustomerModule } from './module/customer/customer.module';
import { LoginComponent } from './core/authentication/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header/header.component';
import { FooterComponent } from './core/footer/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import {CoreModule} from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/TokenInterceptor';
import { RegisterComponent } from './core/authentication/register/register.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ProductDetailModule } from './module/product-detail/product-detail.module';
import { MatAutocompleteModule, MatInputModule} from '@angular/material';
import { ChatBussiness } from './core/Business/chatBussiness';
import { ChatService } from './core/services/chatService';
import { SharedService } from './core/services/SharedService';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    QuickCartComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerModule,
    ProductDetailModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, ChatBussiness, ChatService, SharedService ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
