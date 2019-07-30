import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSectorComponent } from './filter-sector.component';

describe('FilterSectorComponent', () => {
  let component: FilterSectorComponent;
  let fixture: ComponentFixture<FilterSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
