import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoService } from './user-info.service';
import { WsNatsService } from '../ws-nats.service';
import { JetstreamWsService } from '@his-base/jetstream-ws';
import { SharedService } from '@his-base/shared';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  // userInfoService = inject(UserInfoService);
  #wsNatsServices = inject(WsNatsService);
  #jetStreamWsService = inject(JetstreamWsService);
  sharedService = inject(SharedService);

  appName:String = "請假系統"
  key: any


  constructor(){
    // this.connectNats();
    console.log("constructor")
    // this.onPostNews();
  }

  async connectNats(){
    await this.#wsNatsServices.connect();
    console.log("nats啟動")
  }

  produceSharedToken(): string{
    return this.key = this.sharedService.setValue(this.appName)
  }


  async onPostNews(){
    // await this.#wsNatsServices.connect();
    // console.log("nats啟動")
    // await this.#jetStreamWsService.publish('userNews.postNews', {
    //     data: 'fromUser2',
    //   });
    // console.log("post news");

    await this.#wsNatsServices.connect();
    // console.log("nats啟動")
    const fakeNews = {
      // "_id": {
      //   "$oid": "64f024633d178c8200d80a68"
      // },
      "id": "002",
      "appId": "002-app_id",
      "userCode": "Neo",
      "newsType": "醫囑",
      "newsStartTime": {
        "$date": "2023-08-31T05:25:55.673Z"
      },
      "newsEndTime": {
        "$date": "2023-08-31T05:25:55.673Z"
      },
      "newsStatus": "未完成",
      "newsContent": "來自app store的通知",
      "newsUrl": "/system2/appStore",

      "systemUser": "alphaTeam",
      "systemTime": "2023-08-31T05:25:55.673Z",
      // {
      //   "$date": "2023-08-31T05:25:55.673Z"
      // },
      "sawTime": "2023-08-31T05:25:55.673Z",
      // {
      //   "$date": "2023-08-31T05:25:55.673Z"
      // },
      "token": "請更新app store中的資料",
      // "token":this.produceSharedToken(),
      // "shared":this.produceSharedData()
    }
    await this.#jetStreamWsService.publish('userAccount.insertNews', {
      data:fakeNews
    });
    console.log("insert news");
    // console.log("shared token", this.key)
  }
}
