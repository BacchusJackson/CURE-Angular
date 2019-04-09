import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderConsultationComponent } from './leader-consultation.component';

describe('LeaderConsultationComponent', () => {
  let component: LeaderConsultationComponent;
  let fixture: ComponentFixture<LeaderConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
