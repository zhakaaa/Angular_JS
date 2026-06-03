import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-about-me',
  imports: [

  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

    about = 'About me';
    me = 'I\'m a third-year bachelor’s student at Kazakh-British Technical University. My specialty is Information Technology.';
    webdev =  'I have created some simple websites when I improved my web-dev skills.';
}
