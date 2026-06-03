import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {subscribe} from 'node:diagnostics_channel';

@Component({
  selector: 'app-about-me',
  imports: [
    FormsModule

  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

    about = 'About me';
    me = 'I\'m a third-year bachelor’s student at Kazakh-British Technical University. My specialty is Information Technology.';
    webdev =  'I have created some simple websites when I improved my web-dev skills.';
  photoUrl: any;
  angularLogo: any;
  name: any;
  email: any;
  protected readonly subscribe = subscribe;
  subscribedMessage: string | undefined;
  likes: string | undefined;

  incrementLikes() {

  }

  toggleMessage() {

  }
}
