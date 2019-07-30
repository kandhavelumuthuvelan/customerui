import { environment } from './../../../../environments/environment.dev';
import { Router } from '@angular/router';
import { LoginBusiness } from './../../Business/LoginBusiness';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Token } from '../../model/store';
import { ChatBussiness } from '../../Business/chatBussiness';
import { HubConnection } from '@aspnet/signalr';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SharedService } from '../../services/SharedService';
import { SlideshowModule } from 'ng-simple-slideshow';
export interface Food {
  value: string;
  viewValue: string;
}

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;
  public user: any;
  private _hubConnection: HubConnection;
  constructor(
    private store: Store<Token>,
    private loginBussiness: LoginBusiness,
    private _route: Router,
    private chat: ChatBussiness,
    public toastr: ToastrManager,
    private shared: SharedService
  ) {
    this.store.select('state').subscribe(x => {
      if (x.key) {
        this.isLoggedIn = true;
        $('#login-modal').modal('hide');
        chat.SetUpSignalR();
        this.toastr.onClickToast().subscribe(toast => {
          this._route.navigate(['/chat']);
        });
        chat._hubConnection.on('Send', (data: any) => {
          this.toastr.successToastr(
            `<span>Got new message.
          <a href="javascript:void(0)" >Click here</a> to redirect to chat page</span>`,
            null,
            { enableHTML: true }
          );
        });
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(`${environment.localStorageName}user`));
    this.shared.userName.subscribe(x => {
      this.user = x;
    });

    // if (!this.isLoggedIn) {
    //   setTimeout(function () {
    //     $('.supplier-modal').modal('show');
    //   }, 10000);
    // }
  }

  logout() {
    this.loginBussiness.logout();
    this._route.navigate(['']);
  }
}
