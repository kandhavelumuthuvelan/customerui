import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCartComponent } from './quick-cart.component';

describe('QuickCartComponent', () => {
  let component: QuickCartComponent;
  let fixture: ComponentFixture<QuickCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
