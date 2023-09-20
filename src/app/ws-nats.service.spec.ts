import { TestBed } from '@angular/core/testing';

import { WsNatsService } from './ws-nats.service';

describe('WsNatsService', () => {
  let service: WsNatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsNatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
