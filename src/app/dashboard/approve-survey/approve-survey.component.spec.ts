import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSurveyComponent } from './approve-survey.component';

describe('ApproveSurveyComponent', () => {
  let component: ApproveSurveyComponent;
  let fixture: ComponentFixture<ApproveSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
