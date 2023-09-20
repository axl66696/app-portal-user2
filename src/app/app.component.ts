import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TestInjectComponent } from './test-inject/test-inject.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomePageComponent, TestInjectComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user2';
}

export class ids {
  appId? : number
}
