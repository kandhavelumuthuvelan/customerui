import { Title } from '@angular/platform-browser';
import {
  ChatModel,
  ChatMessage,
  OnlineHistory
} from 'src/app/core/model/ChatModel';
import { ChatDetail } from './../../../core/model/ChatModel';
import { Component, OnInit } from '@angular/core';
import { ChatBussiness } from 'src/app/core/Business/chatBussiness';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor(
    private titleService: Title,
    private chatBussiness: ChatBussiness,
    private route: ActivatedRoute
  ) {
    this.chatBussiness.SetUpSignalR();
  }
  private id: string;
  public chatDetails: ChatModel[] = [];
  public selectedChat: ChatDetail[] = [];
  public chatMsg: string;
  public selectedChatDetail: ChatModel;
  public selectedIndex: string;
  public onlineUserGuid: string[] = [];
  public searchText: string;
  ngOnInit() {
    this.titleService.setTitle('Your Chats');
    this.initializeChat();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.chatBussiness.AddToChat(this.id).subscribe(() => {
          this.chatBussiness.GetAvailableChat().subscribe(y => {
            this.chatDetails = y;
            this.chatDetails.forEach(val => {
              if (val.productDetail.id === this.id) {
                this.selectedChat = val.chatDetail;
                this.selectedChatDetail = val;
                this.selectedIndex = val.id;
                this.selectChatDetail(this.selectedChatDetail.id);
              }
            });
          });
        });
      } else {
        this.chatBussiness.GetAvailableChat().subscribe(y => {
          this.chatDetails = y;
          this.selectedChat = y[0].chatDetail;
          this.selectedChatDetail = y[0];
          this.selectedIndex = y[0].id;
          this.selectChatDetail(this.selectedChatDetail.id);
        });
      }
    });
  }

  initializeChat() {
    this.chatBussiness._hubConnection.on('Send', (data: ChatDetail) => {
      if (
        this.selectedChat.length > 0 &&
        this.selectedChat[0].chatId === data.chatId
      ) {
        this.selectedChat = [...this.selectedChat, data];
      }
      this.chatDetails.forEach(val => {
        if (val.id === data.chatId) {
          val.chatDetail = [...val.chatDetail, data];
        }
      });
    });
    this.chatBussiness._hubConnection.on('Online', (online: OnlineHistory) => {
      this.chatDetails.forEach(data => {
        if (data.userGuid === online.userId) {
          data.isOnline = online.isOnline;
        }
      });
    });
  }

  post() {
    const obj: ChatMessage = {
      message: this.chatMsg,
      productId: this.selectedChatDetail.productDetail.id
    };
    this.chatBussiness.InsertChat(obj).subscribe(x => {
      this.chatMsg = '';
      this.selectedChat = [...this.selectedChat, x];
      this.chatDetails.forEach(val => {
        if (val.id === x.chatId) {
          val.chatDetail = this.selectedChat;
        }
      });
    });
    // const element = document.getElementById('msg_history');
    // element.scrollTop = element.scrollHeight + 100;
    }

  selectChatDetail(id: string) {
    this.chatBussiness.GetChatById(id).subscribe(x => {
      this.selectedChat = [];
      this.selectedIndex = id;
      this.chatDetails.forEach(val => {
        if (val.id === id) {
          val.chatDetail = x;
          this.selectedChat = x;
          this.selectedChatDetail = val;
          this.markAsRead(id);
        }
      });
    });
  }

  markAsRead(chatId: string) {
    this.chatDetails.forEach(val => {
      if (val.id === chatId) {
        val.hasUnReadMsg = false;
      }
    });
  }
}
