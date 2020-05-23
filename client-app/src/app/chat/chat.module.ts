import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { RoomComponent } from './room/room.component';
import { ListComponent } from './list/list.component';

// Shared
import { SharedModule } from './../shared/shared.module';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatComponent, RoomComponent, ListComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    // Shared
    SharedModule,
    // Form
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ChatModule {}
