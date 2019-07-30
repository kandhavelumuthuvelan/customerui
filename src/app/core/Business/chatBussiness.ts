import { environment } from './../../../environments/environment.dev';
import { LoginBusiness } from './LoginBusiness';
import { ChatDetail, ChatMessage } from './../model/ChatModel';
import { Observable, Subject } from 'rxjs';
import { ChatService } from './../services/chatService';
import { Injectable } from '@angular/core';
import { ChatModel } from '../model/ChatModel';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Injectable()
export class ChatBussiness {
  public _hubConnection: HubConnection;
  public subjects: Subject<string> = new Subject();
  private data;
  constructor(
    private service: ChatService,
    private loginBussiness: LoginBusiness
  ) { }
  AddToChat(id: string): Observable<string> {
    return this.service.get<string>(`Chat/AddProductToChat/${id}`);
  }
  GetAvailableChat(): Observable<ChatModel[]> {
    return this.service.get<ChatModel[]>('Chat/GetAvailableChat');
  }
  InsertChat(chat: ChatMessage): Observable<ChatDetail> {
    return this.service.post<ChatDetail>(`Chat/InsertChat`, chat);
  }
  GetChatById(id: string) {
    return this.service.get<ChatDetail[]>(`Chat/GetChatById/${id}`);
  }
  SetUpSignalR() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}${'notify'}`, {
        accessTokenFactory: () => localStorage.getItem(`${environment.localStorageName}token`)
      })
      .build();
    this._hubConnection
      .start()
      .then(value => { })
      .catch(err => {
        if (err.StatusCode === 401) {
          this.loginBussiness.logout();
        }
      });
  }

  EmitSearchData(data: string) {
     this.subjects.next(data);
  }
}
