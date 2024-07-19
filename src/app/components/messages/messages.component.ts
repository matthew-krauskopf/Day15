import { Component, inject, OnInit } from '@angular/core';
import { MessageFacade } from '../../services/message.facade';
import { map, Observable } from 'rxjs';
import { Message } from '../../models/message';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserFacade } from '../../services/user.facade';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent implements OnInit {
  user$: Observable<User | null>;
  messages$: Observable<Message[] | null>;
  usersFacade: UserFacade = inject(UserFacade);
  messageFacade: MessageFacade = inject(MessageFacade);
  router: Router = inject(Router);

  constructor() {
    this.user$ = this.usersFacade.watchUser();
    this.messages$ = this.messageFacade.watchMessages();
  }

  ngOnInit(): void {
    this.messageFacade.loadMessages();
  }

  openThread(message: Message) {
    this.router.navigate(['home', 'thread', message.uuid]);
  }
}
