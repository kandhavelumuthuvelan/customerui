import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatBoxRoutingModule } from './chat-box-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FilterPipe } from 'src/app/core/pipe/filter.pipe';

@NgModule({
  imports: [CommonModule, ChatBoxRoutingModule, FormsModule],
  declarations: [ChatComponent, FilterPipe]
})
export class ChatBoxModule {}
