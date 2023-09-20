import { Injectable, inject } from '@angular/core';
import { JetstreamWsService } from '@his-base/jetstream-ws';

@Injectable({
  providedIn: 'root',
})
export class WsNatsService {
  #natsUrl = 'ws://localhost:8080';
  #jetStreamWsService = inject(JetstreamWsService);

  async connect() {
    const connect = await this.#jetStreamWsService.connect(this.#natsUrl);
    console.log(connect,"nats已連線");
  }

  async disconnect() {
    // 連線關閉前，會先將目前訂閱給排空
    await this.#jetStreamWsService.drain();
  }
}
