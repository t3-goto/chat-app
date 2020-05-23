import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { RoomComponent } from './room/room.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'room', component: RoomComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
