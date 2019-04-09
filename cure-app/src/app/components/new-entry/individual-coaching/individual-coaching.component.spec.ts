import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCoachingComponent } from './individual-coaching.component';

describe('IndividualCoachingComponent', () => {
  let component: IndividualCoachingComponent;
  let fixture: ComponentFixture<IndividualCoachingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualCoachingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
