import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDatePipe } from './pipe/chat-date.pipe';

@NgModule({
  declarations: [ChatDatePipe],
  imports: [CommonModule],
  exports: [ChatDatePipe],
})
export class SharedModule {}
