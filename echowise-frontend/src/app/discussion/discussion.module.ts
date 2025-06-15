import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussionRoutingModule } from './discussion-routing.module';
import { ChatService } from './services/chat.service';

@NgModule({
  imports: [
    CommonModule,
    DiscussionRoutingModule
  ],
  providers: [ChatService]
})
export class DiscussionModule { }
