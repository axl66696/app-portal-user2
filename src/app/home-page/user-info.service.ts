import { WsNatsService } from '../ws-nats.service';
import { Injectable, inject, signal } from '@angular/core';
// import { UserAccount } from './types/user-account';
import { Observable, Subject, catchError, filter, mergeMap, of } from 'rxjs';
import { ids } from '../app.component';
import { ConsumerMessages, JSONCodec, JetstreamWsService, SubscribeType } from '@his-base/jetstream-ws';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  // userInfo = signal<UserAccount>({} as UserAccount)

  #subject = new Subject();
  #consumerMessages$!: Observable<ConsumerMessages>;
  #wsNatsService = inject(WsNatsService);
  #jetStreamWsService = inject(JetstreamWsService);
  callIds: ids[] = [];


  constructor() {
    console.log("Hi UserInfoDervice")
    this.getUserInfoFromApi()
    this.getCallingUser()
  }

  getUserInfoFromApi(): void {
    // this.userInfo.set(mockUser)
  }

  // subscribe CallUser
  async getCallingUser(){
    console.log("Hi getcallingUser")
    await this.#wsNatsService.connect()
    // this.subCallingUser();

  }

  async subCallingUser(){
    if (this.#subject) {
      this.#subject.unsubscribe();
    }

    this.#subject = new Subject();
    // await this.#jetStreamWsService.publish('order.callUser', {
    //   data: 'test',
    // });
    const jsonCodec = JSONCodec();

    // 需帶入指定訂閱的主題，以及訂閱模式（pull or push）
    this.#consumerMessages$ = this.#jetStreamWsService.subscribe(
      'order.callUser',
      SubscribeType.Pull,

    );
    console.log('ready to subscribe callingUser');

    this.#consumerMessages$
      .pipe(
        mergeMap(async (messages) => {
          for await (const message of messages) {
            // 這裡放入處理資料的邏輯
            console.log("userinfoService聽到的subject",message.subject);
            this.#subject.next(jsonCodec.decode(message.data));
            // console.log('meSSage :', message);
            message.ack();
            this.#subject.subscribe((x: any) => {
              // console.log('x[0]', x[0]);
              console.log('收到的x', x);
              // if (typeof x[0] !== 'string') {
                const returnValue = x as unknown as ids;
              //   console.log(`x=== ${returnValue}`);
                // if this.newsData有含x[0]的_id, 就不加入
                // if(this.callIds.filter((myData) => myData.appId === returnValue.appId).length === 0
                // ){
                  this.callIds.push(x)
                //   };
                // this.newsData.push(x[0])
              // }
              console.log('calling Id', this.callIds);
              console.log('=================');
              // this.news.set(this.newsData);
            });
          }
        }),

        catchError((err) => {
          console.error(err);
          return of(err);
        })
      )
      .subscribe(() => {});
  }

}

// export const mockUser:UserAccount = new UserAccount({
//   orgNo: '澄清院區',
//   userCode: 'U1001',
//   userName: 'chris',
//   sex: '男',
//   birthday: new Date('1990-01-01'),
//   userImage: '../../assets/user.png',
//   eMail: 'zhangsan@example.com',
//   passwordHash: '12345678abcdefg',
//   passwordDate: new Date('2023-01-01'),
//   authHash: 'abcd1234efgh5678',
//   startDate: new Date('2022-01-01'),
//   endDate: new Date('2023-12-31'),
//   remark: '這是一個測試用戶',
//   systemUser: "100",
//   systemTime: new Date('2022-08-25'),
//   typeSetting: {
//     theme: 'dark',
//     fontSize: 'medium'
//   }
// });

