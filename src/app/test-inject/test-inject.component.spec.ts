import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInjectComponent } from './test-inject.component';

describe('TestInjectComponent', () => {
  let component: TestInjectComponent;
  let fixture: ComponentFixture<TestInjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestInjectComponent]
    });
    fixture = TestBed.createComponent(TestInjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
