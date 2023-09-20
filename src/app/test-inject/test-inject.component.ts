import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../home-page/user-info.service';


@Component({
  selector: 'app-test-inject',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-inject.component.html',
  styleUrls: ['./test-inject.component.scss']
})
export class TestInjectComponent {
  userInfoService = inject(UserInfoService)
}
