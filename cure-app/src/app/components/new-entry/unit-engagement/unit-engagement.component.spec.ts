import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitEngagementComponent } from './unit-engagement.component';

describe('UnitEngagementComponent', () => {
  let component: UnitEngagementComponent;
  let fixture: ComponentFixture<UnitEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
