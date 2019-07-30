import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MupComponent } from './mup.component';

describe('MupComponent', () => {
  let component: MupComponent;
  let fixture: ComponentFixture<MupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
