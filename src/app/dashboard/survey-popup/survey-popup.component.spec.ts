import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPopupComponent } from './survey-popup.component';

describe('SurveyPopupComponent', () => {
  let component: SurveyPopupComponent;
  let fixture: ComponentFixture<SurveyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
